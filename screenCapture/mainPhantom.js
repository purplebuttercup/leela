var webpage = require('webpage');
var fs = require('fs');
var loadInProgress = false;
var width = 1200;
var height = 1800;

var page = webpage.create();
page.viewportSize = { width: width, height: height };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

//page.zoomFactor = 1;
fs.changeWorkingDirectory('../boostrapGenerator')
var htmlFiles = new Array();
console.log('cuuuuuuuuuur',fs.workingDirectory)
var curdir = fs.list(fs.workingDirectory + '/htmls');
console.log('curdir',curdir);

// loop through files and folders
for(var i = 0; i< curdir.length; i++)
{
	var fullpath = fs.workingDirectory +'/htmls/' + curdir[i];
	console.log('fullpath',fullpath)
    // check if item is a file
    if(fs.isFile(fullpath))
    {
		console.log('is file',fullpath)
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

var interval = setInterval(function() {
    if (!loadInProgress && pageindex < htmlFiles.length) {
		console.log("image " + pageindex );
        page.open('file:///'+htmlFiles[pageindex]);
    }
    if (pageindex == htmlFiles.length) {
        console.log("image render complete!");
        phantom.exit();
    }
}, 250);

page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('page ' + pageindex  + ' load started');
};

page.onLoadFinished = function() {
	loadInProgress = false;
	
    page.evaluate(function(w, h) {
		document.body.style.width = w + "px";
		document.body.style.height = h + "px";
	  }, width, height);
      page.clipRect = {top: 0, left: 0, width: width, height: height};
    
    // page.evaluate(function () {

    //     // the scale of the content, 1 for normal, 2 for a kind of retina
    //     var scale = 2;

    //     document.body.style.webkitTransform = "scale(" + scale + ")";
    //     document.body.style.webkitTransformOrigin = "0% 0%";
    //     document.body.style.width = 100/scale + "%";

    // });

    var height = page.evaluate(function() { return document.body.offsetHeight }),
        width = page.evaluate(function() { return document.body.offsetWidth });
    page.viewportSize = { height:height, width:width }

    page.render("scrnCapture/page" + pageindex + ".png", {format: 'png', quality: '100'});
    console.log('page ' + pageindex + ' load finished');
    pageindex++;
}