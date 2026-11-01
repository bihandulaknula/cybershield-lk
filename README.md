# CyberShield LK — Version 1

A responsive, static cybersecurity education website built with HTML, CSS and vanilla JavaScript. It is designed for free deployment on Cloudflare Pages.

## Included
- Responsive dark cybersecurity landing page
- Learning topics and client-side topic search
- Password strength indicator (basic heuristic; not a security audit)
- Random password generator using `crypto.getRandomValues()`
- SHA-256 text hash generator using Web Crypto API
- Beginner learning roadmap
- Curated external learning resources
- Non-collecting newsletter demo
- SEO description and Open Graph metadata

## Run locally
1. Extract the ZIP.
2. Open the folder in Visual Studio Code.
3. Use the VS Code Live Server extension, or run a local static server:
   - Python: `python -m http.server 8000`
   - Then open `http://localhost:8000`

The SHA-256 tool requires a secure context: HTTPS or localhost.

## Publish free with Cloudflare Pages (Git integration)
1. Create a free account at https://dash.cloudflare.com/
2. Create/sign in to GitHub at https://github.com/
3. In GitHub, create a new **public** repository, for example `cybershield-lk`.
4. Upload `index.html`, `styles.css`, `app.js` and `README.md` to the repository root.
5. In Cloudflare Dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
6. Connect GitHub and select your `cybershield-lk` repository.
7. For framework preset choose **None** (or **Static HTML** if shown).
8. Set the build command to blank / none.
9. Set the build output directory to `/` (repository root).
10. Select **Save and Deploy**. Cloudflare will provide a `*.pages.dev` address.

For a plain static site, no build command or environment variables are required. Dashboard labels may change; follow Cloudflare's current Pages documentation if the menu differs:
https://developers.cloudflare.com/pages/get-started/git-integration/

## Before launching publicly
- Replace the demo contact address `hello@cybershieldlk.example` with a real address you control, or remove the link.
- Add a real Privacy Policy and Terms/Disclaimer appropriate to your use. The current version is a starter, not legal advice.
- The newsletter form is intentionally non-functional and does not store email addresses. Connect a reputable mailing-list provider and publish its privacy details before collecting emails.
- Add original, fact-checked articles. Do not publish AI-generated cybersecurity instructions without checking them.
- Review all external links and affiliate disclosures.
- Consider adding a custom domain later. A custom domain is not needed for the first launch.

## Security notes
- The password checker is a simple client-side heuristic. It does not check breached-password databases or estimate real-world cracking time.
- The generator uses browser cryptography, but users should still store generated passwords in a reputable password manager.
- The SHA-256 tool hashes sample text locally. Hashing is not encryption.
- Only test systems you own or have explicit permission to assess.
- This starter site has no backend, accounts, analytics, database or email collection.
