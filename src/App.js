import React, { useState } from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { keywords } from './sample';

const App = (props) => {
    const [seolist, setSeolist] = useState({ lista: [{ valor: '', num: 0 }] });

    // useEffect(() => {
    //     if (localStorage.getItem('texto') !== null) {
    //         setContentmio(JSON.parse(localStorage.getItem('texto')).cont);
    //         console.log('s', contentmio);
    //     }
    // }, [contentmio]);

    const handleChange = (content) => {
        // localStorage.setItem('texto', JSON.stringify({ cont: content }));
        if (content.length > 50) {
            keywords(
                content
                    .replace(/<[^>]*>/g, ' ')
                    .replace(/\s{2,}/g, ' ')
                    .replace(/&nbsp;/g, ' ')
            ).then((res) => {
                console.log(res);
                setSeolist(res);
            }); //Get Content Inside Editor
        }
    };

    return (
        <div className=' row'>
            <div className='col-10'>
                <SunEditor
                    height='80vh'
                    lang='es'
                    text={'data'}
                    onChange={handleChange}
                    setOptions={{
                        buttonList: buttonList.complex, // Or Array of button list, eg. [['font', 'align'], ['image']]
                        // Other option
                    }}
                />
            </div>
            <div className='col-2'>
                <h4 className='mt-5'>SEO</h4>
                <h5>
                    Total:
                    <small> {seolist.total}</small>
                </h5>
                <h5>
                    Únicas:
                    <small> {seolist.unicas}</small>
                </h5>
                <ul>
                    {seolist.lista.map((item) => {
                        return (
                            <li>
                                <span className='text-muted'>
                                    {item.valor}{' '}
                                </span>
                                <small>
                                    <b>{item.num} </b>
                                </small>
                                <span className='text-muted'>
                                    {' '}
                                    (%{item.porciento})
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default App;
