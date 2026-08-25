/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- youtube
 */

/**
 * YouTube's identity on the authoring surface, shared by every YouTube node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * YouTube has no sandbox. Every live-mode add changes a real playlist; use the
 * faker during development and remove live test items afterward.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const YOUTUBE_SERVICE = {
  service: "youtube",
  serviceTitle: "YouTube",
  domain: "marketing",
  sandbox: "none",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a YouTube connection holds. */
export const YOUTUBE_CREDENTIALS = [
  {
    "key": "clientId",
    "label": "OAuth client ID",
    "scope": "provider",
    "secret": false,
    "help": "From Google Cloud Console. One value for the whole installation."
  },
  {
    "key": "clientSecret",
    "label": "OAuth client secret",
    "scope": "provider",
    "secret": true,
    "help": "The client secret for the same OAuth app."
  },
  {
    "key": "accessToken",
    "label": "Access token",
    "scope": "account",
    "secret": true,
    "help": "Per connected YouTube account; expires after one hour."
  },
  {
    "key": "refreshToken",
    "label": "Refresh token",
    "scope": "account",
    "secret": true,
    "help": "Per connected YouTube account; the host uses it to refresh the access token."
  }
] as const;

/**
 * The OAuth2 exchange YouTube requires — DECLARED here, performed by the host.
 *
 * A consent screen needs a browser, a redirect URI and somewhere to persist
 * the result, and all three belong to the host; a package that ran the dance
 * itself would have to own a web server. So this says precisely enough for a
 * host to do it.
 *
 * The access token lasts 3600 seconds. A host that never refreshes will work
 * all afternoon and be broken by morning, which is why the lifetime is stated
 * rather than left to be discovered.
 *
 * Its refresh tokens do NOT rotate: the same one is reusable, so a refresh may
 * safely be retried and may run concurrently. That is stated rather than
 * assumed because the opposite — a provider that spends the token and revokes
 * the grant on a replay — looks identical until it happens.
 */
export const YOUTUBE_OAUTH = {
  "flow": "authorization_code",
  "authorizeUrl": "https://accounts.google.com/o/oauth2/v2/auth",
  "tokenUrl": "https://oauth2.googleapis.com/token",
  "scopes": [
    "https://www.googleapis.com/auth/youtube.force-ssl"
  ],
  "accessTokenCredential": "accessToken",
  "refreshTokenCredential": "refreshToken",
  "refreshTokenRotates": false,
  "accessTokenTtlSeconds": 3600
} as const;

/** Build a YouTube node's connector metadata from the operation it performs. */
export function youtubeMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...YOUTUBE_SERVICE, role, operation, docs };
}
