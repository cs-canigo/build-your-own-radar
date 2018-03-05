[![Build Status](https://travis-ci.org/thoughtworks/build-your-own-radar.svg?branch=master)](https://travis-ci.org/thoughtworks/build-your-own-radar)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Demo

You can see this in action at http://canigo.ctti.gencat.cat/drafts/radar/. Data is taken from a CSV file placed at another repo:
https://github.com/cs-canigo/radar/blob/master/data/radar.csv

## How To Use

The data is taken from another git repo located at https://github.com/cs-canigo/radar/blob/master/data/radar.csv. Any change done in the CSV file will reflect immediately in the final radar deployed at canigo.ctti.gencat.cat. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

| name          | ring   | quadrant               | isNew | description                                             |
|---------------|--------|------------------------|-------|---------------------------------------------------------|
| Composer      | adopt  | tools                  | TRUE  | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE  | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE | We continue to see teams run into trouble using JSF ... |

### How the fork was done

The original thoughtworks radar is based on the assumption that the radar will be deployed with its own HTML page. 

We wanted to be able to embed a generated radar (javascript code + css) into any webpage, i.e. to work in the same way timeline library works for instance:

https://github.com/NUKnightLab/TimelineJS3

#### Changes done from original thoughtworks radar to make this possible

1. Remove all general css styles that apply to the whole page: Avoids accidental overwritting of custom canigo site styles

2. Use customs ID for html elements instead of general html elements such as body, i.e. gives more control to the container page in how to allocate the javascript elements (radar): Use d3.select('#myid') instead of d3.select('body') so that the widget could be placed wherever we please

3. Remove general things such as document.title or set_document_title

#### How to make a new build

1. Execute the build according to instructions given below (npm install). Take the generated css and js and commit into https://github.com/cs-canigo/radar. Remove the old main.xxxx.js and main.xxxx.css.

2. Go to https://github.com/cs-canigo/portal/blob/master/content/drafts/radar.md and update the last line containing  

`<script type="application/javascript" src="https://rawgit.com/cs-canigo/radar/master/main.xxx.js">` and place the name of the new commited filename here.

Our radar expects a div with id radarctti for it to be displayed. Add the following snippet to the html page where you want your radar to be displayed:

`<div id="radarctti" class="container-radar"></div>`

**NOTE:** Consider using CDN if you are satisfied with the result and think the radar data will not change in a while. See:

https://rawgit.com/


### More complex usage

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible. 
Make sure you have nodejs installed.

- `git clone git@github.com:cs-canigo/build-your-own-radar.git`
- `npm install`
- `npm test` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:7.3.0 /bin/sh -c 'npm install && npm run dev'

After building it will start on localhost:8080
