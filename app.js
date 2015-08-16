'use strict'

/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random() * 1000));
}

/**
 * Ваши изменения ниже
 */
var responses = {};

(function(){
    'use strict'
    var requests = ['/countries', '/cities', '/populations'];
    var promises = [];
    
    for (var request of requests) {
        var resultPromise = new Promise(function(resolve, reject){
            getData(request, function(error, result){
                if (error !== null) return reject(error);
                resolve(result)
            })
        } );
        promises.push(resultPromise);
    }

    Promise.all(promises).then(function(results){  
        for (var i = 0; i < requests.length; i++ ){
            responses[requests[i]] = results[i];
        }; 
        calc(results);
    });

    function calc(l){
        var c = [], cc = [], p = 0;
        for (var i = 0; i < responses['/countries'].length; i++) {
            if (responses['/countries'][i].continent === 'Africa') {
                c.push(responses['/countries'][i].name);
            }
        }

        for (var i = 0; i < responses['/cities'].length; i++) {
            for (var j = 0; j < c.length; j++) {
                if (responses['/cities'][i].country === c[j]) {
                    cc.push(responses['/cities'][i].name);
                }
            }
        }

        for (var i = 0; i < responses['/populations'].length; i++) {
            for (var j = 0; j < cc.length; j++) {
                if (responses['/populations'][i].name === cc[j]) {
                    p += responses['/populations'][i].count;
                }
            }
        }
        console.log('Total population in African cities: ' + p);        
    }
}());

function cityPop(userInput){
            for (var city of responses['/populations']){
                if (city.name === userInput){
                    console.log('city pop =', city.count);
                    return city.count;
                }
            }
        }        

function countryPop(userInput){
    var pop = 0;
    for (var country of responses['/cities']){
        if (country.country === userInput){
            pop += cityPop(country.name);
        }
    }
    console.log('country pop =', pop);
    return pop;
}

function printPop(name, population){
    if (name && population){
        alert('Population in ' + name + ': ' + population);
    }
    else {
        alert('No data');
    }
}

function getInput(){
    var input = prompt('Enter the name of a city or a country');
        if (input) {
            //подготовка строки: убираем пробелы
            input = input.trim()
            //первую букву делаем заглавной, остальные - строчные.
            input = input.substr(0,1).toUpperCase() + input.substr(1);
            var population = cityPop(input) || countryPop(input);
            printPop(input, population);
        }
}

var button = document.getElementsByTagName('button')[0];
button.onclick = getInput;