"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RandomGenerator {
    getRandomToken(tokens) {
        var num = Math.random(), s = 0, lastIndex = tokens.length - 1;
        for (var i = 0; i < lastIndex; ++i) {
            s += tokens[i].weight;
            if (num < s) {
                return tokens[i].name;
            }
        }
        return tokens[lastIndex].name;
    }
    decideIfLayoutTokenPresent() {
        let numbers = [{ name: 0, weight: 0.3 }, { name: 1, weight: 0.7 }];
        var num = Math.random(), s = 0, lastIndex = numbers.length - 1;
        for (var i = 0; i < lastIndex; ++i) {
            s += numbers[i].weight;
            if (num < s) {
                return numbers[i].name;
            }
        }
        return numbers[lastIndex].name;
    }
    ;
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    ;
    generateRandomNoTokensInColumn(max, thecount) {
        let self = this;
        let r = [];
        let currsum = 0;
        if (max > 0) {
            for (let i = 0; i < thecount - 1; i++) {
                r[i] = self.randomBetween(0, max - (thecount - i - 1) - currsum);
                currsum += r[i];
            }
            r[thecount - 1] = max - currsum;
        }
        else {
            for (let i = 0; i < thecount; i++)
                r[i] = 0;
        }
        return r;
    }
}
exports.RandomGenerator = RandomGenerator;
