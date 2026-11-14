# Setting up YouTube

Generated from `provider/manifest.json`; do not edit. Each step cites the provider page it
came from. Words in **bold** are values from YOUR app, filled in where a host shows these steps.

## 1. Create (or reuse) the Google Cloud project for **your app's name**

Every Google connector shares ONE consent grant (oauth.grant "google"), so use one project and one OAuth client for all of them: one consent and one refresh token per person.

Source: [developers.google.com](https://developers.google.com/workspace/guides/create-project)

## 2. Enable the YouTube Data API v3

Console: APIs & Services, Library; open the YouTube Data API v3 and click Enable.

Source: [developers.google.com](https://developers.google.com/workspace/guides/enable-apis)

## 3. Configure the consent screen

Console: Google Auth platform, Branding (app name **your app's name**, support email, contact email), then Audience: Internal for people inside your Google Workspace organisation only, or External (while it is in testing, add each tester under Test users). Then Data Access, Add or Remove Scopes, and add `https://www.googleapis.com/auth/youtube.force-ssl` beside the scopes of any other Google connector you use. You cannot remove the consent screen once it is configured.

Source: [developers.google.com](https://developers.google.com/workspace/guides/configure-oauth-consent)

## 4. Create a Web application OAuth client

Console: Google Auth platform, Clients, Create Client; type Web application. Under Authorized redirect URIs click Add URI and paste **your host's OAuth redirect URL**, then Create. Copy the client ID and client secret when the client is created.

**Copy:**

- Authorized redirect URI: **your host's OAuth redirect URL**

**Yields:** `clientId`, `clientSecret`

Source: [developers.google.com](https://developers.google.com/workspace/guides/create-credentials)

## 5. Connect an account and check it works — an AGENT step

Connect one Google account through **your app's name**'s OAuth flow, then run the check below.

**The agent is asked:**

> Using **your app's name**'s **this connector's name** connection, add a video the person names to a playlist they own with playlist_item_insert, and report the returned item id. Tell them they can remove it.

**Done when:** playlist_item_insert returns an id and the video appears in that playlist.

Source: [developers.google.com](https://developers.google.com/youtube/v3/docs/playlistItems/insert)
