# Deployment Setup Guide

This site is statically exported with Next.js and deployed to IONOS shared hosting via GitHub Actions + SFTP.

## 1. GitHub Repository Secrets

Go to your repo **Settings > Secrets and variables > Actions** and add these secrets:

| Secret | Value | Notes |
|--------|-------|-------|
| `IONOS_FTP_SERVER` | Your IONOS FTP hostname | Found in IONOS control panel under **Hosting > SFTP & SSH**. Typically something like `access123456789.webspace-data.io` |
| `IONOS_FTP_USERNAME` | Your IONOS FTP username | Same location as above |
| `IONOS_FTP_PASSWORD` | Your IONOS FTP password | Same location as above |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `m8shvxfm` | |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `NEXT_PUBLIC_SITE_URL` | `https://bollingtontownfc.co.uk` | |

### Finding your IONOS FTP credentials

1. Log in to [IONOS Control Panel](https://my.ionos.co.uk)
2. Go to **Hosting** > select your package
3. Look for **SFTP & SSH** section
4. Your server hostname, username, and password are listed there
5. If you haven't set an FTP password yet, create one

## 2. IONOS Hosting Configuration

### Document root

The deploy action uploads the contents of `out/` to the FTP root. Make sure your IONOS document root points to the correct directory. By default this is usually the root of your webspace, which is where files will land.

### Domain setup

Ensure your domain `bollingtontownfc.co.uk` is pointed to your IONOS hosting:

1. In IONOS Control Panel, go to **Domains & SSL**
2. Verify `bollingtontownfc.co.uk` is assigned to your hosting package
3. Enable SSL/TLS (IONOS provides free SSL certificates)

### Apache `.htaccess`

The `.htaccess` file is included in the build output automatically (from `public/.htaccess`). It handles:

- **Clean URLs** — `/news` serves `news.html` without the extension
- **Sanity Studio SPA fallback** — `/studio/anything` routes to `studio.html`
- **404 page** — Missing pages serve `404.html`

If `.htaccess` rules don't seem to work, check that `mod_rewrite` is enabled (it is by default on IONOS shared hosting).

## 3. Deploy

### Automatic deployment

Every push to `main` triggers a build and deploy automatically.

### Manual deployment

To trigger a deploy without pushing code (e.g., after updating content in Sanity):

1. Go to your repo on GitHub
2. Click **Actions** tab
3. Select **Build & Deploy to IONOS**
4. Click **Run workflow** > **Run workflow**

### Sanity webhook (optional — auto-rebuild on content changes)

To automatically rebuild when content is published in Sanity:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) > your project > **API** > **Webhooks**
2. Create a new webhook:
   - **Name:** `Deploy to IONOS`
   - **URL:** `https://api.github.com/repos/YOUR_USERNAME/bolly-town-fc-next/dispatches`
   - **HTTP method:** POST
   - **Headers:** Add `Authorization: token YOUR_GITHUB_PAT` and `Accept: application/vnd.github.v3+json`
   - **Body:** `{"event_type": "sanity-webhook"}` (note: you'll also need to add `repository_dispatch` to the workflow trigger if using this method, OR use `workflow_dispatch` via the GitHub API)
   - **Trigger on:** Create, Update, Delete

   Alternatively, use a simpler approach with `workflow_dispatch`:
   - **URL:** `https://api.github.com/repos/YOUR_USERNAME/bolly-town-fc-next/actions/workflows/deploy.yml/dispatches`
   - **Headers:** `Authorization: token YOUR_GITHUB_PAT` and `Accept: application/vnd.github.v3+json`
   - **Body:** `{"ref": "main"}`

   For the GitHub PAT, create one at [github.com/settings/tokens](https://github.com/settings/tokens) with `repo` scope.

## 4. Test the Deployment

After your first deploy, verify:

- [ ] Homepage loads at `https://bollingtontownfc.co.uk`
- [ ] Navigation links work (e.g., `/matches`, `/news`, `/squad`)
- [ ] Match report pages load (e.g., `/matches/match-2026-02-07-middlewich`)
- [ ] Images load correctly (served via Sanity CDN)
- [ ] Sanity Studio loads at `/studio` and shows login screen
- [ ] 404 page shows for non-existent routes (e.g., `/nonexistent`)
- [ ] `sitemap.xml` and `robots.txt` are accessible
- [ ] SSL certificate is active (green padlock)

## 5. Troubleshooting

### Build fails in GitHub Actions

- Check the Actions tab for error logs
- Verify all 6 secrets are set correctly (no trailing spaces)
- The Sanity project must be accessible (check `m8shvxfm.api.sanity.io` is reachable)

### SFTP deploy fails

- Verify credentials by testing with an SFTP client (e.g., FileZilla with SFTP protocol, port 22)
- IONOS shared hosting uses SFTP (SSH-based), not FTP/FTPS — the workflow uses `wlixcc/SFTP-Deploy-Action`
- Check the `remote_path` — IONOS typically serves from `/` but your document root may differ

### Pages show 404 or raw HTML filename

- Check that `.htaccess` was deployed (it should be in the webspace root)
- Verify `mod_rewrite` is enabled in IONOS hosting settings

### Sanity Studio shows blank page on sub-routes

- The `.htaccess` SPA fallback rule should handle this
- If not working, check IONOS supports `RewriteRule` directives

### Content changes not appearing

- Trigger a manual rebuild from the Actions tab
- Or set up the Sanity webhook (see section 3)
- The site is fully static — changes in Sanity require a rebuild to appear
