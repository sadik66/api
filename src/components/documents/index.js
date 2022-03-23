import React, { useState, useRef, useEffect } from 'react';

import Stepper from '../stepper';

import "./document.css"

import logo from "../../assets/logo.png"
import image from "../../assets/Image.svg"

import { ACTIVE_KYC_ID } from '../../constants';

import { getKycDefination } from '../../services/kyc-service';

const Documents = () => {
    const hiddenFrontFileInput = useRef(null);
    const hiddenBackFileInput = useRef(null);

    const [checkboxToggle, setCheckboxToggle] = useState(true)
    const [frontBack, setFrontBack] = useState({})
    const [error, setError] = useState("")

    /* const [showErrors, setShowErrors] = useState({})
    const [documentVersion, setDocumentVersion] = useState("")
    const [Documents, setDocuments] = useState([]);
    const [documentType, setDocumentType] = useState({});
    const [fieldTypes, setFieldTypes] = useState([])
 */
    let types = ['image/png', 'image/jpeg']
    const params = {
        id: ACTIVE_KYC_ID,
    }
    console.log(frontBack)
    /* useEffect(() => {
        fetchPersonalDocuments();
    }, [])

    const fetchPersonalDocuments = async () => {
        const { data, status, error } = await getKycDefination(params);
        if (error) {
            console.error(error)
        } else {
            if (status === 200 && data) {
                let response = data.data.packagesDTOs;
                let personalDocuments = response.find(obj => obj.packageId === "61e569cf3ff56b6727ac06aa");
                const packageDocuments = personalDocuments.children;
                const packageTitle = personalDocuments.packageTitle;
                const documents = [];
                const showerrors = {};
                let filterpackageDocuments = packageDocuments.filter((s) => {
                    if (s.fieldName === "document_type" || s.fieldName === "document_front" || s.fieldName === "document_back") {
                        return s
                    }
                })
                filterpackageDocuments.map((doc) => {
                    documents.push({
                        fieldName: doc.fieldName,
                        fieldId: doc.fieldId,
                        options: doc.options,
                        multiQuestions: doc.multiQuestions,
                        validation: doc.validation,
                        mandatory: doc.mandatory,
                        editable: doc.editable,
                        fileTypes: doc.fileTypes,
                        fieldDisplayName: doc.fieldDisplayName,
                        type: doc.type,
                    })
                    showerrors[document.fieldName] = false;
                    setFieldTypes(doc.fileTypes)
                })
                setDocumentVersion(data.data.version)
                setShowErrors(showerrors)
                setDocuments(documents)
                //setTitle(packageTitle) 
            }
        }


    } */

   /*  const handleChange = (e) => {
        const { name, value } = e.target;
        setDocumentType({ ...setDocumentType, [name]: value });

    }; */
    const handleChangeFront = event => {
        const fileUploaded1 = event.target.files[0];
        if (fileUploaded1 && types.includes(fileUploaded1.type)) {
            setFrontBack({ ...frontBack, front: fileUploaded1 });
            setError("");
        } else {
            setFrontBack({ ...frontBack, front: null });
            setError("Select valid image type jpeg or png");
        }
        // handleFile(fileUploaded);
    };

    const handleChangeBack = event => {
        const fileUploaded2 = event.target.files[0];
        if (fileUploaded2 && types.includes(fileUploaded2.type)) {
            setFrontBack({ ...frontBack, back: fileUploaded2 });
            setError("");
        } else {
            setFrontBack({ ...frontBack, back: null });
            setError("Select valid image type jpeg or png");
        }
        // handleFile(fileUploaded);
    };

    const handleClickFront = event => {
        hiddenFrontFileInput.current.click();
    };
    const handleClickBack = event => {
        hiddenBackFileInput.current.click();
    };
    return (

        <div className="documents-root-body">
            <div className="nav-bar">
                <div className="nav-child"><img src={logo} alt="logo" /></div>
            </div>

            <div className="body">
                <div className='order-list '>
                    <Stepper></Stepper>
                </div>
                <div className="tog-list">
                    <h2>Documents </h2>
                </div>

                <div className=" documents-container">
                    <div className="documents-sub-container">
                        <div >
                            <h2>Documents</h2>
                        </div>
                        <div className='document-radio-type'>
                            <div className='document-type'>
                                <b>Please Select Any of</b>
                            </div>
                            <div className='document-radio-type'>
                                <span className='main-span'> <input type='radio' name='document-type' value='adhaar-card' /> <span>Adhaar Card</span></span>
                                <span className='main-span'><input type='radio' name='document-type' value='voter-id' /><span>Voter Id</span></span>
                                <span className='main-span'> <input type='radio' name='document-type' value='driving-licence' /><span>Driving Licence</span></span>
                            </div>
                        </div>
                        <div className="documents-upload-div" >
                            <div className='hun' onClick={handleClickFront}>
                                <div className='hun-text'>
                                    <div className='hun-text-child'>Back</div>
                                    <div className='hun-text-child'><span className='hun-text-change'>Change</span></div>
                                </div>
                                <div className='document-front' >
                                    <img src={image} alt="upload" width="60px"></img>
                                    <h3 >Drop your image here,or <span className='span'>Browse</span></h3>
                                    <span className='mar-span'>Only .jpg or .png files,500kb max file size</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={hiddenFrontFileInput}
                                onChange={handleChangeFront}
                                style={{ display: 'none' }}
                            />
                            <div className='hun' onClick={handleClickBack}>
                                <div className='hun-text'>
                                    <div className='hun-text-child'>Back</div>
                                    <div className='hun-text-child'><span className='hun-text-change'>Change</span></div>
                                </div>
                                <div className='document-back'>
                                    <img src={image} alt="upload" width="60px"></img>
                                    <h3 >Drop your image here,or <span className='span'>Browse</span></h3>
                                    <span className='mar-span'>Only .jpg or .png files,500kb max file size</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={hiddenBackFileInput}
                                onChange={handleChangeBack}
                                style={{ display: 'none' }}
                            />
                        </div>
                        {error ? <div className="document-error">{error}</div> : <div className="document-no-error"></div>}

                    </div>

                </div>
                <div className="documents-buttons">
                    <button className="btn-pre" >Previous</button>
                    <button className={error !== null ? "btn-dis" : "btn-en"} disabled={checkboxToggle} >Continue</button>
                </div>
            </div>
        </div>


    );
};

export default Documents;