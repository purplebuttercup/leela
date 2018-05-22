"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_service_1 = require("./content-service");
const random_generator_1 = require("./random-generator");
const tokens_data_1 = require("../tokens-data");
class Main {
    constructor() {
        this.contentService = new content_service_1.ContentService();
        this.randomGenerator = new random_generator_1.RandomGenerator();
        this.tokensData = new tokens_data_1.TokensData();
    }
    createRandomPage() {
        let self = this;
        //final page content with tokens and layout_tokens
        let pageContent = [];
        //decide if navbar present
        if (self.randomGenerator.decideIfLayoutTokenPresent())
            pageContent.push(self.contentService.addTokensToNavbar());
        //add content
        pageContent.push(self.contentService.addTokensToContent());
        //decide if footer present
        if (self.randomGenerator.decideIfLayoutTokenPresent())
            pageContent.push(self.contentService.addTokensToFooter());
        return pageContent.join('');
    }
}
exports.Main = Main;
// let main = new Main();
// main.createRandomPage();
//--- NAVBAR ---//
// let navbarIndices = []
// navbarIndices = elementsLayout.map((content, index) => content == 'navbar' ? index : '').filter(String)
// if (navbarIndices.length > 0){
// 	//go in reverse (to not mess up array order) and delete not wanted duplicate element
// 	for (var i = navbarIndices.length -1; i >= 0; i--) 
// 		elementsLayout.splice(navbarIndices[i],1);
// 	pageContent.push(self.contentService.addTokenToNavbar());
// }
// //--- FOOTER ---//
// let footerIndices = []
// footerIndices = elementsLayout.map((content, index) => content == 'footer' ? index : '').filter(String)
// if (footerIndices.length > 0){
// 	//go in reverse (to not mess up array order) and delete not wanted duplicate element
// 	for (var i = footerIndices.length -1; i >= 0; i--) 
// 		elementsLayout.splice(footerIndices[i],1); 
// } 
