import React, { useEffect, useRef, useState } from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { keywords } from './sample';
import { getObjectToSend } from './utils/getObjectToSend';
const cheerio = require('cheerio');

const App = (props) => {
    const [seolist, setSeolist] = useState({ lista: [{ valor: '', num: 0 }] });
    const [content, setContent] = useState('');

    const editorRef = useRef();
    useEffect(() => {
        // Get underlining core object here
        // Notice that useEffect is been used because you have to make sure the editor is rendered.
        console.log(editorRef);
    }, []);

    const onSubmit = () => {
        const objectTosend = getObjectToSend(content);
        console.log(objectTosend);
        // if (content.length > 50) {
        //     keywords(
        //         content
        //             .replace(/<[^>]*>/g, ' ')
        //             .replace(/\s{2,}/g, ' ')
        //             .replace(/&nbsp;/g, ' ')
        //     ).then((res) => {
        //         console.log(res);
        //         setSeolist(res);
        //     }); //Get Content Inside Editor
        // }
    };
    return (
        <div className=' row'>
            <div className='col-10'>
                <SunEditor
                    height='80vh'
                    lang='es'
                    text={'data'}
                    onChange={setContent}
                    setOptions={{
                        buttonList: buttonList.complex, // Or Array of button list, eg. [['font', 'align'], ['image']]
                        // Other option
                    }}
                />
            </div>
            <div className='col-2'>
                <button onClick={() => onSubmit(content)}>Submit</button>
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
