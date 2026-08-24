# Changelog

All notable changes to `@particle-academy/youtube-ui`,
`@particle-academy/youtube-js`, `particle-academy/youtube-php` and
`fancy-youtube`.

## [0.1.0] — 2026-08-23

First release.

### Added

- `playlist_item_insert` — add a video to a YouTube playlist with
  `POST /youtube/v3/playlistItems?part=snippet`.
- A top-level `PlaylistItem` faker for development without changing a channel.

### Fixed query protocol

YouTube requires `part=snippet` in the query. It names both the request section
being written and the response section included, so it is a fixed protocol
literal rather than a user-facing option.

### Narrow access, no sandbox, no idempotency

The connector requests `youtube.force-ssl`, the narrowest scope this method
accepts for modifying playlist contents. YouTube has no test estate, and
`playlistItems.insert` has no idempotency key; a retry can add the video twice.

[0.1.0]: https://github.com/Fancy-Friends/youtube/releases/tag/v0.1.0
