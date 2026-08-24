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
 * YouTube, as one service descriptor shared by every YouTube operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of YouTube: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * YouTube has no sandbox. Every live-mode add changes a real playlist; use the
 * faker during development and remove live test items afterward.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { youtubeFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const YOUTUBE_BASE_URLS = {
  "live": "https://youtube.googleapis.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const YOUTUBE_REQUIRES = [
  "accessToken",
  "refreshToken",
  "clientId",
  "clientSecret"
] as const;

/**
 * Apply YouTube's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function youtubeAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The YouTube service, for the TypeScript runtime. */
export const YOUTUBE: ServiceDescriptor = {
  service: "youtube",
  title: "YouTube",
  sandbox: "none",
  baseUrls: { ...YOUTUBE_BASE_URLS },
  requires: [...YOUTUBE_REQUIRES],
  authorize: youtubeAuthorize,
  faker: youtubeFaker,
};
