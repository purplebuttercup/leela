"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const main_1 = require("./guiGenerator/main");
const main_compiler_1 = require("./compiler/main-compiler");
//build labels
function buildGui(pageContent) {
    return pageContent;
}
;
//build html pages for associated labels 
function buildHtml(pageContent) {
    let compiler = new main_compiler_1.MainCompiler();
    let header = '<meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">';
    let bootstrap = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">';
    let customcss = '<link rel="stylesheet" href="../css/main.css"';
    let content = compiler.inspectContent(pageContent);
    let body = '<div class="container" style="margin-top: 20px; margin-bottom=20px">' + content + '</div>';
    let scripts = '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>' +
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>' +
        '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>';
    return '<!DOCTYPE html>' +
        '<html>' +
        '<header>' + header + bootstrap + customcss + '</header>' +
        '<body>' + body + scripts + '</body>' +
        '</html>';
}
//write noFiles files
let noFiles = 1;
for (let index = 0; index < noFiles; index++) {
    let main = new main_1.Main();
    let pageContent = main.createRandomPage();
    let fileNameGui = path.join(__dirname, '../guis/page' + index + '.gui');
    let fileNameHtml = path.join(__dirname, '../htmls/page' + index + '.html');
    fs.writeFile(fileNameGui, buildGui(pageContent), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file page" + index + ".gui was saved!");
    });
    fs.writeFile(fileNameHtml, buildHtml(pageContent), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file page" + index + ".html was saved!");
    });
}
