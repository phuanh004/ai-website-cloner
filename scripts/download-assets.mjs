/**
 * Download all assets from rivian.com for the clone.
 * Downloads fonts, images, videos, and favicons.
 */
import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const BASE = "/Users/anh/Downloads/ai-website-cloner-template-master";

// Font files to download
const fonts = [
  { url: "https://media.rivian.com/raw/upload/bedrock-ui/fonts/Adventure-Light.woff2", name: "Adventure-Light.woff2" },
  { url: "https://media.rivian.com/raw/upload/bedrock-ui/fonts/Adventure-Regular.woff2", name: "Adventure-Regular.woff2" },
  { url: "https://media.rivian.com/raw/upload/bedrock-ui/fonts/Adventure-SemiBold.woff2", name: "Adventure-SemiBold.woff2" },
  { url: "https://media.rivian.com/raw/upload/bedrock-ui/fonts/Adventure-Bold.woff2", name: "Adventure-Bold.woff2" },
  { url: "https://assets.rivian.com/2md5qhoeajym/4ElQ3t2cYaZWJfYvh3AKYi/637a0877461fc76ac65842a2e58d4dbc/AdventureV1-Light.otf", name: "Liga-Light.otf" },
  { url: "https://assets.rivian.com/2md5qhoeajym/4L9ZvTcszLVQJHzRXsb03J/0953a15faa25ea3fd3d50339d59d5323/AdventureV1-Regular.otf", name: "Liga-Regular.otf" },
  { url: "https://assets.rivian.com/2md5qhoeajym/4LzEfmGSeWQppOcmiZuXlv/6445dc40baaa0706c8bb9603ec67e495/AdventureV1-Medium.otf", name: "Liga-Medium.otf" },
];

// Key images for the homepage
const images = [
  // Hero carousel images
  { url: "https://media.rivian.com/video/upload/so_0/g_auto/f_auto:image/q_auto/paoc8167kgw7junddybn?_a=BAVFB+DW0", name: "hero-r2-forest.webp" },
  { url: "https://media.rivian.com/image/upload/f_auto/q_auto/mobile2_250410-SinnaNasseri-NYC-Pantry-1089_v6_FINAL_1_r6jmco?_a=BAVFB+DW0", name: "hero-r1s-bridge.webp" },
  { url: "https://media.rivian.com/image/upload/f_auto/q_auto/mobile_PS_250617_LESLIE-HITTMEIER-MONTANA-SPRING-357-Final_1_1_k3lnbo?_a=BAVFB+DW0", name: "hero-r1s-field.webp" },

  // Vehicle showcase images
  { url: "https://media.rivian.com/rivian-main/image/upload/f_auto/q_auto:eco/v1/rivian-com/home-page/vehicles/r1s_layers/shadow?_a=BAVFB+DW0", name: "r1s-shadow.webp" },
  { url: "https://media.rivian.com/rivian-main/image/upload/f_auto/q_auto:eco/v1/rivian-com/home-page/vehicles/r1s_layers/base?_a=BAVFB+DW0", name: "r1s-base.webp" },
  { url: "https://media.rivian.com/rivian-main/image/upload/f_auto/q_auto:eco/v1/rivian-com/home-page/vehicles/r2_layers/shadow?_a=BAVFB+DW0", name: "r2-shadow.webp" },
  { url: "https://media.rivian.com/rivian-main/image/upload/f_auto/q_auto:eco/v1/rivian-com/home-page/vehicles/r2_layers/base?_a=BAVFB+DW0", name: "r2-base.webp" },
  { url: "https://media.rivian.com/rivian-main/image/upload/f_auto/q_auto:eco/v1/rivian-com/home-page/vehicles/r1t_layers/shadow?_a=BAVFB+DW0", name: "r1t-shadow.webp" },
  { url: "https://media.rivian.com/rivian-main/image/upload/f_auto/q_auto:eco/v1/rivian-com/home-page/vehicles/r1t_layers/base?_a=BAVFB+DW0", name: "r1t-base.webp" },

  // Safety section parallax
  { url: "https://media.rivian.com/image/upload/f_auto/q_auto/v1/rivian-com/home%20page/safety_parallax_background?_a=BAVFB+DW0", name: "safety-bg.webp" },
  { url: "https://media.rivian.com/image/upload/f_auto/q_auto/v1/rivian-com/home%20page/safety_parallax_foreground?_a=BAVFB+DW0", name: "safety-fg.webp" },
  { url: "https://media.rivian.com/image/upload/f_svg/c_limit,w_117/v1774383710/rivian-com/home-page/2026_iihs_safety?_a=BAVFB+DW0", name: "iihs-badge.svg" },

  // Showroom
  { url: "https://media.rivian.com/image/upload/c_scale/w_630/f_auto/q_auto/Rivian-Seattle_STH-Web_Res_Anton_Benedikt-0002_V3_f1bjvj?_a=BAVFB+DW0", name: "showroom-1.webp" },
  { url: "https://media.rivian.com/image/upload/c_scale/w_630/f_auto/q_auto/Rivian-Seattle_STH-Web_Res_Anton_Benedikt-0001_V3_seojqr?_a=BAVFB+DW0", name: "showroom-2.webp" },

  // Favicons
  { url: "https://rivian.com/favicon.ico", name: "../seo/favicon.ico" },
  { url: "https://rivian.com/apple-touch-icon.png", name: "../seo/apple-touch-icon.png" },
];

async function downloadFile(url, destPath) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    });
    if (!response.ok) {
      console.error(`  FAIL ${response.status}: ${url}`);
      return false;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const dir = path.dirname(destPath);
    if (!existsSync(dir)) await mkdir(dir, { recursive: true });
    await writeFile(destPath, buffer);
    console.log(`  OK: ${path.basename(destPath)} (${(buffer.length / 1024).toFixed(1)}KB)`);
    return true;
  } catch (e) {
    console.error(`  ERROR: ${url} - ${e.message}`);
    return false;
  }
}

async function downloadBatch(items, destDir, concurrency = 4) {
  let success = 0;
  let fail = 0;

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const results = await Promise.all(
      batch.map(item => downloadFile(item.url, path.join(destDir, item.name)))
    );
    results.forEach(r => r ? success++ : fail++);
  }
  return { success, fail };
}

async function main() {
  console.log("=== Downloading Rivian Assets ===\n");

  // Create directories
  await mkdir(`${BASE}/public/fonts`, { recursive: true });
  await mkdir(`${BASE}/public/images`, { recursive: true });
  await mkdir(`${BASE}/public/seo`, { recursive: true });

  console.log("--- Fonts ---");
  const fontResult = await downloadBatch(fonts, `${BASE}/public/fonts`);
  console.log(`Fonts: ${fontResult.success} downloaded, ${fontResult.fail} failed\n`);

  console.log("--- Images ---");
  const imgResult = await downloadBatch(images, `${BASE}/public/images`);
  console.log(`Images: ${imgResult.success} downloaded, ${imgResult.fail} failed\n`);

  console.log("=== Done ===");
}

main();
