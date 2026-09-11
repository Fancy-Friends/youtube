<?php

declare(strict_types=1);

namespace ParticleAcademy\Youtube\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Youtube\Actions\PlaylistItemInsert;
use ParticleAcademy\Youtube\Youtube;

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
 * YouTube playlist item, run on a fancy-flow-php host.
 *
 * The PHP twin of `youtubePlaylistItemExecutor` in
 * @particle-academy/youtube-js: the same request, built from the node's config
 * by the same `Actions\PlaylistItemInsert` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than YouTube. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/youtube_playlist_item',
    aliases: [
        'youtube_playlist_item',
    ],
    category: 'io',
    label: 'YouTube playlist item',
    description: 'Add a video to a YouTube playlist.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'YouTube\'s unique id for the new playlist item.',
        ],
        [
            'path' => 'data.kind',
            'type' => 'string',
            'description' => 'The fixed resource kind `youtube#playlistItem`.',
        ],
        [
            'path' => 'data.snippet.playlistId',
            'type' => 'string',
            'description' => 'The playlist containing the item.',
        ],
        [
            'path' => 'data.snippet.resourceId.videoId',
            'type' => 'string',
            'description' => 'The video added to the playlist.',
        ],
        [
            'path' => 'data.snippet.position',
            'type' => 'number',
            'description' => 'The item\'s zero-based position in the playlist.',
        ],
    ],
)]
final class PlaylistItemExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Youtube::descriptor(),
            PlaylistItemInsert::OPERATION,
            $config,
            [
                'method' => PlaylistItemInsert::METHOD,
                'path' => PlaylistItemInsert::PATH,
                'json' => PlaylistItemInsert::body($config),
                'query' => PlaylistItemInsert::query($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'youtube playlist_item_insert'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
