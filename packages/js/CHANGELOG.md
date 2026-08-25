# Changelog

All notable changes to `@particle-academy/youtube-ui`,
`@particle-academy/youtube-js`, `particle-academy/youtube-php` and
`fancy-youtube`.

## [0.2.0] — 2026-08-24

### Added

- **The README now says how to SET THIS CONNECTOR UP**, in the package itself.

Until now it explained what the four packages are, what they cost and why the
repo is generated — and said nothing about credentials, scopes, sandboxes or
operations. Somebody who installed it could not learn from it which credentials
a connection needs, where a human GETS them, which scopes to request, or what
the connector can actually do. All of that was already in the definition; the
one document a consumer reads was the one that omitted everything actionable.

The new **Setting it up** section carries:

- every credential, with the text saying where the value comes from, whether it
  is **per installation** or **per connected account**, and whether it is secret;
- the OAuth authorize and token URLs and the exact scopes, verbatim;
- the access-token lifetime, and where refresh tokens ROTATE, the two things a
  host must not do — retry a failed refresh, or refresh concurrently — because a
  replay revokes the entire grant and nothing in the failure says why;
- the estate in this provider's own terms, including the cases where a
  successful-looking run reaches nobody, or reaches the real one;
- every action and trigger with its method, path, inputs, and whether it is safe
  to replay;
- a trigger's provider-side setup, which nobody can derive from anything else.

It is **generated from `provider/manifest.json`**, so it cannot drift from what
the packages do — which is the point at a few hundred providers, where a
hand-written setup section is a few hundred documents going quietly stale.

No code changed. This release exists because a registry and an installing agent
read the PUBLISHED artifact, and the artifact carried the old README.

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
[0.2.0]: https://github.com/Fancy-Friends/youtube/releases/tag/v0.2.0
