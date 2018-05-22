"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_data_1 = require("../tokens-data");
const text_generator_1 = require("./text-generator");
class MainCompiler {
    constructor() {
        this.tokensData = new tokens_data_1.TokensData();
        this.textGenerator = new text_generator_1.TextGenerator();
    }
    extractRows(layout) {
        let rowContentTemp = layout.split('>');
        let rowContent = [];
        rowContentTemp.pop();
        rowContentTemp.forEach(rowContentElement => {
            let rowContentElementTemp = rowContentElement.split('<');
            rowContentElementTemp.shift();
            rowContent.push(rowContentElementTemp[0]);
        });
        return rowContent;
    }
    extractCols(row) {
        let colContentTemp = row.split('}');
        let colContent = [];
        colContentTemp.pop();
        colContentTemp.forEach(colContentElement => {
            let colContentElementTemp = colContentElement.split('{');
            colContentElementTemp.shift();
            colContent.push(colContentElementTemp[0]);
        });
        return colContent;
    }
    extractTokens() {
    }
    inspectContent(pageContent) {
        let self = this;
        let fullPageLayout = '';
        let pageTemp = pageContent.split(']');
        let page = [];
        pageTemp.pop();
        pageTemp.forEach(pageElement => {
            page.push(pageElement.split('['));
        });
        page.forEach((pageElement) => {
            //layout content
            let fileLayout = self.tokensData.getLayoutTokenData(pageElement[0]).content;
            //extract rows
            let rowContent = self.extractRows(pageElement[1]);
            let layoutWithRow = '';
            if (rowContent.length > 0) {
                rowContent.forEach(rowElement => {
                    //row content
                    let rowGridLayout = self.tokensData.getGridTokenData('row').content;
                    //extract columns
                    let colContent = self.extractCols(rowElement);
                    let rowWithColumns = '';
                    if (colContent.length > 0) {
                        colContent.forEach(colElement => {
                            //column content
                            let colGridLayout = self.tokensData.getGridTokenData('col').content;
                            //extract tokens
                            let tokensContent = colElement.split(',');
                            let tokenLayout = '';
                            tokensContent.forEach(token => {
                                if (token.length > 1)
                                    tokenLayout = tokenLayout + self.tokensData.getTokenData(token).content;
                            });
                            rowWithColumns = rowWithColumns + colGridLayout.replace('#tokensContent#', tokenLayout);
                        });
                        layoutWithRow = layoutWithRow + rowGridLayout.replace('#tokensContent#', rowWithColumns);
                    }
                    else {
                        //extract tokens 
                        let tokensContent = rowElement.split(',');
                        let tokenLayout = '';
                        tokensContent.forEach(token => {
                            if (token.length > 1)
                                tokenLayout = tokenLayout + self.tokensData.getTokenData(token).content;
                        });
                        layoutWithRow = layoutWithRow + rowGridLayout.replace('#tokensContent#', tokenLayout);
                    }
                });
                fullPageLayout = fullPageLayout + fileLayout.replace('#tokensContent#', layoutWithRow);
            }
            else {
                //extract tokens
                let tokensContent = pageElement[1].split(',');
                let tokenLayout = '';
                tokensContent.forEach(token => {
                    if (token.length > 1)
                        tokenLayout = tokenLayout + self.tokensData.getTokenData(token).content;
                });
                fullPageLayout = fullPageLayout + fileLayout.replace('#tokensContent#', tokenLayout);
            }
        });
        return fullPageLayout;
    }
}
exports.MainCompiler = MainCompiler;
