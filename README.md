# TokuCinema
Monster Movie Review Website  

---

## Installation
*Note - Commands were run using powershell for Windows and Bash for Mac OSX*

1. Nodejs and npm
    - Install these versions or greater of Nodejs and npm:  
        - Nodejs: 6.9.6   download Windows installer here: [Node](ttps://nodejs.org/en/download/) 
        - npm: 3.10.10 (bundled with Nodejs)

2. Install Angular CLI globally on your machine
    - Install Angular CLI version: "1.0.5" or greater  
        - run cmd: `npm install -g @angular/cli`

3. Install the Firebase CLI globally on your machine
    - run cmd: `npm install -g firebase-tools`

4. Install project packages
    - Clone this Repo
        - run cmd: `git clone https://github.com/kbeelman/TokuCinema.git`
    - "cd" into the nested "TokuCinema" folder (The root of the repo is also named TokuCinema) and run the following commands: 
        - run cmd: `npm install`


## Running the Application for Development
1. Start Application and Typescript Transpilation  
    - cd into the inner "TokuCinema" folder  
        - run cmd: `ng serve`
        - to run the application using the production database run cmd `ng serve --env=prod`
    
    *You should now be able to hit the site at "localhost:4200"*


## Debugging in VS Code
1. Create a launch.json config file
    - If there isn't already a launch.json file in the root of the repo in a folder named ".vscode," create one by opening the debug tab in the editor and clicking the gear (settings) icon.

    - Replace the configurations in that file with the following:
```json
{
    "version": "0.2.0",
    "configurations": [
    {
            "name": "Launch",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:4200",
            "port": 9223,
            "sourceMaps": true,
            "diagnosticLogging": true,
            "webRoot": "${workspaceRoot}/TokuCinema"
            // Mac 
            //"userDataDir": "/Users/joseph.bayes/dummyChrome"
            // Windows - just leave "userDataDir" blank
        }
    ]
}
```

## Deploying to the Dev Server
1. Build & Deploy the project         
    - Run the below script to build the project:
        - run cmd: `npm run build-dev`
    - Run the below script to deploy the project:
        - run cmd: `npm run deploy-dev`
    - Alternatively, you can build and deploy with one command:
        - run cmd: `npm run build-deploy-dev`
    - Dev location:  [TokuCinema Dev](http://dev.tokucinema.com/)   

2. Commit/Push the changes

## Deploying to Production
1. Merge master with development
    - Checkout master branch
        - run cmd: `git checkout master`
        - run cmd: `git merge development`

2. Build & Deploy the project         
    - Run the below script to build the project:
        - run cmd: `npm run build`
    - Run the below script to deploy the project:
        - run cmd: `npm run deploy`
    - Alternatively, you can build and deploy with one command:
        - run cmd: `npm run build-deploy`
    - Prod location:  [TokuCinema Prod](http://tokucinema.com/)  

3. Commit/Push the changes