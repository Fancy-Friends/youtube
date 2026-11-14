# YouTube

[![Fancified](art/fancified.svg)](https://particle.academy)

YouTube for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/youtube-ui` | `npm install @particle-academy/youtube-ui` |
| Node | `@particle-academy/youtube-js` | `npm install @particle-academy/youtube-js` |
| PHP 8.4+ | `particle-academy/youtube-php` | `composer require particle-academy/youtube-php` |
| Python 3.11+ | `fancy-youtube` | `pip install fancy-youtube` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No YouTube SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### On YouTube's side

1. **Create (or reuse) the Google Cloud project for **your app's name**** — Every Google connector shares ONE consent grant (oauth.grant "google"), so use one project and one OAuth client for all of them: one consent and one refresh token per person. ([developers.google.com](https://developers.google.com/workspace/guides/create-project))
2. **Enable the YouTube Data API v3** — Console: APIs & Services, Library; open the YouTube Data API v3 and click Enable. ([developers.google.com](https://developers.google.com/workspace/guides/enable-apis))
3. **Configure the consent screen** — Console: Google Auth platform, Branding (app name **your app's name**, support email, contact email), then Audience: Internal for people inside your Google Workspace organisation only, or External (while it is in testing, add each tester under Test users). Then Data Access, Add or Remove Scopes, and add `https://www.googleapis.com/auth/youtube.force-ssl` beside the scopes of any other Google connector you use. You cannot remove the consent screen once it is configured. ([developers.google.com](https://developers.google.com/workspace/guides/configure-oauth-consent))
4. **Create a Web application OAuth client** — Console: Google Auth platform, Clients, Create Client; type Web application. Under Authorized redirect URIs click Add URI and paste **your host's OAuth redirect URL**, then Create. Copy the client ID and client secret when the client is created. ([developers.google.com](https://developers.google.com/workspace/guides/create-credentials))
5. **Connect an account and check it works** — Connect one Google account through **your app's name**'s OAuth flow, then run the check below. ([developers.google.com](https://developers.google.com/youtube/v3/docs/playlistItems/insert))

Every step in full — who does it, what to paste, which credentials it yields, and how you know it worked — is in [SETUP.md](SETUP.md).

### Credentials

A YouTube connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | From Google Cloud Console. One value for the whole installation. |
| **OAuth client secret** | per installation | **secret** | The client secret for the same OAuth app. |
| **Access token** | per connected account | **secret** | Per connected YouTube account; expires after one hour. |
| **Refresh token** | per connected account | **secret** | Per connected YouTube account; the host uses it to refresh the access token. |

### Authorising

YouTube uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://accounts.google.com/o/oauth2/v2/auth
- **Token URL** — https://oauth2.googleapis.com/token
- **Scopes** — `https://www.googleapis.com/auth/youtube.force-ssl`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

**One consent grant, shared** (`grant: "google"`). Every connector declaring the same grant can run on ONE OAuth client, with one consent and one refresh token per person.

- **Authorize with** `access_type=offline`, `include_granted_scopes=true`. Ask for a feature's scopes when it is first used; the new token covers every scope granted before. A refresh token comes back only on the FIRST exchange, so keep the stored one when an exchange returns none.
- **Revoke** — POST https://oauth2.googleapis.com/revoke with `token`. **It removes the WHOLE grant**: every connector sharing it, not only this one. A per-feature disconnect stops using that feature's scopes locally; only a full disconnect revokes.
- **Identify the account by `sub`**: request `openid`, then verify the token response's id_token (issuer `https://accounts.google.com` or `accounts.google.com`, keys at https://www.googleapis.com/oauth2/v3/certs, audience = `clientId`). Never key a connection by email.
- **No restricted scopes** in this connector.

The refresh tokens do **not** rotate: the same one is reusable, so a refresh may safely be retried and may run concurrently. Stated rather than assumed, because the opposite — a provider that spends the token and revokes the grant on a replay — looks identical until it happens.

### The estate

**YouTube has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> YouTube has no sandbox. Every live-mode add changes a real playlist; use the faker during development and remove live test items afterward.

## What it can do

### Actions

#### `playlist_item_insert` — YouTube playlist item

Add a video to a YouTube playlist.

`POST /youtube/v3/playlistItems` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `playlistId` | yes | The YouTube id of the playlist to add the video to. |
| `videoId` | yes | The YouTube id of the video to add. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not YouTube has a sandbox. Set a
node's mode to `fake` and it returns the shape YouTube actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/youtube`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
