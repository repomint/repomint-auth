# repomint-auth

ExpressJS server for [repomint-web](https://github.com/repomint/repomint-web)

## GitHub OAuth

We use ExpressJS server running on port 4000.

Set environment variables
```bash
export GITHUB_OAUTH_CLIENT_ID=...
export GITHUB_OAUTH_CLIENT_SECRET=...
```

Run with `yarn start`.

NOTE: you would need to have an Oauth setup on your Github account, not sure if you can use mine.
On your Oauth setup, you need to put callback url as `http://localhost:3000/github/callback`

The flow implemented:
- check if gh_token is set, if yes, show a Logout button, if not, Connect to Github should show
- Connect to Github button would redirect to oauth, and would then return a code as a querystring, we will pass this to our express service and then request for access token in /auth endpoint
- access token will be saved in cookies (we can worry about security later)
- Logout would basically remove the gh_token from cookies and then redirect user to homepage without any code querystring

For docs:
- Github web app flow - https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#parameters
- Github API - https://docs.github.com/en/rest/reference/users
