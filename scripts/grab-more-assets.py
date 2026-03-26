"""
Grab more assets from rivian.com: videos, feature card images, wheel images, etc.
Uses network interception to capture all loaded media.
"""
import json
import os
import time
import re
from urllib.parse import urlparse
from patchright.sync_api import sync_playwright

BASE = "/Users/anh/Downloads/ai-website-cloner-template-master"
RESEARCH = f"{BASE}/docs/research"

def run():
    captured_urls = {"videos": [], "images": [], "other": []}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        )

        # Intercept network to capture media URLs
        page = context.new_page()

        def handle_response(response):
            url = response.url
            content_type = response.headers.get("content-type", "")
            if any(ext in url.lower() for ext in [".mp4", ".webm", ".mov"]) or "video" in content_type:
                captured_urls["videos"].append(url)
            elif any(ext in url.lower() for ext in [".webp", ".jpg", ".jpeg", ".png", ".avif"]) or "image" in content_type:
                if "media.rivian.com" in url or "assets.rivian.com" in url:
                    captured_urls["images"].append(url)

        page.on("response", handle_response)

        # === Visit homepage ===
        print("=== Homepage ===")
        page.goto("https://rivian.com/", wait_until="domcontentloaded", timeout=60000)
        time.sleep(8)

        # Scroll through the entire page to trigger lazy loads
        page_height = page.evaluate("document.documentElement.scrollHeight")
        for pos in range(0, page_height, 400):
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.3)
        time.sleep(3)

        # Click through hero carousel slides
        for _ in range(3):
            try:
                next_btn = page.locator('button[aria-label*="next"], button[aria-label*="Next"]')
                if next_btn.count() > 0:
                    next_btn.first.click()
                    time.sleep(2)
            except Exception:
                pass

        # Click feature tabs
        for tab_text in ["Technology", "Performance", "Design"]:
            try:
                tab = page.locator(f'button:has-text("{tab_text}")')
                if tab.count() > 0:
                    tab.first.click()
                    time.sleep(2)
            except Exception:
                pass

        print(f"Homepage: {len(captured_urls['videos'])} videos, {len(captured_urls['images'])} images")

        # === Visit R1S page ===
        print("\n=== R1S Page ===")
        page.goto("https://rivian.com/r1s", wait_until="domcontentloaded", timeout=60000)
        time.sleep(5)
        r1s_height = page.evaluate("document.documentElement.scrollHeight")
        for pos in range(0, min(r1s_height, 5000), 500):
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.3)
        time.sleep(2)

        # Extract hero video
        r1s_videos = page.evaluate("""() => {
            return [...document.querySelectorAll('video source, video')].map(v => v.src).filter(Boolean);
        }""")
        print(f"R1S videos from DOM: {r1s_videos}")

        # === Visit R1T page ===
        print("\n=== R1T Page ===")
        page.goto("https://rivian.com/r1t", wait_until="domcontentloaded", timeout=60000)
        time.sleep(5)
        for pos in range(0, 5000, 500):
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.3)
        time.sleep(2)

        # === Visit R2 page ===
        print("\n=== R2 Page ===")
        page.goto("https://rivian.com/r2", wait_until="domcontentloaded", timeout=60000)
        time.sleep(5)
        for pos in range(0, 5000, 500):
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.3)
        time.sleep(2)

        # === Extract specific assets from homepage ===
        print("\n=== Extracting specific assets ===")
        page.goto("https://rivian.com/", wait_until="domcontentloaded", timeout=60000)
        time.sleep(8)

        # Get feature tab card images
        feature_images = page.evaluate(r"""() => {
            const section = [...document.querySelectorAll('h2')].find(h => h.textContent?.includes('Electric vehicles'));
            if (!section) return [];
            let container = section.parentElement;
            while (container && container.tagName !== 'SECTION') container = container.parentElement;
            if (!container) container = section.parentElement?.parentElement;
            const imgs = [...(container || document).querySelectorAll('img')].map(i => ({
                src: i.src, alt: i.alt, width: i.naturalWidth, height: i.naturalHeight
            }));
            return imgs;
        }""")

        # Get "Get behind the wheel" section image
        drive_images = page.evaluate(r"""() => {
            const els = [...document.querySelectorAll('h2, h3')].filter(h => h.textContent?.includes('behind the wheel'));
            if (els.length === 0) return [];
            let container = els[0].parentElement;
            while (container && !container.querySelector('img') && container.tagName !== 'SECTION') container = container.parentElement;
            const imgs = container ? [...container.querySelectorAll('img')].map(i => ({src: i.src, alt: i.alt})) : [];
            const vids = container ? [...container.querySelectorAll('video source, video')].map(v => ({src: v.src})) : [];
            return { images: imgs, videos: vids };
        }""")

        # Get charging section images
        charging_images = page.evaluate(r"""() => {
            const section = [...document.querySelectorAll('h2')].find(h => h.textContent?.includes('electric exploration'));
            if (!section) return [];
            let container = section.parentElement;
            while (container && container.tagName !== 'SECTION') container = container.parentElement;
            if (!container) container = section.parentElement?.parentElement;
            const imgs = [...(container || document).querySelectorAll('img')].map(i => ({
                src: i.src, alt: i.alt
            }));
            return imgs;
        }""")

        # Deduplicate
        all_videos = list(set(captured_urls["videos"]))
        all_images = list(set(captured_urls["images"]))

        results = {
            "network_videos": all_videos,
            "network_images_count": len(all_images),
            "network_images_sample": all_images[:30],
            "feature_images": feature_images,
            "drive_section": drive_images,
            "charging_images": charging_images,
            "r1s_videos": r1s_videos if isinstance(r1s_videos, list) else []
        }

        with open(f"{RESEARCH}/more-assets.json", "w") as f:
            json.dump(results, f, indent=2)

        print(f"\nTotal captured: {len(all_videos)} videos, {len(all_images)} images")
        print(f"Feature images: {len(feature_images)}")
        print(f"Drive section: {drive_images}")
        print(f"Charging images: {len(charging_images)}")

        # === Download key assets ===
        print("\n=== Downloading assets ===")
        import urllib.request

        os.makedirs(f"{BASE}/public/videos", exist_ok=True)

        # Download videos (first few, they can be large)
        video_downloads = []
        for url in all_videos[:6]:
            try:
                parsed = urlparse(url)
                filename = parsed.path.split("/")[-1].split("?")[0]
                if not filename or filename == "":
                    filename = f"video-{len(video_downloads)}.mp4"
                if not filename.endswith(('.mp4', '.webm')):
                    filename += '.mp4'
                dest = f"{BASE}/public/videos/{filename}"
                if not os.path.exists(dest):
                    print(f"  Downloading video: {filename}...")
                    urllib.request.urlretrieve(url, dest)
                    size_mb = os.path.getsize(dest) / (1024*1024)
                    print(f"  OK: {filename} ({size_mb:.1f}MB)")
                    video_downloads.append(filename)
                else:
                    print(f"  Skip (exists): {filename}")
            except Exception as e:
                print(f"  FAIL: {e}")

        # Download feature card images
        for i, img in enumerate(feature_images[:9]):
            try:
                url = img.get("src", "")
                if not url or "data:" in url:
                    continue
                filename = f"feature-{i+1}.webp"
                dest = f"{BASE}/public/images/{filename}"
                if not os.path.exists(dest):
                    print(f"  Downloading: {filename}...")
                    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req) as resp:
                        with open(dest, "wb") as f:
                            f.write(resp.read())
                    size_kb = os.path.getsize(dest) / 1024
                    print(f"  OK: {filename} ({size_kb:.0f}KB)")
            except Exception as e:
                print(f"  FAIL feature-{i+1}: {e}")

        # Download charging section images
        for i, img in enumerate(charging_images[:6]):
            try:
                url = img.get("src", "")
                if not url or "data:" in url:
                    continue
                filename = f"charging-{i+1}.webp"
                dest = f"{BASE}/public/images/{filename}"
                if not os.path.exists(dest):
                    print(f"  Downloading: {filename}...")
                    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                    with urllib.request.urlopen(req) as resp:
                        with open(dest, "wb") as f:
                            f.write(resp.read())
                    size_kb = os.path.getsize(dest) / 1024
                    print(f"  OK: {filename} ({size_kb:.0f}KB)")
            except Exception as e:
                print(f"  FAIL charging-{i+1}: {e}")

        print("\n=== DONE ===")
        browser.close()

if __name__ == "__main__":
    run()
