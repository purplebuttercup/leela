
import { RandomGenerator } from "./random-generator";
import { TokensData } from "../tokens-data";

export class ContentService {
	private randomGenerator = new RandomGenerator(); 
	private tokensData = new TokensData();

	assureUniqueness(tokensList, tokenType){
		let tokenTypeIndices = []
		tokenTypeIndices = tokensList.map((content, index) => content == tokenType ? index : '').filter(String)
		if (tokenTypeIndices.length > 0){
			//go in reverse (to not mess up array order) and delete not wanted duplicate element
			for (var i = tokenTypeIndices.length -1; i > 0; i--) 
				tokensList.splice(tokenTypeIndices[i],1);
		}

		return tokensList;
	}
  
	addTokensToContent(){
		let self = this;

		//create between 2 - 7 token elements
		let countToken = Math.floor(Math.random() * 7) + 2; 
		//create between 2 - 4 rows
		let rows = Math.floor(Math.random() * 3) + 2;
		let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'content')[0].canContain;
		let elementsToken :any[] =[];  
		let tokenInLayout = 'content[';
		for (let i=0; i< countToken; i++)
			elementsToken.push(self.randomGenerator.getRandomToken(tokensList));

		let eachRowElements = self.randomGenerator.generateRandomNoTokensInColumn(elementsToken.length, rows);
		//each row has 2 columns with random no. of tokens
		let elementsTokenIdx = 0;
		eachRowElements.forEach(rowElements => {
			tokenInLayout = tokenInLayout + '<';
			let eachColumnElements = self.randomGenerator.generateRandomNoTokensInColumn(rowElements, 2);
			eachColumnElements.forEach(columnElements => {
				tokenInLayout = tokenInLayout + '{';
				for(let i=0; i<columnElements; i++){
					if (i == columnElements -1)
						tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx];
					else
						tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx] + ',';
					elementsTokenIdx++;
				}
				tokenInLayout = tokenInLayout + '}';
			});
			tokenInLayout = tokenInLayout + '>';
		})
  
		return tokenInLayout + ']';
	}

	addTokensToNavbar(){
		let self = this;

		//create between 1 - 5 token elements
		let countToken = Math.floor(Math.random() * 5) + 1;
		let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'navbar')[0].canContain;
		let elementsToken: any[] = [];
		let tokenInLayout = 'navbar[';
		
		for (let i=0; i< countToken; i++)
			elementsToken.push(self.randomGenerator.getRandomToken(tokensList));

		//--- NAVBAR-LOGO ---//
		elementsToken = self.assureUniqueness(elementsToken, 'navbarLogo');
 
		//--- NAVBAR-BRAND ---//  
		elementsToken = self.assureUniqueness(elementsToken, 'navbarBrand');
 
		//each navbar has 1 row and 3 columns with random no. of tokens
		tokenInLayout = tokenInLayout + '<';
		let eachColumnElements = self.randomGenerator.generateRandomNoTokensInColumn(elementsToken.length, 3);
		let elementsTokenIdx = 0;
		eachColumnElements.forEach(columnElements => {
			tokenInLayout = tokenInLayout + '{';
			for(let i=0; i<columnElements; i++){
				if (i == columnElements -1)
					tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx];
				else
					tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx] + ',';
				elementsTokenIdx++;
			}
			tokenInLayout = tokenInLayout + '}';
		}); 
		tokenInLayout = tokenInLayout + '>';

		return tokenInLayout + ']';

	} 
 
	addTokensToNavigation(){  
		let self = this;

		//create 1 element
		let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'navigation')[0].canContain;
		let elementsToken: any[] = [];
		let tokenInLayout = 'navigation[';
		
		elementsToken.push(self.randomGenerator.getRandomToken(tokensList));
		//each navigation has 1 row with either 1 breadcrumb or 1 tab
		tokenInLayout = tokenInLayout + '<' + elementsToken[0] + '>';

		return tokenInLayout + ']';
	}
 
	addTokensToFooter(){
		let self = this;

		//create between 1 - 5 token elements
		let countToken = Math.floor(Math.random() * 5) + 1;
		//create between 1 - 2 rows
		let rows = Math.floor(Math.random() * 2) + 1;
		let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'footer')[0].canContain;
		let elementsToken : any = [];
		let tokenInLayout = 'footer[';
	
		for (let i=0; i< countToken; i++)
			elementsToken.push(self.randomGenerator.getRandomToken(tokensList))

		//--- THIRDPARTY ---//
		elementsToken = self.assureUniqueness(elementsToken, 'thirdParty');

		//--- COPYRIGHT ---//
		elementsToken = self.assureUniqueness(elementsToken, 'copyright');

		let eachRowElements = self.randomGenerator.generateRandomNoTokensInColumn(elementsToken.length, rows);
		//each row has 2 columns with random no. of tokens
		let elementsTokenIdx = 0;
		eachRowElements.forEach(rowElements => {
			tokenInLayout = tokenInLayout + '<';
			let eachColumnElements = self.randomGenerator.generateRandomNoTokensInColumn(rowElements, 2);
			eachColumnElements.forEach(columnElements => {
				tokenInLayout = tokenInLayout + '{';
				for(let i=0; i<columnElements; i++){
					if (i == columnElements -1)
						tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx];
					else
						tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx] + ',';
					elementsTokenIdx++;
				}
				tokenInLayout = tokenInLayout + '}';
			});
			tokenInLayout = tokenInLayout + '>';
		})

		return tokenInLayout + ']';

	}
}