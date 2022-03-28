import React, { useState, useRef, useEffect } from 'react';

import imageCompression from "browser-image-compression"

import "./document.css"

import image from "../../assets/Image.svg"

import { ACTIVE_KYC_ID, KYC_ACCESS_TOKEN } from '../../constants';
import { getKycDefination, uploadKyc } from '../../services/kyc-service';
import RaadioInput from '../radioInput';

const Documents = () => {
    const hiddenFrontFileInput = useRef(null);
    const hiddenBackFileInput = useRef(null);
    const hiddenSelfieFileInput = useRef(null);

    const [checkboxToggle, setCheckboxToggle] = useState(true)
    const [error, setError] = useState("")

    const [documentVersion, setDocumentVersion] = useState("")
    const [title, setTitle] = useState("")
    const [Documents, setDocuments] = useState([]);
    const [documentType, setDocumentType] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    //const [documentOptions,setDocumentOptions]=useState()
    const [frontFileTypes, setfrontFileTypes] = useState([]);
    const [backFileTypes, setBackFileTypes] = useState([]);
    const [selfieFileTypes, setSelfieFileTypes] = useState([]);

    const [frontFileName, setFrontFileName] = useState("")
    const [backFileName, setBackFileName] = useState("")
    const [selfieFileName, setSelfieFileName] = useState("")

    const params = {
        id: ACTIVE_KYC_ID,
    }

    useEffect(() => {
        fetchPersonalDocuments();
    }, [])
    const fetchPersonalDocuments = async () => {
        const { data, status, error } = await getKycDefination(params);
        if (error) {
            console.error(error)
        } else {
            if (status === 200 && data) {
                let response = data.data.packagesDTOs;
                let personalDocuments = response.find(obj => obj.id === "61e569cf3ff56b6727ac06aa");
                const packageDocuments = personalDocuments.children;
                const packageTitle = personalDocuments.packageTitle;
                const documents = [];
                let filterpackageDocuments = packageDocuments.filter((s) => {
                    if (s.fieldName !== "time_spent_on_documents") {
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
                    switch (doc.fieldName) {
                        case "document_type":
                            //setDocumentOptions(doc.options)
                            break;
                        case "document_front":
                            let newFrontFileType = doc.fileTypes.map((s) => {
                                return s.split(".").pop();
                            })
                            setfrontFileTypes(newFrontFileType);
                            break;
                        case "document_back":
                            let newBackFileType = doc.fileTypes.map((s) => {
                                return s.split(".").pop();
                            })
                            setBackFileTypes(newBackFileType);
                            break;
                        case "selfie":
                            let newSelfieFileType = doc.fileTypes.map((s) => {
                                return s.split(".").pop();
                            })
                            setSelfieFileTypes(newSelfieFileType);
                            break;
                        default:
                            break;

                    }
                })
                setDocumentVersion(data.data.version)
                setDocuments(documents)
                setTitle(packageTitle)
            }
        }
    }

    const handleChange = (e) => {
        setDocumentType(e.target.value);
    };

    const handleAdditionalInfoChange=(e)=>{
        const {name,value}=e.target;
        setAdditionalInfo({...additionalInfo,[name]:value})
    }

    const handleChangeFront = async (event) => {
        let compressedFile;
        let newFrontFile;
        const file = event.target.files[0];
        const fileName = file.name;
        const fileSize = file.size
        const fileNameExtension = file.name.split('.').pop()
        const options = {
            maxSizeMB: 0.5,
            useWebWorker: true
        }
        if (fileSize > 500000 && frontFileTypes.includes(fileNameExtension)) {
            compressedFile = await imageCompression(file, options)
            newFrontFile = new File([compressedFile], fileName);
        }
        else {
            newFrontFile = file;
        }
        let frontImageData = new FormData();
        frontImageData.append("file", newFrontFile)
        frontImageData.append("kycId", ACTIVE_KYC_ID)
        frontImageData.append("fieldId", "document_front")
        const { status, data, error } = await uploadKyc(frontImageData)
        if (error) {
            console.log(error)
        }
        else {
            if (status === 200 && data) {
                setFrontFileName(data.data.fileName)
            }
        }
    };

    const handleChangeBack = async (event) => {
        let compressedFile;
        let newBackFile;
        const file = event.target.files[0];
        const fileName = file.name;
        const fileSize = file.size
        const fileNameExtension = file.name.split('.').pop()
        const options = {
            maxSizeMB: 0.5,
            useWebWorker: true
        }
        if (fileSize > 500000 && backFileTypes.includes(fileNameExtension)) {
            compressedFile = await imageCompression(file, options)
            newBackFile = new File([compressedFile], fileName);
        }
        else {
            newBackFile = file;
        }
        var backImageData = new FormData();
        backImageData.append("file", newBackFile)
        backImageData.append("kycId", ACTIVE_KYC_ID)
        backImageData.append("fieldId", "document_back")
        console.log(backImageData)

        const { status, data, error } = await uploadKyc(backImageData)
        if (error) {
            console.log(error)
        }
        else {
            if (status === 200 && data) {
                setBackFileName(data.data.fileName)
            }
        }

    };

    const handleChangeSelfie = async (event) => {
        let compressedFile;
        let newSelfieFile;
        const file = event.target.files[0];
        const fileName = file.name;
        const fileSize = file.size
        const fileNameExtension = file.name.split('.').pop()
        const options = {
            maxSizeMB: 0.5,
            useWebWorker: true
        }
        if (fileSize > 500000 && selfieFileTypes.includes(fileNameExtension)) {
            compressedFile = await imageCompression(file, options)
            newSelfieFile = new File([compressedFile], fileName);
        }
        else {
            newSelfieFile = file;
        }
        var selfieImageData = new FormData();
        selfieImageData.append("file", newSelfieFile)
        selfieImageData.append("kycId", ACTIVE_KYC_ID)
        selfieImageData.append("fieldId", "selfie")
        console.log(selfieImageData)

        const { status, data, error } = await uploadKyc(selfieImageData)
        if (error) {
            console.log(error)
        }
        else {
            if (status === 200 && data) {
                setSelfieFileName(data.data.fileName)
            }
        }

    };
    const handleClickFront = event => {
        hiddenFrontFileInput.current.click();
    };
    const handleClickBack = event => {
        hiddenBackFileInput.current.click();
    };
    const handleClickSelfie = event => {
        hiddenSelfieFileInput.current.click();
    };
    return (
        <div className="body">
            <div className=" documents-container">
                <div className="documents-sub-container">
                    <div >
                        <h2>{title}</h2>
                    </div>
                    {
                        Documents && Documents.map((document) => {
                            switch (document.fieldName) {
                                case "document_type":
                                    return (
                                        /*  handleChange, fieldDisplayName, fieldName, mandatory,options */
                                        <div key={document.fieldName}>
                                            <RaadioInput
                                                handleChange={handleChange}
                                                fieldDisplayName={document.fieldDisplayName}
                                                fieldName={document.fieldName}
                                                mandatory={document.mandatory}
                                                options={document.options}
                                            />
                                        </div>
                                    );
                                default:
                                    break;
                            }
                        })
                    }
                    <div className="documents-upload-div" >
                        {
                            Document && Documents.map((document) => {
                                switch (document.fieldName) {
                                    case "document_front":
                                        return (
                                            <div key={document.fieldName}>
                                                <div className='hun' >
                                                    <div className='hun-text'>
                                                        <div className='hun-text-child'>{document.fieldDisplayName}<span className='mandatory-section'>{document.mandatory ? "*" : ""}</span></div>
                                                        <div className='hun-text-child'>{frontFileName ? <span className='hun-text-change' onClick={handleClickFront}>Change</span> : ''}</div>
                                                    </div>
                                                    {frontFileName === '' ? <div className='document-front' onClick={handleClickFront}>
                                                        <img src={image} alt="upload" width="60px"></img>
                                                        <h3 >Drop your image here,or <span className='span'>Browse</span></h3>
                                                        <span className='mar-span'>Only .jpg or .png files,500kb max file size</span>
                                                    </div> :
                                                        <div>
                                                            <img className='image-tag' src={`https://kyc.yabx.co/kyc2/getDocument?fileName=${frontFileName}&Authorization=Bearer${KYC_ACCESS_TOKEN}`} alt="upload" width="364px" height="214px"></img>
                                                        </div>}
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={hiddenFrontFileInput}
                                                    onChange={handleChangeFront}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        )
                                    case "document_back":
                                        return (
                                            <div key={document.fieldName}>
                                                <div className='hun' >
                                                    <div className='hun-text'>
                                                        <div className='hun-text-child'>{document.fieldDisplayName}<span className='mandatory-section'>{document.mandatory ? "*" : ""}</span></div>
                                                        <div className='hun-text-child'>{backFileName !== '' ? <span className='hun-text-change' onClick={handleClickBack}>Change</span> : ''}</div>
                                                    </div>
                                                    {backFileName === '' ? <div className='document-back' onClick={handleClickBack}>
                                                        <img src={image} alt="upload" width="60px"></img>
                                                        <h3 >Drop your image here,or <span className='span'>Browse</span></h3>
                                                        <span className='mar-span'>Only .jpg or .png files,500kb max file size</span>
                                                    </div> :
                                                        <div>
                                                            <img className='image-tag' src={`https://kyc.yabx.co/kyc2/getDocument?fileName=${backFileName}&Authorization=Bearer${KYC_ACCESS_TOKEN}`} alt="upload" width="364px" height="214px"></img>
                                                        </div>}
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={hiddenBackFileInput}
                                                    onChange={handleChangeBack}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        )
                                    default:
                                        break;
                                }
                            })
                        }
                    </div>
                    <div className="documents-upload-div" >
                        {
                            Document && Documents.map((document) => {
                                switch (document.fieldName) {
                                    case "selfie":
                                        return (
                                            <div key={document.fieldName}>
                                                <div className='hun' >
                                                    <div className='hun-text'>
                                                        <div className='hun-text-child'>{document.fieldDisplayName}<span className='mandatory-section'>{document.mandatory ? "*" : ""}</span></div>
                                                        <div className='hun-text-child'>{selfieFileName ? <span className='hun-text-change' onClick={handleClickSelfie}>Change</span> : ''}</div>
                                                    </div>
                                                    {selfieFileName === '' ? <div className='document-front' onClick={handleClickSelfie}>
                                                        <img src={image} alt="upload" width="60px"></img>
                                                        <h3 >Drop your image here,or <span className='span'>Browse</span></h3>
                                                        <span className='mar-span'>Only .jpg or .png files,500kb max file size</span>
                                                    </div> :
                                                        <div>
                                                            <img className='image-tag' src={`https://kyc.yabx.co/kyc2/getDocument?fileName=${selfieFileName}&Authorization=Bearer${KYC_ACCESS_TOKEN}`} alt="upload" width="364px" height="214px"></img>
                                                        </div>}
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={hiddenSelfieFileInput}
                                                    onChange={handleChangeSelfie}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        )
                                    default:
                                        break;
                                }
                            })
                        }
                        <div className='additional-info-div'>
                            {
                                Documents && Documents.map((document) => {
                                    switch (document.fieldName) {
                                        case "declare_additional_info":
                                            return (
                                                <div key={document.fieldName}>
                                                    <RaadioInput
                                                        handleChange={handleAdditionalInfoChange}
                                                        fieldDisplayName={document.fieldDisplayName}
                                                        fieldName={document.fieldName}
                                                        mandatory={document.mandatory}
                                                        options={document.options}
                                                    />
                                                </div>
                                            );
                                        case "is_fast_forward_allowed":
                                            return (
                                                <div key={document.fieldName}>
                                                    <RaadioInput
                                                        handleChange={handleAdditionalInfoChange}
                                                        fieldDisplayName={document.fieldDisplayName}
                                                        fieldName={document.fieldName}
                                                        mandatory={document.mandatory}
                                                        options={document.options}
                                                    />
                                                </div>
                                            );
                                        default:
                                            break;
                                    }
                                })
                            }
                        </div>
                    </div>
                    {error ? <div className="document-error">{error}</div> : <div className="document-no-error"></div>}
                </div>
            </div>
            <div className="documents-buttons-main-div">
                <div className="documents-buttons">
                    <button className="btn-pre" >Previous</button>
                    <button className={error !== null ? "btn-dis" : "btn-en"} disabled={checkboxToggle} >Continue</button>
                </div>
            </div>
        </div>


    );
};

export default Documents;