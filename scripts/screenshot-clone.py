"""Take screenshots of the clone for visual QA comparison."""
import time
from patchright.sync_api import sync_playwright

BASE = "/Users/anh/Downloads/ai-website-cloner-template-master"
DESIGN_REF = f"{BASE}/docs/design-references"


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        print("Navigating to clone...")
        page.goto("http://localhost:3000", wait_until="networkidle", timeout=30000)
        time.sleep(3)

        print("Taking desktop full-page screenshot...")
        page.screenshot(path=f"{DESIGN_REF}/clone-desktop-1440.png", full_page=True)

        print("Taking desktop viewport screenshot...")
        page.screenshot(path=f"{DESIGN_REF}/clone-desktop-viewport.png", full_page=False)

        # Mobile
        page.set_viewport_size({"width": 390, "height": 844})
        time.sleep(2)
        print("Taking mobile screenshot...")
        page.screenshot(path=f"{DESIGN_REF}/clone-mobile-390.png", full_page=True)

        # Scroll screenshots at desktop
        page.set_viewport_size({"width": 1440, "height": 900})
        time.sleep(1)
        for i, pos in enumerate([0, 900, 1800, 2700, 3600, 4500, 5400, 6300]):
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(0.5)
            page.screenshot(path=f"{DESIGN_REF}/clone-scroll-{i:02d}-{pos}px.png", full_page=False)

        print("Screenshots complete!")
        browser.close()


if __name__ == "__main__":
    run()
