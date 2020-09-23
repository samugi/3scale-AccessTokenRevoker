# 3scale-AccessTokenRevoker
Access Token Revoker (ATR) is meant to be included in a workflow to obtain single-use Access Tokens in 3scale. Access tokens will be revoked automatically after they have been used to create a new 3scale Application.

3scale needs to be configured to connect to ATR via webhook, once the Application is created.

ATR will read the token (`token_value`) from the Application's extra_fields and revoke it via the 3scale API endpoint `DELETE /admin/api/personal/access_tokens/token_value.json`.

## Install
Download the zip content or perform a `git clone https://github.com/samugi/3scale-AccessTokenRevoker.git`

`npm install`

## Deploy
`cd` into the *3scale-AccessTokenRevoker* repository.
`node ./app.js -u https://{3SCALE-TENANT-NAME}-admin.{WILDCARD-DOMAIN|3scale.net}`
