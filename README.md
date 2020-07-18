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

Trello boards with open issues: https://trello.com/b/ZJU9PaUl/graphql-reliefweb


### Creating custom tokens
The environment variable GOOGLE_APPLICATION_CREDENTIALS should be set to 
the path of the file having the firebase initialization config.
Without it, it is not possible to create tokens.
TODO: find a way to automatically load this env variable via the secrets where the config file will be hold.
