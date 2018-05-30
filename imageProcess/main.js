var im = require('imagemagick');
var fs = require('fs');
var path = require('path');

var inputPath = 'image*.png';
var outputPath = 'imagesProcessed*.png';
var width = 50; // output width in pixels


var imgFiles = new Array();
var dir = path.join(__dirname + '/images')
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
        // check that file is png
        if(fullpath.indexOf('.png') != -1)
        {
            // show full path of file
            console.log('File path: ' + fullpath);
            imgFiles.push(fullpath);
        }
	}
	else {
		console.log('not file',fullpath)
	}
}
console.log('Number of Img Files: ' + imgFiles.length);

var pageindex = 0;

for (pageindex; pageindex< imgFiles.length; pageindex++){

    var args = [
    imgFiles[pageindex],
    '-filter',
    'Triangle', 
    '-define',
    'filter:support=2',
    '-thumbnail',
    width,
    '-unsharp',
    '0.25x0.25+8+0.065',
    '-dither',
    'None',
    '-posterize',
    '136',
    '-quality',
    '82',
    '-define',
    'png:compression-filter=5',
    '-define',
    'png:compression-level=9',
    '-define',
    'png:compression-strategy=1',
    '-define',
    'png:exclude-chunk=all',
    '-interlace',
    'none',
    '-colorspace',
        'Gray',
    '-strip',
    'imagesProcessed/page'+pageindex+'.png'
    ]; 

    im.convert(args, function(err, stdout, stderr) {
        if (err)
            console.log('err')
        console.log('done')
    });
}