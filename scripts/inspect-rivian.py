"""
Patchright-based inspection of rivian.com homepage.
Takes screenshots at multiple viewports, extracts design tokens, fonts, colors,
page structure, and all asset URLs.
"""
import json
import os
import time
from patchright.sync_api import sync_playwright

BASE = "/Users/anh/Downloads/ai-website-cloner-template-master"
DESIGN_REF = f"{BASE}/docs/design-references"
RESEARCH = f"{BASE}/docs/research"

os.makedirs(DESIGN_REF, exist_ok=True)
os.makedirs(RESEARCH, exist_ok=True)


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        print("Navigating to rivian.com...")
        page.goto("https://rivian.com/", wait_until="domcontentloaded", timeout=60000)
        time.sleep(8)  # let animations and lazy-loaded content settle

        # Dismiss any cookie banner / popups
        try:
            cookie_btn = page.locator('button:has-text("Accept"), button:has-text("Got it"), button:has-text("Close")')
            if cookie_btn.count() > 0:
                cookie_btn.first.click()
                time.sleep(1)
        except Exception:
            pass

        # === SCREENSHOTS ===
        print("Taking desktop full-page screenshot...")
        page.screenshot(path=f"{DESIGN_REF}/home-desktop-1440.png", full_page=True)

        print("Taking desktop viewport screenshot...")
        page.screenshot(path=f"{DESIGN_REF}/home-desktop-viewport.png", full_page=False)

        # Mobile screenshot
        page.set_viewport_size({"width": 390, "height": 844})
        time.sleep(2)
        print("Taking mobile full-page screenshot...")
        page.screenshot(path=f"{DESIGN_REF}/home-mobile-390.png", full_page=True)

        # Back to desktop
        page.set_viewport_size({"width": 1440, "height": 900})
        time.sleep(1)

        # === EXTRACT DESIGN TOKENS ===
        print("Extracting design tokens...")
        tokens = page.evaluate("""() => {
            const body = document.body;
            const cs = getComputedStyle;

            // Collect unique fonts
            const fonts = new Set();
            const colors = new Set();
            const bgColors = new Set();

            document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,button,li,label,input,div').forEach(el => {
                const s = cs(el);
                fonts.add(s.fontFamily);
                if (s.color && s.color !== 'rgba(0, 0, 0, 0)') colors.add(s.color);
                if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') bgColors.add(s.backgroundColor);
            });

            // Get heading styles
            const headings = {};
            ['h1','h2','h3','h4','h5','h6'].forEach(tag => {
                const el = document.querySelector(tag);
                if (el) {
                    const s = cs(el);
                    headings[tag] = {
                        fontFamily: s.fontFamily,
                        fontSize: s.fontSize,
                        fontWeight: s.fontWeight,
                        lineHeight: s.lineHeight,
                        letterSpacing: s.letterSpacing,
                        color: s.color,
                        textTransform: s.textTransform
                    };
                }
            });

            // Body text style
            const bodyEl = document.querySelector('p') || document.body;
            const bodyStyle = cs(bodyEl);

            // Links
            const linkStylesArr = [];
            document.querySelectorAll('link[rel*="icon"], link[rel*="stylesheet"], link[href*="font"]').forEach(l => {
                linkStylesArr.push({ rel: l.rel, href: l.href, sizes: l.sizes?.toString() || '' });
            });

            // Meta tags
            const metas = {};
            document.querySelectorAll('meta').forEach(m => {
                const name = m.getAttribute('name') || m.getAttribute('property') || '';
                if (name) metas[name] = m.content;
            });

            return {
                fonts: [...fonts],
                textColors: [...colors].slice(0, 30),
                bgColors: [...bgColors].slice(0, 30),
                headings,
                bodyText: {
                    fontFamily: bodyStyle.fontFamily,
                    fontSize: bodyStyle.fontSize,
                    fontWeight: bodyStyle.fontWeight,
                    lineHeight: bodyStyle.lineHeight,
                    color: bodyStyle.color
                },
                links: linkStylesArr,
                metas,
                title: document.title
            };
        }""")

        with open(f"{RESEARCH}/design-tokens-raw.json", "w") as f:
            json.dump(tokens, f, indent=2)
        print(f"Design tokens saved. Found {len(tokens['fonts'])} font families, {len(tokens['textColors'])} text colors")

        # === EXTRACT PAGE TOPOLOGY ===
        print("Extracting page topology...")
        topology = page.evaluate("""() => {
            const sections = [];
            // Get direct children of main or body that are sections
            const containers = document.querySelectorAll('main > *, body > main, body > header, body > footer, body > nav, body > section, body > div > section, [class*="section"], [class*="Section"], [data-section]');

            // Also get all top-level semantic elements
            const allTopLevel = document.querySelectorAll('header, nav, main, footer, section, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"]');

            const seen = new Set();
            const elements = [...new Set([...containers, ...allTopLevel])];

            elements.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                if (rect.height < 10) return;
                const key = `${el.tagName}-${Math.round(rect.top)}-${Math.round(rect.height)}`;
                if (seen.has(key)) return;
                seen.add(key);

                const cs = getComputedStyle(el);
                sections.push({
                    index: i,
                    tag: el.tagName.toLowerCase(),
                    id: el.id || '',
                    classes: el.className?.toString()?.slice(0, 200) || '',
                    role: el.getAttribute('role') || '',
                    top: Math.round(rect.top + window.scrollY),
                    height: Math.round(rect.height),
                    width: Math.round(rect.width),
                    position: cs.position,
                    zIndex: cs.zIndex,
                    bg: cs.backgroundColor,
                    childCount: el.children.length,
                    textPreview: el.textContent?.trim().slice(0, 100) || ''
                });
            });

            // Sort by vertical position
            sections.sort((a, b) => a.top - b.top);
            return sections;
        }""")

        with open(f"{RESEARCH}/page-topology-raw.json", "w") as f:
            json.dump(topology, f, indent=2)
        print(f"Page topology saved. Found {len(topology)} sections/elements")

        # === EXTRACT ALL ASSETS ===
        print("Extracting asset URLs...")
        assets = page.evaluate("""() => {
            return {
                images: [...document.querySelectorAll('img')].map(img => ({
                    src: img.src || img.currentSrc || '',
                    srcset: img.srcset || '',
                    alt: img.alt || '',
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    loading: img.loading,
                    parentClasses: img.parentElement?.className?.toString()?.slice(0, 100) || ''
                })).filter(i => i.src),

                videos: [...document.querySelectorAll('video, source[type*="video"]')].map(v => {
                    if (v.tagName === 'SOURCE') {
                        return { src: v.src, type: v.type, parentTag: v.parentElement?.tagName };
                    }
                    return {
                        src: v.src || '',
                        sources: [...v.querySelectorAll('source')].map(s => ({ src: s.src, type: s.type })),
                        poster: v.poster || '',
                        autoplay: v.autoplay,
                        loop: v.loop,
                        muted: v.muted
                    };
                }),

                backgroundImages: [...document.querySelectorAll('*')].filter(el => {
                    const bg = getComputedStyle(el).backgroundImage;
                    return bg && bg !== 'none';
                }).slice(0, 50).map(el => ({
                    bgImage: getComputedStyle(el).backgroundImage,
                    tag: el.tagName.toLowerCase(),
                    classes: el.className?.toString()?.slice(0, 100) || ''
                })),

                svgs: document.querySelectorAll('svg').length,

                favicons: [...document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')].map(l => ({
                    href: l.href,
                    rel: l.rel,
                    sizes: l.sizes?.toString() || '',
                    type: l.type || ''
                })),

                fontLinks: [...document.querySelectorAll('link[href*="font"], link[rel="preload"][as="font"], style')].map(el => {
                    if (el.tagName === 'STYLE') {
                        const fontFaces = el.textContent.match(/@font-face\\s*\\{[^}]+\\}/g) || [];
                        return { type: 'style', fontFaces: fontFaces.slice(0, 10) };
                    }
                    return { type: 'link', href: el.href, rel: el.rel };
                })
            };
        }""")

        with open(f"{RESEARCH}/assets-raw.json", "w") as f:
            json.dump(assets, f, indent=2)
        print(f"Assets saved. {len(assets['images'])} images, {len(assets['videos'])} videos, {assets['svgs']} SVGs")

        # === EXTRACT NAVIGATION STRUCTURE ===
        print("Extracting navigation...")
        nav = page.evaluate("""() => {
            const nav = document.querySelector('nav, header, [role="navigation"]');
            if (!nav) return { error: 'No nav found' };

            const links = [...nav.querySelectorAll('a')].map(a => ({
                text: a.textContent?.trim(),
                href: a.href,
                classes: a.className?.toString()?.slice(0, 100) || ''
            }));

            const buttons = [...nav.querySelectorAll('button')].map(b => ({
                text: b.textContent?.trim(),
                classes: b.className?.toString()?.slice(0, 100) || '',
                ariaLabel: b.getAttribute('aria-label') || ''
            }));

            const cs = getComputedStyle(nav);
            return {
                tag: nav.tagName.toLowerCase(),
                classes: nav.className?.toString()?.slice(0, 200) || '',
                position: cs.position,
                bg: cs.backgroundColor,
                height: nav.getBoundingClientRect().height,
                links,
                buttons
            };
        }""")

        with open(f"{RESEARCH}/navigation-raw.json", "w") as f:
            json.dump(nav, f, indent=2)
        print(f"Navigation saved. {len(nav.get('links', []))} links, {len(nav.get('buttons', []))} buttons")

        # === SCROLL SWEEP - Capture sections at different scroll positions ===
        print("Performing scroll sweep...")
        page_height = page.evaluate("() => document.documentElement.scrollHeight")
        viewport_height = 900
        scroll_positions = list(range(0, page_height, viewport_height // 2))

        scroll_data = []
        for i, pos in enumerate(scroll_positions[:30]):  # Cap at 30 positions
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.5)

            # Take a screenshot every few scrolls
            if i % 3 == 0:
                page.screenshot(path=f"{DESIGN_REF}/home-scroll-{i:02d}-{pos}px.png", full_page=False)

            # Check header state
            header_state = page.evaluate("""() => {
                const header = document.querySelector('header, nav, [role="banner"]');
                if (!header) return null;
                const cs = getComputedStyle(header);
                return {
                    bg: cs.backgroundColor,
                    boxShadow: cs.boxShadow,
                    position: cs.position,
                    top: cs.top,
                    transform: cs.transform,
                    opacity: cs.opacity,
                    height: header.getBoundingClientRect().height,
                    backdropFilter: cs.backdropFilter
                };
            }""")
            scroll_data.append({"scrollY": pos, "headerState": header_state})

        with open(f"{RESEARCH}/scroll-sweep.json", "w") as f:
            json.dump(scroll_data, f, indent=2)
        print(f"Scroll sweep complete. {len(scroll_data)} positions captured")

        # === EXTRACT FULL SECTION DETAILS ===
        print("Extracting detailed section info...")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)

        section_details = page.evaluate("""() => {
            // Try to get main content sections
            const main = document.querySelector('main') || document.body;
            const children = [...main.children];

            return children.slice(0, 30).map((section, idx) => {
                const rect = section.getBoundingClientRect();
                const cs = getComputedStyle(section);

                // Get all text content organized
                const headings = [...section.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({
                    tag: h.tagName.toLowerCase(),
                    text: h.textContent?.trim()?.slice(0, 200),
                    styles: (() => {
                        const s = getComputedStyle(h);
                        return {
                            fontSize: s.fontSize,
                            fontWeight: s.fontWeight,
                            fontFamily: s.fontFamily,
                            color: s.color,
                            lineHeight: s.lineHeight,
                            letterSpacing: s.letterSpacing,
                            textTransform: s.textTransform
                        };
                    })()
                }));

                const paragraphs = [...section.querySelectorAll('p')].map(p => ({
                    text: p.textContent?.trim()?.slice(0, 300),
                    styles: (() => {
                        const s = getComputedStyle(p);
                        return {
                            fontSize: s.fontSize,
                            fontWeight: s.fontWeight,
                            color: s.color,
                            lineHeight: s.lineHeight
                        };
                    })()
                }));

                const links = [...section.querySelectorAll('a')].map(a => ({
                    text: a.textContent?.trim(),
                    href: a.href,
                    styles: (() => {
                        const s = getComputedStyle(a);
                        return { fontSize: s.fontSize, color: s.color, textDecoration: s.textDecoration };
                    })()
                }));

                const buttons = [...section.querySelectorAll('button, [role="button"], a[class*="btn"], a[class*="button"], a[class*="Button"], a[class*="cta"], a[class*="CTA"]')].map(b => ({
                    text: b.textContent?.trim(),
                    tag: b.tagName.toLowerCase(),
                    styles: (() => {
                        const s = getComputedStyle(b);
                        return {
                            fontSize: s.fontSize,
                            fontWeight: s.fontWeight,
                            color: s.color,
                            backgroundColor: s.backgroundColor,
                            borderRadius: s.borderRadius,
                            padding: s.padding,
                            border: s.border
                        };
                    })()
                }));

                const images = [...section.querySelectorAll('img')].map(img => ({
                    src: img.src,
                    alt: img.alt,
                    width: img.naturalWidth,
                    height: img.naturalHeight
                }));

                const videos = [...section.querySelectorAll('video')].map(v => ({
                    src: v.src || v.querySelector('source')?.src || '',
                    poster: v.poster,
                    autoplay: v.autoplay
                }));

                return {
                    index: idx,
                    tag: section.tagName.toLowerCase(),
                    id: section.id || '',
                    classes: section.className?.toString()?.slice(0, 300) || '',
                    top: Math.round(rect.top + window.scrollY),
                    height: Math.round(rect.height),
                    containerStyles: {
                        display: cs.display,
                        flexDirection: cs.flexDirection,
                        justifyContent: cs.justifyContent,
                        alignItems: cs.alignItems,
                        gap: cs.gap,
                        padding: cs.padding,
                        margin: cs.margin,
                        backgroundColor: cs.backgroundColor,
                        backgroundImage: cs.backgroundImage !== 'none' ? cs.backgroundImage : '',
                        position: cs.position,
                        overflow: cs.overflow,
                        maxWidth: cs.maxWidth
                    },
                    headings,
                    paragraphs,
                    links: links.slice(0, 20),
                    buttons: buttons.slice(0, 10),
                    images,
                    videos,
                    childCount: section.children.length
                };
            });
        }""")

        with open(f"{RESEARCH}/section-details.json", "w") as f:
            json.dump(section_details, f, indent=2)
        print(f"Section details saved. {len(section_details)} top-level sections")

        # === Extract SVG icons ===
        print("Extracting SVG icons...")
        svgs = page.evaluate("""() => {
            return [...document.querySelectorAll('svg')].slice(0, 50).map((svg, i) => {
                const rect = svg.getBoundingClientRect();
                return {
                    index: i,
                    viewBox: svg.getAttribute('viewBox') || '',
                    width: svg.getAttribute('width') || rect.width,
                    height: svg.getAttribute('height') || rect.height,
                    outerHTML: svg.outerHTML.slice(0, 2000),
                    parentClasses: svg.parentElement?.className?.toString()?.slice(0, 100) || '',
                    ariaLabel: svg.getAttribute('aria-label') || svg.querySelector('title')?.textContent || ''
                };
            });
        }""")

        with open(f"{RESEARCH}/svgs-raw.json", "w") as f:
            json.dump(svgs, f, indent=2)
        print(f"SVGs saved. {len(svgs)} icons found")

        print("\n=== INSPECTION COMPLETE ===")
        print(f"Screenshots: {DESIGN_REF}/")
        print(f"Research data: {RESEARCH}/")

        browser.close()


if __name__ == "__main__":
    run()
