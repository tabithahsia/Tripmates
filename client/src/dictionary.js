// import Spokesman from 'spokesman';
var Spokesman = require("spokesman");

let spokesman = new Spokesman({
    fr: {
        'APPLE': 'pomme'
    },
    en: {
        'APPLE': 'apple'
    }
});

spokesman.useDictionary('fr');
console.log(spokesman.translate('APPLE'));
