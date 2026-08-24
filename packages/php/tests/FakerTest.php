<?php

declare(strict_types=1);

use ParticleAcademy\Youtube\YoutubeFaker;
use ParticleAcademy\Connectors\FakeValues;

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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('playlist_item_insert fakes the shape YouTube publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('youtube', 'playlist_item_insert', $config));

    $faked = YoutubeFaker::respond('playlist_item_insert', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'kind' => 'youtube#playlistItem',
        'etag' => 'example-etag',
        'id' => 'PLItem_fake_5c361fa66790',
        'snippet' => [
            'publishedAt' => '2026-01-01T00:00:00Z',
            'channelId' => 'UCexamplechannel',
            'title' => 'Example video',
            'description' => '',
            'playlistId' => 'PLexampleplaylist',
            'position' => 0,
            'resourceId' => [
                'kind' => 'youtube#video',
                'videoId' => 'dQw4w9WgXcQ',
            ],
            'videoOwnerChannelTitle' => 'Example channel',
            'videoOwnerChannelId' => 'UCexampleowner',
        ],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('youtube', 'no_such_operation', []));

    expect(fn () => YoutubeFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
