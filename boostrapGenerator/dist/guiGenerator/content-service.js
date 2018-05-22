"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_generator_1 = require("./random-generator");
const tokens_data_1 = require("../tokens-data");
class ContentService {
    constructor() {
        this.randomGenerator = new random_generator_1.RandomGenerator();
        this.tokensData = new tokens_data_1.TokensData();
    }
    assureUniqueness(tokensList, tokenType) {
        let tokenTypeIndices = [];
        tokenTypeIndices = tokensList.map((content, index) => content == tokenType ? index : '').filter(String);
        if (tokenTypeIndices.length > 0) {
            //go in reverse (to not mess up array order) and delete not wanted duplicate element
            for (var i = tokenTypeIndices.length - 1; i > 0; i--)
                tokensList.splice(tokenTypeIndices[i], 1);
        }
        return tokensList;
    }
    addTokensToContent() {
        let self = this;
        //create between 2 - 7 token elements
        let countToken = Math.floor(Math.random() * 7) + 2;
        //create between 2 - 4 rows
        let rows = Math.floor(Math.random() * 3) + 2;
        let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'content')[0].canContain;
        let elementsToken = [];
        let tokenInLayout = 'content[';
        for (let i = 0; i < countToken; i++)
            elementsToken.push(self.randomGenerator.getRandomToken(tokensList));
        //--- BREADCRUMB ---//
        elementsToken = self.assureUniqueness(elementsToken, 'breadcrumb');
        //--- TABS ---//
        elementsToken = self.assureUniqueness(elementsToken, 'tabs');
        let eachRowElements = self.randomGenerator.generateRandomNoTokensInColumn(elementsToken.length, rows);
        //each row has 3 columns with random no. of tokens
        let elementsTokenIdx = 0;
        eachRowElements.forEach(rowElements => {
            tokenInLayout = tokenInLayout + '<';
            let eachColumnElements = self.randomGenerator.generateRandomNoTokensInColumn(rowElements, 3);
            eachColumnElements.forEach(columnElements => {
                tokenInLayout = tokenInLayout + '{';
                for (let i = 0; i < columnElements; i++) {
                    if (i == columnElements - 1)
                        tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx];
                    else
                        tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx] + ',';
                    elementsTokenIdx++;
                }
                tokenInLayout = tokenInLayout + '}';
            });
            tokenInLayout = tokenInLayout + '>';
        });
        return tokenInLayout + ']';
    }
    addTokensToNavbar() {
        let self = this;
        //create between 1 - 6 token elements
        let countToken = Math.floor(Math.random() * 8) + 1;
        let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'navbar')[0].canContain;
        let elementsToken = [];
        let tokenInLayout = 'navbar[';
        for (let i = 0; i < countToken; i++)
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
            for (let i = 0; i < columnElements; i++) {
                if (i == columnElements - 1)
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
    addTokensToFooter() {
        let self = this;
        //create between 1 - 5 token elements
        let countToken = Math.floor(Math.random() * 5) + 1;
        //create between 1 - 2 rows
        let rows = Math.floor(Math.random() * 2) + 1;
        let tokensList = self.tokensData.layout_tokens.filter(tk => tk.name == 'footer')[0].canContain;
        let elementsToken = [];
        let tokenInLayout = 'footer[';
        for (let i = 0; i < countToken; i++)
            elementsToken.push(self.randomGenerator.getRandomToken(tokensList));
        //--- THIRDPARTY ---//
        elementsToken = self.assureUniqueness(elementsToken, 'thirdParty');
        //--- COPYRIGHT ---//
        elementsToken = self.assureUniqueness(elementsToken, 'copyright');
        let eachRowElements = self.randomGenerator.generateRandomNoTokensInColumn(elementsToken.length, rows);
        //each row has 3 columns with random no. of tokens
        let elementsTokenIdx = 0;
        eachRowElements.forEach(rowElements => {
            tokenInLayout = tokenInLayout + '<';
            let eachColumnElements = self.randomGenerator.generateRandomNoTokensInColumn(rowElements, 3);
            eachColumnElements.forEach(columnElements => {
                tokenInLayout = tokenInLayout + '{';
                for (let i = 0; i < columnElements; i++) {
                    if (i == columnElements - 1)
                        tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx];
                    else
                        tokenInLayout = tokenInLayout + elementsToken[elementsTokenIdx] + ',';
                    elementsTokenIdx++;
                }
                tokenInLayout = tokenInLayout + '}';
            });
            tokenInLayout = tokenInLayout + '>';
        });
        return tokenInLayout + ']';
    }
}
exports.ContentService = ContentService;
