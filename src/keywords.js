//  include the Keyword Extractor
var keyword_extractor = require('keyword-extractor');

export const keywords = async (htmlgot = 'unknow') => {
    let sentence = htmlgot;
    sentence = sentence.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    sentence = sentence.replace(/[^\w\s]/gi, '');

    //  Extract the keywords
    let res = keyword_extractor.extract(sentence, {
        language: 'spanish',
        remove_digits: true,
        return_changed_case: false,
        remove_duplicates: false,
    });

    for (let i = 0; i < res.length; i++) {
        res[i] = res[i].toLowerCase();
    }

    let count = [];
    res.filter((v, i, a) => {
        if (a.indexOf(v) === i) {
            count.push({ valor: v, num: 1, porciento: 100 });
            return true;
        } else {
            const inds = count.findIndex((item) => {
                return item.valor === v;
            });
            count[inds].num += 1;
            count[inds].porciento = Math.floor(
                (100 * count[inds].num) / res.length,
                2
            );
        }
        return false;
    });

    count.sort(function (a, b) {
        return b.num - a.num;
    });

    const result = {
        total: sentence.split(' ').length,
        unicas: count.length,
        porcentaje: (100 * count[0].num) / res.length,
        lista: count,
    };

    console.log('palabras totales', res.length);
    console.log('palabras unicas', count.length);
    console.log('porcentaje', (100 * count[0].num) / res.length);
    console.log(count[0]);
    console.log(count[1]);
    console.log(count[2]);
    console.log(count[3]);
    console.log(count[4]);
    console.log(count[5]);
    console.log(count[6]);
    console.log(count[7]);
    console.log(count[8]);
    console.log(count[9]);
    console.log(count[10]);
    console.log(count[11]);
    console.log(count[12]);

    return result;
};
