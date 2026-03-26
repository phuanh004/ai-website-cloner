"""
Deep inspection of rivian.com - extracts detailed section-by-section data
including all content, styles, and interaction patterns.
"""
import json
import os
import time
from patchright.sync_api import sync_playwright

BASE = "/Users/anh/Downloads/ai-website-cloner-template-master"
RESEARCH = f"{BASE}/docs/research"
DESIGN_REF = f"{BASE}/docs/design-references"

os.makedirs(f"{RESEARCH}/components", exist_ok=True)


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
        time.sleep(10)

        # Dismiss cookie/popup
        try:
            cookie_btn = page.locator('button:has-text("Accept"), button:has-text("Got it")')
            if cookie_btn.count() > 0:
                cookie_btn.first.click()
                time.sleep(1)
        except Exception:
            pass

        # === GET ALL SECTIONS WITH DEEP DETAIL ===
        print("Extracting all sections deeply...")

        # First, map the actual page sections
        all_sections = page.evaluate(r"""() => {
            // Rivian uses a wrapper div inside main - get its children
            const main = document.querySelector('main');
            if (!main) return { error: 'No main found' };

            // Get the actual content wrapper
            const wrapper = main.children[1] || main.children[0];
            const sections = wrapper ? [...wrapper.children] : [...main.children];

            function getStyles(el) {
                const cs = getComputedStyle(el);
                const props = [
                    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
                    'textTransform','textDecoration','backgroundColor','background',
                    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
                    'margin','marginTop','marginRight','marginBottom','marginLeft',
                    'width','height','maxWidth','minHeight',
                    'display','flexDirection','justifyContent','alignItems','gap',
                    'gridTemplateColumns',
                    'borderRadius','border','boxShadow','overflow',
                    'position','top','right','bottom','left','zIndex',
                    'opacity','transform','transition',
                    'objectFit','backgroundSize','backgroundPosition'
                ];
                const styles = {};
                props.forEach(p => {
                    const v = cs[p];
                    if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' &&
                        v !== 'rgba(0, 0, 0, 0)' && v !== 'start' && v !== 'stretch' && v !== 'row') {
                        styles[p] = v;
                    }
                });
                return styles;
            }

            function walkDOM(el, depth) {
                if (depth > 5) return null;
                const rect = el.getBoundingClientRect();
                if (rect.height < 2) return null;

                const children = [...el.children].slice(0, 30);
                const result = {
                    tag: el.tagName.toLowerCase(),
                    classes: el.className?.toString()?.slice(0, 300) || '',
                    id: el.id || undefined,
                    text: (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
                        ? el.textContent?.trim()?.slice(0, 500) : undefined,
                    styles: getStyles(el),
                    rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
                    children: children.map(c => walkDOM(c, depth + 1)).filter(Boolean)
                };

                if (el.tagName === 'IMG') {
                    result.src = el.src;
                    result.alt = el.alt;
                    result.naturalWidth = el.naturalWidth;
                    result.naturalHeight = el.naturalHeight;
                }
                if (el.tagName === 'VIDEO') {
                    result.src = el.src || el.querySelector('source')?.src;
                    result.poster = el.poster;
                    result.autoplay = el.autoplay;
                    result.loop = el.loop;
                    result.muted = el.muted;
                }
                if (el.tagName === 'A') {
                    result.href = el.href;
                }
                if (el.tagName === 'SVG') {
                    result.outerHTML = el.outerHTML.slice(0, 3000);
                }

                return result;
            }

            return sections.map((section, idx) => {
                const rect = section.getBoundingClientRect();
                return {
                    sectionIndex: idx,
                    tag: section.tagName.toLowerCase(),
                    classes: section.className?.toString()?.slice(0, 400) || '',
                    id: section.id || '',
                    rect: {
                        top: Math.round(rect.top + window.scrollY),
                        height: Math.round(rect.height),
                        width: Math.round(rect.width)
                    },
                    styles: getStyles(section),
                    // Get all text content
                    allText: section.textContent?.trim()?.slice(0, 1000) || '',
                    // Get DOM tree (limited depth)
                    domTree: walkDOM(section, 0),
                    // Count elements
                    imgCount: section.querySelectorAll('img').length,
                    videoCount: section.querySelectorAll('video').length,
                    svgCount: section.querySelectorAll('svg').length,
                    linkCount: section.querySelectorAll('a').length,
                    buttonCount: section.querySelectorAll('button').length
                };
            });
        }""")

        with open(f"{RESEARCH}/all-sections-deep.json", "w") as f:
            json.dump(all_sections, f, indent=2)
        print(f"Deep sections saved. {len(all_sections)} sections found")

        # === EXTRACT HEADER DETAILS ===
        print("Extracting header details...")
        header_data = page.evaluate(r"""() => {
            const header = document.querySelector('header');
            if (!header) return null;

            function getStyles(el) {
                const cs = getComputedStyle(el);
                return {
                    display: cs.display, flexDirection: cs.flexDirection,
                    justifyContent: cs.justifyContent, alignItems: cs.alignItems,
                    gap: cs.gap, padding: cs.padding,
                    backgroundColor: cs.backgroundColor, color: cs.color,
                    position: cs.position, height: el.getBoundingClientRect().height,
                    width: el.getBoundingClientRect().width,
                    fontSize: cs.fontSize, fontWeight: cs.fontWeight,
                    fontFamily: cs.fontFamily, borderRadius: cs.borderRadius,
                    transition: cs.transition, backdropFilter: cs.backdropFilter,
                    zIndex: cs.zIndex
                };
            }

            // Announcement bar
            const annoBar = header.querySelector('[class*="announcement"], [class*="banner"], [class*="promo"]')
                || header.children[0];

            // Nav bar
            const nav = header.querySelector('nav') || header.children[1];

            // Get all nav items
            const navLinks = nav ? [...nav.querySelectorAll('a')].map(a => ({
                text: a.textContent?.trim(),
                href: a.href,
                styles: getStyles(a)
            })) : [];

            const navButtons = nav ? [...nav.querySelectorAll('button')].map(b => ({
                text: b.textContent?.trim(),
                ariaLabel: b.getAttribute('aria-label'),
                styles: getStyles(b)
            })) : [];

            return {
                headerStyles: getStyles(header),
                annoBarHTML: annoBar?.innerHTML?.slice(0, 500) || '',
                annoBarStyles: annoBar ? getStyles(annoBar) : null,
                annoBarText: annoBar?.textContent?.trim()?.slice(0, 200) || '',
                navStyles: nav ? getStyles(nav) : null,
                navLinks,
                navButtons,
                childCount: header.children.length
            };
        }""")

        with open(f"{RESEARCH}/header-deep.json", "w") as f:
            json.dump(header_data, f, indent=2)
        print("Header details saved")

        # === EXTRACT HERO SECTION (carousel) ===
        print("Extracting hero section...")
        hero_data = page.evaluate(r"""() => {
            // The hero is typically the first major section - a full-viewport carousel
            const main = document.querySelector('main');
            const wrapper = main?.children[1] || main?.children[0];
            const heroSection = wrapper?.children[0];
            if (!heroSection) return { error: 'No hero found' };

            const cs = getComputedStyle(heroSection);

            // Find carousel slides
            const slides = heroSection.querySelectorAll('[class*="slide"], [class*="carousel"] > div, [data-index]');
            const slideData = [];

            // Also look for the actual visible content
            const h1 = heroSection.querySelector('h1');
            const h2 = heroSection.querySelector('h2');
            const buttons = [...heroSection.querySelectorAll('a[class*="btn"], a[class*="button"], button')];
            const imgs = [...heroSection.querySelectorAll('img')];
            const videos = [...heroSection.querySelectorAll('video')];

            return {
                classes: heroSection.className?.toString()?.slice(0, 400),
                rect: {
                    height: Math.round(heroSection.getBoundingClientRect().height),
                    width: Math.round(heroSection.getBoundingClientRect().width)
                },
                styles: {
                    position: cs.position,
                    overflow: cs.overflow,
                    backgroundColor: cs.backgroundColor,
                    height: cs.height,
                    display: cs.display
                },
                h1Text: h1?.textContent?.trim() || '',
                h2Text: h2?.textContent?.trim() || '',
                subtitle: heroSection.querySelector('p')?.textContent?.trim()?.slice(0, 300) || '',
                buttons: buttons.map(b => ({
                    text: b.textContent?.trim(),
                    href: b.href || '',
                    tag: b.tagName.toLowerCase(),
                    styles: (() => {
                        const s = getComputedStyle(b);
                        return {
                            backgroundColor: s.backgroundColor,
                            color: s.color,
                            borderRadius: s.borderRadius,
                            padding: s.padding,
                            fontSize: s.fontSize,
                            fontWeight: s.fontWeight,
                            border: s.border,
                            minWidth: s.minWidth,
                            height: s.height
                        };
                    })()
                })),
                images: imgs.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    styles: {
                        objectFit: getComputedStyle(img).objectFit,
                        position: getComputedStyle(img).position,
                        width: getComputedStyle(img).width,
                        height: getComputedStyle(img).height
                    }
                })),
                videos: videos.map(v => ({
                    src: v.src || v.querySelector('source')?.src || '',
                    poster: v.poster,
                    autoplay: v.autoplay,
                    loop: v.loop,
                    muted: v.muted
                })),
                slideCount: slides.length,
                allText: heroSection.textContent?.trim()?.slice(0, 800)
            };
        }""")

        with open(f"{RESEARCH}/hero-deep.json", "w") as f:
            json.dump(hero_data, f, indent=2)
        print("Hero section saved")

        # === EXTRACT VEHICLE SHOWCASE SECTIONS ===
        print("Extracting vehicle sections...")
        vehicle_sections = page.evaluate(r"""() => {
            const main = document.querySelector('main');
            const wrapper = main?.children[1] || main?.children[0];
            if (!wrapper) return [];

            const sections = [...wrapper.children];
            const vehicleSections = [];

            sections.forEach((section, idx) => {
                const text = section.textContent?.trim() || '';
                const hasVehicleName = /\b(R1S|R1T|R2|R3)\b/i.test(text);
                const hasLargeHeading = section.querySelector('h1, h2, [class*="heading"]');

                if (hasVehicleName || (section.querySelector('img') && hasLargeHeading)) {
                    const headings = [...section.querySelectorAll('h1,h2,h3')].map(h => ({
                        tag: h.tagName.toLowerCase(),
                        text: h.textContent?.trim()?.slice(0, 200),
                        styles: (() => {
                            const s = getComputedStyle(h);
                            return {
                                fontSize: s.fontSize, fontWeight: s.fontWeight,
                                fontFamily: s.fontFamily, color: s.color,
                                lineHeight: s.lineHeight, letterSpacing: s.letterSpacing,
                                textTransform: s.textTransform
                            };
                        })()
                    }));

                    const paragraphs = [...section.querySelectorAll('p')].map(p => ({
                        text: p.textContent?.trim()?.slice(0, 400),
                        styles: (() => {
                            const s = getComputedStyle(p);
                            return { fontSize: s.fontSize, color: s.color, lineHeight: s.lineHeight, fontWeight: s.fontWeight };
                        })()
                    }));

                    const links = [...section.querySelectorAll('a')].map(a => ({
                        text: a.textContent?.trim(),
                        href: a.href,
                        styles: (() => {
                            const s = getComputedStyle(a);
                            return {
                                backgroundColor: s.backgroundColor, color: s.color,
                                borderRadius: s.borderRadius, padding: s.padding,
                                fontSize: s.fontSize, fontWeight: s.fontWeight,
                                border: s.border
                            };
                        })()
                    }));

                    const images = [...section.querySelectorAll('img')].map(img => ({
                        src: img.src, alt: img.alt,
                        naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight
                    }));

                    const cs = getComputedStyle(section);
                    vehicleSections.push({
                        sectionIndex: idx,
                        classes: section.className?.toString()?.slice(0, 400) || '',
                        rect: {
                            top: Math.round(section.getBoundingClientRect().top + window.scrollY),
                            height: Math.round(section.getBoundingClientRect().height)
                        },
                        styles: {
                            backgroundColor: cs.backgroundColor, display: cs.display,
                            padding: cs.padding, overflow: cs.overflow,
                            position: cs.position
                        },
                        headings,
                        paragraphs,
                        links,
                        images,
                        allText: text.slice(0, 600)
                    });
                }
            });

            return vehicleSections;
        }""")

        with open(f"{RESEARCH}/vehicle-sections.json", "w") as f:
            json.dump(vehicle_sections, f, indent=2)
        print(f"Vehicle sections saved: {len(vehicle_sections)}")

        # === EXTRACT FEATURES/TABS SECTION ===
        print("Extracting features section (tabs)...")
        features = page.evaluate(r"""() => {
            // Look for the "Electric vehicles designed for adventure" section with tabs
            const allH2 = [...document.querySelectorAll('h2')];
            const featH2 = allH2.find(h => h.textContent?.includes('Electric vehicles'));
            if (!featH2) return { error: 'Features section not found' };

            // Walk up to the section container
            let section = featH2.parentElement;
            while (section && section.tagName !== 'SECTION' && !section.className?.includes('section')) {
                section = section.parentElement;
                if (section === document.body) break;
            }

            const cs = getComputedStyle(section);

            // Find tab buttons
            const tabButtons = [...section.querySelectorAll('button, [role="tab"]')].map(b => ({
                text: b.textContent?.trim(),
                isActive: b.className?.includes('active') || b.getAttribute('aria-selected') === 'true',
                styles: (() => {
                    const s = getComputedStyle(b);
                    return {
                        backgroundColor: s.backgroundColor, color: s.color,
                        borderRadius: s.borderRadius, padding: s.padding,
                        fontSize: s.fontSize, fontWeight: s.fontWeight
                    };
                })()
            }));

            // Find cards/items
            const cards = [...section.querySelectorAll('[class*="card"], [class*="Card"]')].map(card => {
                const img = card.querySelector('img');
                return {
                    title: card.querySelector('h3, h4, [class*="title"]')?.textContent?.trim() || '',
                    description: card.querySelector('p')?.textContent?.trim()?.slice(0, 300) || '',
                    image: img ? { src: img.src, alt: img.alt } : null,
                    styles: (() => {
                        const s = getComputedStyle(card);
                        return {
                            backgroundColor: s.backgroundColor, borderRadius: s.borderRadius,
                            padding: s.padding, width: s.width, overflow: s.overflow
                        };
                    })()
                };
            });

            return {
                classes: section.className?.toString()?.slice(0, 400) || '',
                rect: {
                    top: Math.round(section.getBoundingClientRect().top + window.scrollY),
                    height: Math.round(section.getBoundingClientRect().height)
                },
                styles: {
                    backgroundColor: cs.backgroundColor, padding: cs.padding,
                    display: cs.display
                },
                heading: featH2.textContent?.trim(),
                tabButtons,
                cards,
                allText: section.textContent?.trim()?.slice(0, 1000)
            };
        }""")

        with open(f"{RESEARCH}/features-section.json", "w") as f:
            json.dump(features, f, indent=2)
        print("Features section saved")

        # === EXTRACT FOOTER ===
        print("Extracting footer...")
        footer = page.evaluate(r"""() => {
            const footer = document.querySelector('footer');
            if (!footer) return { error: 'No footer found' };

            const cs = getComputedStyle(footer);
            const links = [...footer.querySelectorAll('a')].map(a => ({
                text: a.textContent?.trim(),
                href: a.href
            }));

            const columns = [...footer.querySelectorAll('[class*="col"], [class*="Col"], footer > div > div')].map(col => ({
                heading: col.querySelector('h3, h4, strong, [class*="heading"]')?.textContent?.trim() || '',
                links: [...col.querySelectorAll('a')].map(a => ({
                    text: a.textContent?.trim(),
                    href: a.href
                }))
            }));

            return {
                classes: footer.className?.toString()?.slice(0, 400) || '',
                styles: {
                    backgroundColor: cs.backgroundColor, color: cs.color,
                    padding: cs.padding, fontSize: cs.fontSize
                },
                columns,
                allLinks: links,
                allText: footer.textContent?.trim()?.slice(0, 2000),
                svgCount: footer.querySelectorAll('svg').length
            };
        }""")

        with open(f"{RESEARCH}/footer-deep.json", "w") as f:
            json.dump(footer, f, indent=2)
        print("Footer saved")

        # === EXTRACT ALL UNIQUE IMAGE/VIDEO URLs FOR DOWNLOAD ===
        print("Extracting all asset URLs for download...")
        asset_urls = page.evaluate(r"""() => {
            const images = new Set();
            const videos = new Set();

            document.querySelectorAll('img').forEach(img => {
                if (img.src) images.add(img.src);
                if (img.srcset) {
                    img.srcset.split(',').forEach(s => {
                        const url = s.trim().split(' ')[0];
                        if (url) images.add(url);
                    });
                }
            });

            document.querySelectorAll('video source, video').forEach(v => {
                if (v.src) videos.add(v.src);
            });

            // Background images
            document.querySelectorAll('*').forEach(el => {
                const bg = getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none') {
                    const urls = bg.match(/url\(["']?([^"')]+)["']?\)/g);
                    if (urls) {
                        urls.forEach(u => {
                            const url = u.replace(/url\(["']?/, '').replace(/["']?\)/, '');
                            images.add(url);
                        });
                    }
                }
            });

            return {
                images: [...images],
                videos: [...videos]
            };
        }""")

        with open(f"{RESEARCH}/asset-urls.json", "w") as f:
            json.dump(asset_urls, f, indent=2)
        print(f"Asset URLs saved: {len(asset_urls['images'])} images, {len(asset_urls['videos'])} videos")

        # === EXTRACT FONT FILES ===
        print("Extracting font information...")
        fonts_info = page.evaluate(r"""() => {
            // Get all stylesheets and look for @font-face
            const fontFaces = [];
            try {
                for (const sheet of document.styleSheets) {
                    try {
                        for (const rule of sheet.cssRules) {
                            if (rule instanceof CSSFontFaceRule) {
                                fontFaces.push({
                                    family: rule.style.fontFamily,
                                    src: rule.style.src,
                                    weight: rule.style.fontWeight,
                                    style: rule.style.fontStyle,
                                    display: rule.style.fontDisplay
                                });
                            }
                        }
                    } catch(e) {
                        // CORS blocked stylesheet
                    }
                }
            } catch(e) {}

            // Also check link elements for font preloads
            const preloads = [...document.querySelectorAll('link[rel="preload"][as="font"], link[href*="font"]')].map(l => ({
                href: l.href,
                type: l.type || '',
                crossorigin: l.crossOrigin || ''
            }));

            return { fontFaces, preloads };
        }""")

        with open(f"{RESEARCH}/fonts-info.json", "w") as f:
            json.dump(fonts_info, f, indent=2)
        print(f"Fonts info saved: {len(fonts_info['fontFaces'])} font-faces, {len(fonts_info['preloads'])} preloads")

        # === Take per-section screenshots ===
        print("Taking per-section screenshots...")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)

        # Take screenshots of key sections by scrolling
        section_positions = [0, 900, 1800, 2700, 3600, 4500, 5400, 6300, 7200, 8100, 9000, 9900, 10800, 11700, 12600, 13500, 14400, 15300, 16200]
        for i, pos in enumerate(section_positions):
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.4)
            page.screenshot(path=f"{DESIGN_REF}/section-{i:02d}-{pos}px.png", full_page=False)

        print(f"\n=== DEEP INSPECTION COMPLETE ===")
        browser.close()


if __name__ == "__main__":
    run()
