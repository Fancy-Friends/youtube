<?php

declare(strict_types=1);

namespace ParticleAcademy\Youtube\Actions;

use ParticleAcademy\Youtube\Youtube;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls YouTube or calls the faker.
 */
final class PlaylistItemInsert
{
    public const OPERATION = 'playlist_item_insert';
    public const METHOD = 'POST';
    public const PATH = '/youtube/v3/playlistItems';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from YouTube.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function body(array $config): array
    {
        if (($config['playlistId'] ?? null) === null || ($config['playlistId'] ?? null) === '') {
            throw new ConnectorConfigException('playlist_item_insert: "playlistId" is required (Playlist ID).');
        }

        if (($config['videoId'] ?? null) === null || ($config['videoId'] ?? null) === '') {
            throw new ConnectorConfigException('playlist_item_insert: "videoId" is required (Video ID).');
        }

        $body = [];

        $value = $config['playlistId'] ?? null;
        $body['snippet.playlistId'] = (string) $value;

        $value = $config['videoId'] ?? null;
        $body['snippet.resourceId.videoId'] = (string) $value;

        $body['snippet.resourceId.kind'] = 'youtube#video';

        return self::nestFields($body);
    }

    /**
     * The QUERY parameters, which are not the same as the body.
     *
     * A POST can carry both. Sent in the body instead, a parameter like
     * Sheets' `valueInputOption` is IGNORED and the provider falls back to its
     * own default — so the request succeeds and does the wrong thing.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function query(array $config): array
    {
        $body = [];

        $body['part'] = 'snippet';

        return $body;
    }

    /**
     * `['properties.email' => x]` -> `['properties' => ['email' => x]]`.
     *
     * A dotted `as` means NESTING, and only a JSON body can nest — in a form
     * body that spelling already means a literal dotted key.
     *
     * @param  array<string,mixed>  $flat
     * @return array<string,mixed>
     */
    private static function nestFields(array $flat): array
    {
        $out = [];

        foreach ($flat as $path => $value) {
            $parts = explode('.', (string) $path);
            $node = &$out;

            while (count($parts) > 1) {
                $key = array_shift($parts);

                if (! isset($node[$key]) || ! is_array($node[$key])) {
                    $node[$key] = [];
                }

                $node = &$node[$key];
            }

            $node[$parts[0]] = $value;
            unset($node);
        }

        return $out;
    }
}
