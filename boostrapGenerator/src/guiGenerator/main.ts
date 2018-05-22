import { ContentService } from "./content-service";
import { RandomGenerator } from "./random-generator";
import { TokensData } from "../tokens-data";


export class Main {
	private contentService = new ContentService();
	private randomGenerator = new RandomGenerator();
	private tokensData = new TokensData(); 

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