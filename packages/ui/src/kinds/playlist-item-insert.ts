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
 * YouTube playlist item — Add a video to a YouTube playlist.
 *
 * https://developers.google.com/youtube/v3/docs/playlistItems/insert
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { youtubeMeta } from "../service.js";

export const YOUTUBE_PLAYLIST_ITEM_KIND = "@particle-academy/youtube_playlist_item";
export const YOUTUBE_PLAYLIST_ITEM_OPERATION = "playlist_item_insert";

export const YOUTUBE_PLAYLIST_ITEM_META = youtubeMeta("action", "add a video to a playlist", "https://developers.google.com/youtube/v3/docs/playlistItems/insert");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const YOUTUBE_PLAYLIST_ITEM_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "YouTube's unique id for the new playlist item."
  },
  {
    "path": "data.kind",
    "type": "string",
    "description": "The fixed resource kind `youtube#playlistItem`."
  },
  {
    "path": "data.snippet.playlistId",
    "type": "string",
    "description": "The playlist containing the item."
  },
  {
    "path": "data.snippet.resourceId.videoId",
    "type": "string",
    "description": "The video added to the playlist."
  },
  {
    "path": "data.snippet.position",
    "type": "number",
    "description": "The item's zero-based position in the playlist."
  }
];

export const youtubePlaylistItemKind: NodeKindDefinition = defineConnectorKind(YOUTUBE_PLAYLIST_ITEM_META, {
  name: YOUTUBE_PLAYLIST_ITEM_KIND,
  aliases: ["youtube_playlist_item"],
  label: "YouTube playlist item",
  description: "Add a video to a YouTube playlist.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: YOUTUBE_PLAYLIST_ITEM_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "playlistId",
      "label": "Playlist ID",
      "required": true,
      "description": "The YouTube id of the playlist to add the video to."
    },
    {
      "type": "text",
      "key": "videoId",
      "label": "Video ID",
      "required": true,
      "description": "The YouTube id of the video to add."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(YOUTUBE_PLAYLIST_ITEM_META, config as Record<string, unknown>, "add a video to a playlist"),
});
