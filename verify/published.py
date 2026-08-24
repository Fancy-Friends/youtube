"""
YouTube — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_youtube._fake import FakeValues, seed_for_call
from fancy_youtube.faker import respond

GOLDENS = [
    {
        "operation": "playlist_item_insert",
        "config": {},
        "expected": {
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
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-youtube")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("youtube", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
