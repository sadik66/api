import React, { useState, useRef } from 'react';

import logo from "../../assets/logo.png"
import addImageLogo from "../../assets/addImageLogo.png"

import "./document.css"
import { useEffect } from 'react/cjs/react.production.min';
const Documents = () => {
    const hiddenFrontFileInput = useRef(null);
    const hiddenBackFileInput = useRef(null);

    const [checkboxToggle, setCheckboxToggle] = useState(true)
    const [front, setFront] = useState({})
    const [back, setBack] = useState({})
    const [error, setError] = useState("")
    let types = ['image/png', 'image/jpeg']

    console.log(front, back)
    /* useEffect(()=>{
            if(error===null)setCheckboxToggle(true)
            else setCheckboxToggle(false)
    },[error]) */
    const handleChangeFront = event => {
        const fileUploaded1 = event.target.files[0];
        if (fileUploaded1 && types.includes(fileUploaded1.type)) {
            setFront(fileUploaded1);
            setError("");
        } else {
            setFront(null);
            setError("Select valid image type jpeg or png");
        }
        // handleFile(fileUploaded);
    };

    const handleChangeBack = event => {
        const fileUploaded2 = event.target.files[0];
        if (fileUploaded2 && types.includes(fileUploaded2.type)) {
            setBack(fileUploaded2);
            setError("");
        } else {
            setBack(null);
            setError("Select valid image type jpeg or png");
        }
        setBack(fileUploaded2)
        // handleFile(fileUploaded);
    };

    const handleClickFront = event => {
        hiddenFrontFileInput.current.click();
    };
    const handleClickBack = event => {
        hiddenBackFileInput.current.click();
    };
    return (

        <div className="details-root-body">
            <div className="nav-bar">
                <div className="nav-child"><img src={logo} alt="logo" /></div>
            </div>

            <div className="body">
                <div className="order-list">
                    <p>loan info</p>
                    <p style={{ color: "blue" }} >personal info</p>
                    <p>address</p>
                    <p>documents</p>
                    <p>summary</p>
                    <p>mandate</p>
                    <p>Esign</p>
                </div>
                <div className="tog-list">
                    <h2>Documents </h2>
                </div>

                <div className=" details-container">
                    <div className="sub-container">
                        <div >
                            <h2>Documents</h2>
                        </div>
                        <div className='document-type'>
                            <b>Please Select Any of</b>
                        </div>
                        <div className='document-radio-type'>
                            <input type='radio' name='document-type' value='adhaar-card' /> Adhaar Card
                            <input type='radio' name='document-type' value='voter-id' /> Voter Id
                            <input type='radio' name='document-type' value='driving-licence' /> Driving Licence
                        </div>
                        <div className="documents-upload-div" >
                            <div className='hun' onClick={handleClickFront}>
                                <div className='hun-text'>Front</div>
                                <div className='document-front' >
                                    <img src={addImageLogo} alt="upload" width="60px"></img>
                                    <h3 className='mar'>Drop your image here,or Browse</h3>
                                    <span className='mar'>Only .jpg or .png files,500kb max file size</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={hiddenFrontFileInput}
                                onChange={handleChangeFront}
                                style={{ display: 'none' }}
                            />
                            <div className='hun' onClick={handleClickBack}>
                                <div className='hun-text'>Back</div>
                                <div className='document-back'>
                                    <img src={addImageLogo} alt="upload" width="60px"></img>
                                    <h3 className='mar'>Drop your image here,or Browse</h3>
                                    <span className='mar'>Only .jpg or .png files,500kb max file size</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={hiddenBackFileInput}
                                onChange={handleChangeBack}
                                style={{ display: 'none' }}
                            />
                        </div>
                        {error?<div className="document-error">{error}</div>:<div className="document-no-error"></div>}
                        <div className="buttons">
                            <button className="btn-pre" >Previous</button>
                            <button className={error!==null ? "btn-dis" : "btn-en"} disabled={checkboxToggle} >Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Documents;