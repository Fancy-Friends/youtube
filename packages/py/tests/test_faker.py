# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- youtube

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_youtube._fake import FakeValues, seed_for_call
from fancy_youtube.faker import respond


def test_playlist_item_insert_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("youtube", "playlist_item_insert", config))

    faked = respond("playlist_item_insert", {"config": config, "fake": fake})

    assert faked == {
        "kind": "youtube#playlistItem",
        "etag": "example-etag",
        "id": "PLItem_fake_5c361fa66790",
        "snippet": {
            "publishedAt": "2026-01-01T00:00:00Z",
            "channelId": "UCexamplechannel",
            "title": "Example video",
            "description": "",
            "playlistId": "PLexampleplaylist",
            "position": 0,
            "resourceId": {
                "kind": "youtube#video",
                "videoId": "dQw4w9WgXcQ",
            },
            "videoOwnerChannelTitle": "Example channel",
            "videoOwnerChannelId": "UCexampleowner",
        },
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("youtube", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
