# Codingly.io: Base Serverless Framework Template

https://codingly.io

## What's included
* Folder structure used consistently across our projects.
* [serverless-pseudo-parameters plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Allows you to take advantage of CloudFormation Pseudo Parameters.
* [serverless-bundle plugin](https://www.npmjs.com/package/serverless-pseudo-parameters): Bundler based on the serverless-webpack plugin - requires zero configuration and fully compatible with ES6/ES7 features.

## Getting started
```
sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
cd YOUR_PROJECT_NAME
npm install
```

You are ready to go!


sls invoke -f processAuction -l 
sls deploy --v
sls deploy -f processAuctions --verbose

curl --location --request POST 'https://dev-b4ymiww7.us.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=eYVhJel2sBtl5MEIsir0k4RaEGwZ3UpD' \
--data-urlencode 'username=onasanyatunde67@gmail.com' \
--data-urlencode 'password=TIMIlehin3151' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'scope=openid'