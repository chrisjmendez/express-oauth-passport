ExpressJS 4 + oAuth + PassportJS
=
This open-source repo is designed to help anyone get up-and-running with a vanilla set-up of ExpressJS + oAuth + PassportJS.  You can probably modify this later to hook it up to AngularJS or React but that wasn't the goal of this repo. It was to instead offer a vanilla configuration. 


Setup
-
Note: I am using nodemon instead of node so that I can get quick server restarts with my code changes. If you want to install nodemon, the command is ```npm install -g nodemon```. If you'd rather not use nodemon, here's the original ```package.json``` file you'll need.

```
{
  "name": "oauth",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.13.x",
    "cookie-parser": "~1.3.x",
    "debug": "~2.2.x",
    "express": "~4.13.x",
    "jade": "~1.11.x",
    "morgan": "~1.6.x",
    "serve-favicon": "~2.3.x"
  }
}
```


Start the web server
```
PORT=8080 npm start
```



