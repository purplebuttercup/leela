"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class TokensData {
    constructor() {
        this.tokens = [
            {
                name: 'breadcrumb',
                location: 'tokens/breadcrumb.html',
                content: ''
            },
            {
                name: 'button',
                location: 'tokens/button.html',
                content: ''
            },
            {
                name: 'checkbox',
                location: 'tokens/checkbox.html',
                content: ''
            },
            {
                name: 'copyright',
                location: 'tokens/copyright.html',
                content: ''
            },
            {
                name: 'dropdown',
                location: 'tokens/dropdown.html',
                content: ''
            },
            {
                name: 'footerLink',
                location: 'tokens/footerLink.html',
                content: ''
            },
            {
                name: 'input',
                location: 'tokens/input.html',
                content: ''
            },
            {
                name: 'navbarBrand',
                location: 'tokens/navbarBrand.html',
                content: ''
            },
            {
                name: 'navbarLogo',
                location: 'tokens/navbarLogo.html',
                content: ''
            },
            {
                name: 'navbarLink',
                location: 'tokens/navbarLink.html',
                content: ''
            },
            {
                name: 'navbarDropdown',
                location: 'tokens/navbarDropdown.html',
                content: ''
            },
            {
                name: 'radio',
                location: 'tokens/radio.html',
                content: ''
            },
            {
                name: 'tabs',
                location: 'tokens/tabs.html',
                content: ''
            },
            {
                name: 'text',
                location: 'tokens/text.html',
                content: ''
            },
            {
                name: 'thirdParty',
                location: 'tokens/thirdParty.html',
                content: ''
            }
        ];
        this.grid_tokens = [
            {
                name: 'row',
                location: 'tokensGrid/row.html',
                content: ''
            },
            {
                name: 'col',
                location: 'tokensGrid/col.html',
                content: ''
            }
        ];
        this.layout_tokens = [
            {
                name: 'content',
                location: 'layoutTokens/content.html',
                content: '',
                canContain: [
                    {
                        name: 'button',
                        weight: 0.3
                    },
                    {
                        name: 'checkbox',
                        weight: 0.1
                    },
                    {
                        name: 'dropdown',
                        weight: 0.1
                    },
                    {
                        name: 'input',
                        weight: 0.2
                    },
                    {
                        name: 'radio',
                        weight: 0.1
                    },
                    {
                        name: 'text',
                        weight: 0.15
                    }
                ]
            },
            {
                name: 'navbar',
                location: 'layoutTokens/navbar.html',
                content: '',
                canContain: [
                    {
                        name: 'navbarBrand',
                        weight: 0.1
                    },
                    {
                        name: 'navbarLogo',
                        weight: 0.1
                    },
                    {
                        name: 'navbarLink',
                        weight: 0.4
                    },
                    {
                        name: 'navbarDropdown',
                        weight: 0.4
                    }
                ]
            },
            {
                name: 'navigation',
                location: 'layoutTokens/navigation.html',
                content: '',
                canContain: [
                    {
                        name: 'breadcrumb',
                        weight: 0.5
                    },
                    {
                        name: 'tabs',
                        weight: 0.5
                    },
                ]
            },
            {
                name: 'footer',
                location: 'layoutTokens/footer.html',
                content: '',
                canContain: [
                    {
                        name: 'text',
                        weight: 0.5
                    },
                    {
                        name: 'thirdParty',
                        weight: 0.1
                    },
                    {
                        name: 'copyright',
                        weight: 0.1
                    },
                    {
                        name: 'footerLink',
                        weight: 0.3
                    }
                ]
            }
        ];
        let self = this;
        self.readAllFiles();
    }
    readAllFiles() {
        let self = this;
        self.layout_tokens.map(layoutToken => {
            layoutToken.content = fs.readFileSync('tokensLayout/' + layoutToken.name + '.html').toString();
            ;
        });
        self.grid_tokens.map(gridToken => {
            gridToken.content = fs.readFileSync('tokensGrid/' + gridToken.name + '.html').toString();
            ;
        });
        self.tokens.map(token => {
            token.content = fs.readFileSync('tokens/' + token.name + '.html').toString();
            ;
        });
    }
    getLayoutTokenData(data) {
        let self = this;
        let foundData = self.layout_tokens.filter(lt => {
            return lt.name == data;
        });
        return foundData[0];
    }
    getGridTokenData(data) {
        let self = this;
        let foundData = self.grid_tokens.filter(lt => {
            return lt.name == data;
        });
        return foundData[0];
    }
    getTokenData(data) {
        let self = this;
        let foundData = self.tokens.filter(t => {
            return t.name == data;
        });
        return foundData[0];
    }
}
exports.TokensData = TokensData;
