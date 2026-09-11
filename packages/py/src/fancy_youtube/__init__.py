# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- youtube

"""YouTube for Python.

The service descriptor, its faker, its delivery contract, and one function
per operation — plain HTTP on the stdlib, no vendor SDK and no runtime
dependency.
"""

from __future__ import annotations

from ._fake import FakeValues
from .actions.playlist_item_insert import playlist_item_insert
from .faker import respond
from .service import BASE_URLS, CONNECTOR_API_VERSION, REQUIRES, SANDBOX, SERVICE, TITLE, descriptor

__version__ = "0.2.3"

__all__ = [
    "BASE_URLS",
    "CONNECTOR_API_VERSION",
    "REQUIRES",
    "SANDBOX",
    "SERVICE",
    "TITLE",
    "FakeValues",
    "descriptor",
    "playlist_item_insert",
    "respond",
]
