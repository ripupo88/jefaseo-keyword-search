import React, { useEffect, useRef, useState } from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
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
        getObjectToSend(content).then((res) => {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            var raw = JSON.stringify({ j: 'l' });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(res),
                redirect: 'follow',
            };

            fetch('http://161.97.156.161:3030/article', requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        });
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
