# Touch Grass community website

Static GitHub Pages website for teamtouchgrass.com, rebranded from a FragPunk team into a community for Palworld, Counter-Strike 2, Team Fortress 2, FragPunk, Minecraft, and How to Fish.

## Files and editing

- `index.html`: homepage, six game cards, Palworld connection guide, community sections, original six-artwork brand gallery, merch, and Discord links.
- `style.css`: responsive black, white, and green design.
- `script.js`: mobile navigation, address copying with manual fallback, accessible scrollable gallery with optional slideshow, and the existing weighted Twitch links. The slideshow starts from its Play button, pauses while browsing artwork or in a hidden tab, and stops when reduced motion is enabled. Arrow keys browse; Home and End jump to the first and last artwork.
- `assets/images/`: original gallery PNGs remain unchanged; `community-world.png` is a new original illustration inspired by their style.
- `CNAME`: preserved as `teamtouchgrass.com`. Do not replace it with the game subdomain.

No installation, framework, database, account system, or build step is required. The HTML remains usable without JavaScript; the gallery can be scrolled and artwork opened directly.

## Community destinations

Discord: https://discord.gg/cs2snitch

Merch: https://teamtouchgrass.store

Palworld: `play.teamtouchgrass.com:45000` with direct-IP fallback `15.204.102.13:45000`.

The site does not test live server status. No dedicated server addresses or fixed schedules are claimed for the other games. Update both visible text and `data-copy` attributes together if an address changes. Never place join/admin passwords or private credentials in the site.

The existing analytics property `G-YDYLEMKYGG`, favicon, original artwork files, and Twitch channel weights are preserved. Old `#about`, `#schedule`, `#roster`, `#gallery`, `#merch`, `#news`, and `#join` anchors still resolve; old placeholder roster, dates, and match results have been replaced with community content.

## Review and publication

This branch is prepared for review. Merging into the repository's configured GitHub Pages source branch publishes the redesign through the existing hosting setup. The domain's website/email DNS and Palworld DNS do not need changes for the redesign.
