# TokuCinema
Monster Movie Review Website  

---

## Installation
*Note - Commands were run using powershell for Windows and Bash for Mac OSX*

1. Nodejs and npm
    - Install these versions or greater of Nodejs and npm:  
        - Nodejs: 6.9.6   download Windows installer here: [Node](ttps://nodejs.org/en/download/) 
        - npm: 3.10.10 (bundled with Nodejs)

2. Install Gulp.js
    - Install Gulp globally on your machine  
        - run cmd: `npm install -g gulp`

3. Install Angular CLI globally on your machine
    - Install Angular CLI version: "1.0.5" or greater  
        - run cmd: `npm install -g @angular/cli`

4. Install project packages
    - Clone this Repo
        - run cmd: `git clone https://github.com/bayes343/TokuCinema.git`
    - "cd" into the nested "TokuCinema" folder (The root of the repo is also named TokuCinema) and run the following commands: 
        - run cmd: `npm install`  
        - run cmd: `npm install gulp`  


## Running the Application for Development
1. Start Application and Typescript Transpilation  
    - cd into the inner "TokuCinema" folder  
        - run cmd: `ng serve`
        - to run the application using the production database run cmd `ng serve --env=prod`
    
    *You should now be able to hit the site at "localhost:4200"*
    
2. Run Gulp to Compile Sass
    - cd into the inner "TokuCinema" folder if you're not already there  
        - run cmd: `gulp`


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

## Deploying to CI / Production
1. Build the project         
    - Run the below script to build the project:
        - run cmd: `npm run build`

2. Commit/Push the changes
    - Azure will automatically pull the changes and redploy the application. 
        - CI location:  [TokuCinema CI](http://tokuCinema-ci.azurewebsites.net/)
        - Prod location:  [TokuCinema Prod](http://tokuCinema.azurewebsites.net/)  

*Currently the CI pulls from the development branch and Prod pulls from master*  

**(Merging develop to master and pushing will deploy to Prod)**

change to persist ci branch