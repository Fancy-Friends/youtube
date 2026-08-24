/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/playlist-item-insert.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/playlist-item-insert.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- youtube
 */

/**
 * Add a video to a YouTube playlist.
 *
 * POST /youtube/v3/playlistItems —
 * https://developers.google.com/youtube/v3/docs/playlistItems/insert
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls YouTube or calls the faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { YOUTUBE } from "../service.js";

export const PLAYLIST_ITEM_INSERT_OPERATION = "playlist_item_insert";

export type PlaylistItemInsertOptions = {
  /** The node's resolved config. Keys: playlistId, videoId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function youtubePlaylistItemInsert(options: PlaylistItemInsertOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.playlistId === undefined || config.playlistId === null || config.playlistId === "") {
    throw new Error(`playlist_item_insert: "playlistId" is required (Playlist ID).`);
  }

  if (config.videoId === undefined || config.videoId === null || config.videoId === "") {
    throw new Error(`playlist_item_insert: "videoId" is required (Video ID).`);
  }

  return callConnector(YOUTUBE, {
    operation: PLAYLIST_ITEM_INSERT_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/youtube/v3/playlistItems",
      json: nestFields({
        "snippet.playlistId": String(config.playlistId),
        "snippet.resourceId.videoId": String(config.videoId),
        "snippet.resourceId.kind": "youtube#video",
      }),
      query: {
        "part": "snippet",
      },
    },
  });
}

/**
 * `{"properties.email": x}` -> `{properties: {email: x}}`.
 *
 * A dotted `as` means NESTING, and only a JSON body can nest. The validator
 * refuses that spelling anywhere else, because in a form body it already means
 * something different — a literal dotted key.
 */
function nestFields(flat: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = out;

    while (parts.length > 1) {
      const key = parts.shift() as string;
      // A NUMERIC segment is an array index: `dateRanges.0.startDate` has to
      // become `[{startDate}]`, not `{"0": {startDate}}`. PHP produced the
      // array by accident (its integer-keyed arrays serialise as JSON lists)
      // and the other two produced an object, which the provider rejects as
      // the wrong type. The parity suite is what caught the disagreement.
      const wantsArray = /^\d+$/.test(parts[0] ?? "");

      if (typeof node[key] !== "object" || node[key] === null) node[key] = wantsArray ? [] : {};
      node = node[key] as Record<string, unknown>;
    }

    node[parts[0] as string] = value;
  }

  return out;
}
