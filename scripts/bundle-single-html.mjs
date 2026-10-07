import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const distDir = path.join(projectRoot, "dist");
const outHtmlPath = path.join(outDir, "index.html");

if (!fs.existsSync(outHtmlPath)) {
  console.error("Error: out/index.html does not exist. Please run next build first.");
  process.exit(1);
}

// 1. Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 2. Mirror all files from out/ to dist/ (including _next/, images/, robots.txt, sitemap.xml, etc.)
console.log("Copying Next.js static export files from out/ to dist/...");
fs.cpSync(outDir, distDir, { recursive: true });
console.log("✅ Copied out/ to dist/");

// 3. Mirror images to dist/assets for tools/scripts looking for an assets folder
const assetsDir = path.join(distDir, "assets");
const publicImagesDir = path.join(projectRoot, "public/images");
if (fs.existsSync(publicImagesDir)) {
  fs.cpSync(publicImagesDir, assetsDir, { recursive: true });
  console.log(`✅ Mirrored images to ${assetsDir}`);
}

// 4. Copy .htaccess for Hostinger Apache/LiteSpeed web servers
const htaccessPath = path.join(projectRoot, "public/.htaccess");
if (fs.existsSync(htaccessPath)) {
  fs.copyFileSync(htaccessPath, path.join(distDir, ".htaccess"));
  fs.copyFileSync(htaccessPath, path.join(projectRoot, ".htaccess"));
  console.log("✅ Copied .htaccess to dist/ and project root");
}

// 5. Standard formatted XML Sitemap for Google Search Console and web crawlers
const cleanSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myrabyeloria.in/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), cleanSitemapXml, "utf-8");
fs.writeFileSync(path.join(projectRoot, "sitemap.xml"), cleanSitemapXml, "utf-8");
fs.writeFileSync(path.join(outDir, "sitemap.xml"), cleanSitemapXml, "utf-8");

const xslPath = path.join(projectRoot, "public/sitemap.xsl");
if (fs.existsSync(xslPath)) {
  fs.copyFileSync(xslPath, path.join(distDir, "sitemap.xsl"));
  fs.copyFileSync(xslPath, path.join(projectRoot, "sitemap.xsl"));
}

// 6. Copy essential SEO files to root for direct hosting
const rootSeoFiles = ["robots.txt", "llms.txt", "404.html", "index.html", "sitemap.xsl"];
for (const file of rootSeoFiles) {
  const src = path.join(outDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(projectRoot, file));
  }
}
console.log("✅ Synchronized SEO files and index.html to project root");

// 6. Generate standalone-offline.html for offline previewing if needed
try {
  let offlineHtml = fs.readFileSync(outHtmlPath, "utf-8");

  function resolveAssetPath(assetUrl) {
    const cleanPath = assetUrl.replace("/_next/", "");
    const inOut = path.join(projectRoot, "out/_next", cleanPath);
    if (fs.existsSync(inOut)) return inOut;
    const inNext = path.join(projectRoot, ".next", cleanPath);
    if (fs.existsSync(inNext)) return inNext;
    return null;
  }

  // Inline CSS into offlineHtml
  offlineHtml = offlineHtml.replace(/<link[^>]+rel=["']stylesheet["'][^>]+href=["'](\/_next\/static\/css\/[^"']+)["'][^>]*\/?>/gi, (match, href) => {
    const cssPath = resolveAssetPath(href);
    if (cssPath && fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, "utf-8");
      return `<style>\n${cssContent}\n</style>`;
    }
    return match;
  });

  const offlinePath = path.join(distDir, "standalone-offline.html");
  fs.writeFileSync(offlinePath, offlineHtml, "utf-8");
  console.log("✅ Generated dist/standalone-offline.html");
} catch (err) {
  console.warn("Notice: could not generate standalone-offline.html:", err.message);
}

console.log("🎉 Build packaging completed successfully. dist/ is ready for deployment.");
