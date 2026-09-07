# Changelog

All notable changes to `@particle-academy/youtube-ui`,
`@particle-academy/youtube-js`, `particle-academy/youtube-php` and
`fancy-youtube`.

## [0.2.2] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/youtube-ui@0.2.2` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.2.1.

- **`repository.directory` in the npm packages.**

`@particle-academy/youtube-ui` and `@particle-academy/youtube-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

## [0.2.1] — 2026-08-24

### Fixed

- **`@particle-academy/youtube-js` now accepts a RANGE of `@particle-academy/youtube-ui`, not one exact version.**

It peer-depended on `@particle-academy/youtube-ui` at exactly the release it shipped with. That is the
strict form of the thing the kit's own rule forbids — a first-party sibling gets
a range — and the same block applied the rule correctly to its other two
dependencies. It was this one pair that slipped.

What it cost: ship `@particle-academy/youtube-ui` with a fixed help string and every consumer on the
previous `@particle-academy/youtube-js` had an **unmet peer**, which npm 7+ errors on. A documentation
patch could not be delivered without a matching runtime release, and a routine
`npm update` that moved the ui package alone broke the install.

The coupling is real and is not being loosened away. The ui package emits the
config schema and the js package implements against it, so a ui that adds a
field to a js that ignores it is silently wrong. But a PATCH is non-additive by
definition and a MINOR is where a field can appear — so `>=0.2.1 <0.3.0` is the
coupling that actually exists rather than the strictest one expressible.

Nothing else changed. `particle-academy/youtube-php` and `fancy-youtube` are unaffected; neither has an
equivalent edge.

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
[0.2.1]: https://github.com/Fancy-Friends/youtube/releases/tag/v0.2.1
