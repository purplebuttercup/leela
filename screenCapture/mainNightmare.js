const Nightmare = require('nightmare');
const screenshotSelector = require('nightmare-screenshot-selector');
var fs = require('fs')
var path = require('path')
 

//var nightmare = Nightmare({ show: false })

//page.zoomFactor = 1;
var htmlFiles = new Array();
var dir = path.join(__dirname + '/../boostrapGenerator/htmls')
var curdir = fs.readdirSync(dir);

// loop through files and folders
for(var i = 0; i< curdir.length; i++)
{
	var fullpath = dir + "\\" + curdir[i];
	console.log('fullpath',fullpath)
    // check if item is a file
    var stat = fs.statSync(fullpath);
    if (stat.isFile())
    {
        // check that file is html
        if(fullpath.indexOf('.html') != -1)
        {
            // show full path of file
            console.log('File path: ' + fullpath);
            htmlFiles.push(fullpath);
        }
	}
	else {
		console.log('not file',fullpath)
	}
}

console.log('Number of Html Files: ' + htmlFiles.length);

// output pages as PNG
var pageindex = 0;

for (pageindex; pageindex< htmlFiles.length; pageindex++){

  var nightmare = Nightmare({ show: false })
  nightmare
  .useragent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36')
  .viewport(1200, 1800)
  .wait()
  .goto('file:///'+htmlFiles[pageindex])
  .wait()
  .screenshot('../boostrapGenerator/scrnCapture/'+ htmlFiles[pageindex].replace(/^.*[\\\/]/, '').replace(/.html/, '') +'.png')
  .end()
  .then(function (result) {
    console.log('page done');
  })
  .catch(function (error) {
    console.error('Error:', error);
  })
}





// Nightmare.action('screenshotSelector', screenshotSelector)
 
// var nightmare = Nightmare({
//   frame: false,
//   useContentSize: true
// })
// nightmare
//         .goto('https://github.com/MisumiRize/nightmare-screenshot')
//         .screenshotSelector('html') // get the image in a buffer
//         .then(function (data) {
//           fs.writeFileSync('screen.png', data)
//         })
        
// nightmare
//         .goto('https://github.com/MisumiRize/nightmare-screenshot')
//         .screenshotSelector({selector: 'html', path:'screen.png'}) // create directly a file
//         .end()

// function calculateContentHeight() {
//   function getNumericalStyle(element, property) {
//     return parseFloat( window.getComputedStyle(element,null).getPropertyValue(property) );
//   }

//   var html = document.documentElement;
//   var body = document.body;

//   var bodyMarginBottom  = getNumericalStyle(body, "margin-bottom");
//   var bodyMarginTop     = getNumericalStyle(body, "margin-top");
//   var htmlMarginBottom  = getNumericalStyle(html, "margin-bottom");
//   var htmlMarginTop     = getNumericalStyle(html, "margin-top");

//   var bodyPaddingBottom = getNumericalStyle(body, "padding-bottom");
//   var bodyPaddingTop    = getNumericalStyle(body, "padding-top");
//   var htmlPaddingBottom = getNumericalStyle(html, "padding-bottom");
//   var htmlPaddingTop    = getNumericalStyle(html, "padding-top");

//   var margins  = bodyMarginBottom  + bodyMarginTop  + htmlMarginBottom  + htmlMarginTop;
//   var paddings = bodyPaddingBottom + bodyPaddingTop + htmlPaddingBottom + htmlPaddingTop;

//   return html.offsetHeight + Math.round(margins + paddings);
// }


// var browser = new Nightmare();

// browser
// .goto("https://github.com/MisumiRize/nightmare-screenshot")
// .viewport(1000, 0)  // for getting the actual height of short content
// .then(() => browser.evaluate(calculateContentHeight))
// .then(contentHeight => browser.viewport(1000, contentHeight))
// .then(() => browser.wait(50))  // wait for correct calculations (?) -- Semaphore CI was failing without this, but local Ubuntu and OSX were fine
// .then(() => browser.screenshot('screen.png'))