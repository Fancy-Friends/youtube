<?php

declare(strict_types=1);

namespace ParticleAcademy\Youtube;

use ParticleAcademy\Connectors\FakeRequest;

/*
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
 * The YouTube faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class YoutubeFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'playlist_item_insert' => self::PlaylistItemInsert($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'youtube: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function PlaylistItemInsert(array $config, mixed $fake): array
    {
        return [
        'kind' => 'youtube#playlistItem',
        'etag' => 'example-etag',
        'id' => $fake->id('PLItem'),
        'snippet' => [
            'publishedAt' => '2026-01-01T00:00:00Z',
            'channelId' => 'UCexamplechannel',
            'title' => 'Example video',
            'description' => '',
            'playlistId' => ((($v = $config['playlistId'] ?? null) !== null && $v !== '') ? (string) $v : 'PLexampleplaylist'),
            'position' => 0,
            'resourceId' => [
                'kind' => 'youtube#video',
                'videoId' => ((($v = $config['videoId'] ?? null) !== null && $v !== '') ? (string) $v : 'dQw4w9WgXcQ'),
            ],
            'videoOwnerChannelTitle' => 'Example channel',
            'videoOwnerChannelId' => 'UCexampleowner',
        ],
    ];
    }
}
