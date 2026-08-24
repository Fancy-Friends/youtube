<?php

declare(strict_types=1);

/*
 * YouTube — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/youtube-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Youtube\YoutubeFaker;

$goldens = [
    [
        'operation' => 'playlist_item_insert',
        'config' => [],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('youtube', $operation, $config));
    $faked = YoutubeFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
