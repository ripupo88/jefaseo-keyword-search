const cheerio = require('cheerio');

async function getObjectToSend(content) {
    try {
        let $ = new cheerio.load(content);
        let tableCont = [];
        const h1 = $('h1').text();
        const lead = $('h1 + p').text();
        const alt = $('img').attr('alt');
        const imagetoload = $('img').attr('src').split(',')[1];

        //cambiando el id de los h2 para poner link
        $('h2').map(function (i, el) {
            $(this).attr(
                'id',
                $(this)
                    .text()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s]/gi, '')
                    .toLowerCase()
                    .replace(/ /g, '-')
            );

            let texth2 = $(this).text();
            tableCont.push(texth2);
        });

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

        //obtener el html final
        let html = $.html($('h2').get(0));

        let newhtml = await Promise.all(
            $('h2 ~').map(async function (i, elem) {
                if ($(elem)[0].name === 'div') {
                    const imagetoload = $(elem)
                        .find('img')
                        .attr('src')
                        .split(',')[1];
                    const imgname = $(elem).find('img').attr('data-file-name');
                    const resp = await getUrl(imagetoload, imgname);
                    console.log(elem);
                    $(elem).html(`<img src=${resp} />`);
                    return Promise.resolve(elem);
                }
                return Promise.resolve(elem);
            })
        );
        html += $.html(newhtml);
        console.log(html);
        //obtener imagen principal
        let newResp = await getUrl(imagetoload, imgname);
        name = newResp;

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
                url: h1
                    .normalize('NFD')
                    .toLowerCase()
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s]/gi, '')
                    .replace(/ /g, '-'),
                img: name,
            },
        };

        return datatosend;
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { getObjectToSend };
