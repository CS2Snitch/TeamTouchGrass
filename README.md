# Touch Grass community website

Static GitHub Pages website for teamtouchgrass.com, rebranded from a FragPunk team into a community for Palworld, Counter-Strike 2, Team Fortress 2, FragPunk, Minecraft, and How to Fish.

## Files and editing

- `index.html`: homepage, six game cards, Palworld connection guide, community sections, original six-artwork brand gallery, merch, and Discord links.
- `style.css`: responsive black and green design with a framed community illustration, distinct game card accents, quick Palworld access, and navigation highlights. Gallery and merch previews fit each original artwork's visible bounds using CSS, preserving the complete design and unchanged downloadable PNGs.
- `script.js`: mobile navigation, address copying with manual fallback, accessible scrollable gallery with optional slideshow. The slideshow starts from its Play button, pauses while browsing artwork or in a hidden tab, and stops when reduced motion is enabled. Arrow keys browse; Home and End jump to the first and last artwork.
- `assets/images/`: original gallery PNGs remain unchanged; `community-world.png` is a new original illustration inspired by their style.
- `CNAME`: preserved as `teamtouchgrass.com`. Do not replace it with the game subdomain.

No installation, framework, database, account system, or build step is required. The HTML remains usable without JavaScript; the gallery can be scrolled and artwork opened directly.

## Community destinations

Discord: https://discord.gg/cs2snitch

Merch: https://teamtouchgrass.store

Social links: https://twitch.tv/cs2snitch · https://youtube.com/cs2snitch · https://x.com/cs2snitch · https://tiktok.com/cs2snitch

Twitch always opens CS2Snitch; there is no channel rotation.

Palworld: `play.teamtouchgrass.com:45000` with direct-IP fallback `15.204.102.13:45000`.

The site does not test live server status. No dedicated server addresses or fixed schedules are claimed for the other games. Update both visible text and `data-copy` attributes together if an address changes. Never place join/admin passwords or private credentials in the site.

The existing analytics property `G-YDYLEMKYGG`, favicon, original artwork files, and community links are preserved. Old `#about`, `#schedule`, `#roster`, `#gallery`, `#merch`, `#news`, and `#join` anchors still resolve; old placeholder roster, dates, and match results have been replaced with community content.

## Review and publication

The website publishes through GitHub Pages from `main`. Changes should preserve `CNAME`, all original gallery PNGs, existing community links, and analytics. The domain's website/email DNS and Palworld DNS do not need changes for visual updates.
