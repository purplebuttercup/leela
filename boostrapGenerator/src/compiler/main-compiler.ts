import { TokensData } from '../tokens-data';
import { TextGenerator } from './text-generator';

export class MainCompiler {
	private tokensData = new TokensData();
	private textGenerator = new TextGenerator();

	inspectContent(pageContent){ 
		let self = this;
		let fullPageLayout = '';

        let pageTemp = pageContent.split(']');
		let page = [];
		pageTemp.pop() 
		pageTemp.forEach(pageElement => {
			page.push(pageElement.split('['));
		}) 

		page.forEach((pageElement) => {
			//layout content
			let fileLayout = self.tokensData.getLayoutTokenData(pageElement[0]).content;

			//extract rows
			let rowContentTemp = pageElement[1].split('>');
			let rowContent = [];
			rowContentTemp.pop();
			rowContentTemp.forEach(rowContentElement => { 
				let rowContentElementTemp = rowContentElement.split('<')
				rowContentElementTemp.shift()
				rowContent.push(rowContentElementTemp[0]);   
			})  
			
			let layoutWithRow = ''
			rowContent.forEach(col => {
				//row content
				let rowGridLayout = self.tokensData.getGridTokenData('row').content; 

				//extract columns
				let colContentTemp = col.split('}');
				let colContent = [];
				colContentTemp.pop() 
				colContentTemp.forEach(colContentElement => {
					let colContentElementTemp = colContentElement.split('{')
					colContentElementTemp.shift()
					colContent.push(colContentElementTemp[0]);   
				})  
				
				let rowWithColumns = '';
				colContent.forEach(token => {
					//column content
					let colGridLayout = self.tokensData.getGridTokenData('col').content;

					//extract tokens
					let tokensArray= token.split(',');
					
					let tokenLayout = ''
					tokensArray.forEach(token => {
						if (token.length > 1) 
							tokenLayout = tokenLayout + self.tokensData.getTokenData(token).content;
					});
					rowWithColumns = rowWithColumns + colGridLayout.replace('#tokensContent#', tokenLayout)

				});				
				layoutWithRow  = layoutWithRow + rowGridLayout.replace('#tokensContent#', rowWithColumns)

			});
			fullPageLayout = fullPageLayout + fileLayout.replace('#tokensContent#', layoutWithRow)
			
		})
		 
		return fullPageLayout;
	}
}