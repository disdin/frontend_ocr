import axios from 'axios';
import React, { useState } from 'react'
import Images from './Images';
import './upload.css';
const backend_url = "https://backend-ocr-ps.onrender.com"

function Upload() {
    const axios_instance = axios.create({
        baseURL: 'https://backend-ocr-ps.onrender.com',
        timeout: 8000,
        headers: {
            Accept: 'application/json',
            'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com',
            'x-rapidapi-key': '<your-key-here>',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState(null);
    const [base64out, setBase64out] = useState(null);
    const [output, setOutput] = useState(null);
    const [loading, setloading] = useState(false);
    const [fileExtension, setFileExtension] = useState(null);
    function handleChange(e) {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0])
        setFile(null)
        setBase64out(null)
        setOutput(null)
    }

    const fileUploadHandler = async (event) => {
        setFile(URL.createObjectURL(selectedFile));
        const fd = new FormData();
        fd.append('image_name', selectedFile, selectedFile.name);
        try {
            const res = await axios_instance.post(`/upload`, fd)
        }
        catch (err) {
            console.log("upload.jsx error msg ", err)
        }
    }

    const fileRunnerHandler = async () => {
        setBase64out(null)
        setOutput(null)
        setloading(true)
        setFileExtension(null);
        const res = await axios_instance.post(`/runScript`)
        console.log(res)
        setOutput(res.data.output)
        setBase64out(res.data.data);
        setFileExtension(res.data.ext);
        setloading(false)
    }

    return (
        <>
            <Images />
            <div style={{ marginTop: "8rem",borderTop:"5px dotted green" }}>
                <h2>See results on your image</h2>
                <div className='input_btn'>
                    <input  type="file" onChange={handleChange} />
                </div>
                <div className="upload">
                    <div className="upload-left">
                        <button className='upload-btn' onClick={fileUploadHandler}>Upload</button>
                        <img src={file} className='upload-image' />
                    </div>
                    <div className="upload-right">
                        <button className='upload-btn'
                            onClick={fileRunnerHandler}
                        >
                            Run</button>
                        {base64out ?
                            <img src={`data:image/${fileExtension};base64,${base64out}`} className='upload-image' />
                            :
                            loading ? <img style={{ marginTop: "-4rem" }} src='loading_gif.gif'></img> : <></>}
                    </div>
                </div>
                <p style={{ fontWeight: "600", fontSize: "2rem" }}>{output}</p>
            </div>
        </>
    );
}

export default Upload