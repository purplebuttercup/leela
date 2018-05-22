import { Chance } from 'chance';

export class TextGenerator {
	private chance = new Chance();

	getRandomText(token){
		let self = this;
		console.log(token)
		switch(token){
			case 'breadcrumb':
				return self.chance.word()
			case 'button':
				return self.chance.word()
			case 'checkbox':
				return self.chance.sentence({ words: 3 })
			case 'dropdown':
				return self.chance.sentence({ words: 3 })
			case 'input':
				return self.chance.sentence({ words: 2 })
			case 'radio':
				return self.chance.sentence({ words: 2 })
			case 'tabs':
				return self.chance.sentence({ words: 1 })
			case 'text':
				return self.chance.paragraph({ sentences: 1 })
		}
	}
	// console.log(chance.bool()); 

}