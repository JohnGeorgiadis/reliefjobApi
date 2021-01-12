# ReliefJobsApi

### firebase repo

https://console.firebase.google.com/u/0/project/reliefjobs-dev/overview

### How to run it

1. `git clone https://github.com/JohnGeorgiadis/reliefJobs.git`
2. cd into the project
3. `cd functions`
4. `npm install` to install all the dependencies
5. `npm run serve` or `yarn serve` to start running the BE part of the project.
   1. http://localhost:5001/reliefjobs-dev/us-central1/api <- graphql client
   2. If you want to run pub subs cloud functions use `npm run shell` or `yarn shell` BE CAREFUL this is **production code**

If you don't have access to the project or if you are running this locally for the first time.
1. `npm install -g firebase-tools`
2. `firebase login`

Trello boards with open issues: https://trello.com/b/ZJU9PaUl/graphql-reliefweb
