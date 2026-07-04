# Vadim Zaripov Portfolio

Static Next.js portfolio prepared for hosting on Beget.

## Local Development

```bash
npm install
npm run dev
```

Local URL: http://localhost:3001

## Static Build

```bash
npm run build
```

Next.js exports the static site to `out/`.

## Deploy To Beget

1. Run `npm run build`.
2. Open the `out/` folder.
3. Upload the contents of `out/` to the site root on Beget, usually `public_html/`.
4. Make sure hidden files are uploaded too, especially `out/.htaccess`.

The site is static: no Node.js server or Next.js API routes are required on Beget.
