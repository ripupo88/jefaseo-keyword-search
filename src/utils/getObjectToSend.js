const cheerio = require('cheerio');

function getObjectToSend(content) {
    try {
        let $ = new cheerio.load(content);
        let tableCont = [];
        const h1 = $('h1').text();
        const lead = $('h1 + p').text();

        let html = $.html($('h2').get(0));

        $('h2 ~').each(function (i, elem) {
            html += $.html(elem);
        });

        const alt = $('img').attr('alt');
        const imagetoload = $('img').attr('src').split(',')[1];
        const imgname = $('img').attr('data-file-name');
        let name = '';

        const getUrl = async (imagetoload, imgname) => {
            var formdata = new FormData();
            formdata.append('image', imagetoload);
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            };
            let res = await fetch(
                `https://api.imgbb.com/1/upload?name=${imgname}&key=2aa46fc36dc23a399e435705d47e4c1c`,
                requestOptions
            );
            res = await res.json();
            return res.data.url;
        };

        getUrl(imagetoload, imgname).then((resp) => {
            console.log(resp);
            name = resp;
            //obtener la imagen principal y subirla al imgbb
            const miimg = 'https://img.tal';
            $('img').html(`<img class='miclasse' src=${miimg}/>`);
            console.log($('img').html());
            //cambiando el id de los h2 para poner link
            $('h2').map(function (i, el) {
                $(this).attr('id', $(this).text().replace(/ /g, '-'));
                console.log($(this).attr());
                let texth2 = $(this).text();
                tableCont.push(texth2);
            });
        });
        let datatosend = {
            content: {
                tableCont,
                h1,
                lead,
                img: {
                    name,
                    alt,
                },
                html,
                recom: [
                    {
                        prod: ['g502'],
                        h2: 'mas baratos',
                    },
                ],
            },
            seo: {
                opengraph: {
                    sitename: 'Raton Gaming',
                },
                twiter: {
                    author: '@richar',
                    site: '@site',
                },
                title: h1 + ' | ' + 'Raton Gaming',
                description: lead,
                url: h1.replace(/ /, '-'),
                img: name,
            },
        };
        return datatosend;
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { getObjectToSend };
