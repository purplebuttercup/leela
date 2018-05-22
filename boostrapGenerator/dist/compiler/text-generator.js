"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = require("chance");
class TextGenerator {
    constructor() {
        this.chance = new chance_1.Chance();
        // console.log(chance.bool()); 
    }
    getRandomText(token) {
        let self = this;
        console.log(token);
        switch (token) {
            case 'breadcrumb':
                return self.chance.word();
            case 'button':
                return self.chance.word();
            case 'checkbox':
                return self.chance.sentence({ words: 3 });
            case 'dropdown':
                return self.chance.sentence({ words: 3 });
            case 'input':
                return self.chance.sentence({ words: 2 });
            case 'radio':
                return self.chance.sentence({ words: 2 });
            case 'tabs':
                return self.chance.sentence({ words: 1 });
            case 'text':
                return self.chance.paragraph({ sentences: 1 });
        }
    }
}
exports.TextGenerator = TextGenerator;
