/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- youtube
 */

/**
 * The YouTube faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES YouTube actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakePlaylistItemInsert({ config, fake }: FakeRequest): unknown {
  return {
    "kind": "youtube#playlistItem",
    "etag": "example-etag",
    "id": fake.id("PLItem"),
    "snippet": {
      "publishedAt": "2026-01-01T00:00:00Z",
      "channelId": "UCexamplechannel",
      "title": "Example video",
      "description": "",
      "playlistId": (config.playlistId !== undefined && config.playlistId !== null && config.playlistId !== "" ? String(config.playlistId) : "PLexampleplaylist"),
      "position": 0,
      "resourceId": {
        "kind": "youtube#video",
        "videoId": (config.videoId !== undefined && config.videoId !== null && config.videoId !== "" ? String(config.videoId) : "dQw4w9WgXcQ"),
      },
      "videoOwnerChannelTitle": "Example channel",
      "videoOwnerChannelId": "UCexampleowner",
    },
  };
}

export const youtubeFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "playlist_item_insert":
      return fakePlaylistItemInsert(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `youtube: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
