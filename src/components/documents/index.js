import React, { useState, useRef, useEffect,useContext } from 'react';
import { toast } from "react-toastify"

import imageCompression from "browser-image-compression"

import RadioInput from '../radioInput';

import "./document.css"

import image from "../../assets/Image.svg"
import { Mycontext } from '../context';

import { getCookie } from '../../utils/cookie-helper';
import { ACTIVE_KYC_ID, KYC_ACCESS_TOKEN } from '../../constants';
import { getKycDefination, uploadKyc, submitKyc } from '../../services/kyc-service';

const Documents = () => {
    const {setStepperTitle}=useContext(Mycontext)

    const hiddenFrontFileInput = useRef(null);
    const hiddenBackFileInput = useRef(null);
    const hiddenSelfieFileInput = useRef(null);

    const [checkboxToggle, setCheckboxToggle] = useState(true)
    const [error, setError] = useState("")

    const [documentVersion, setDocumentVersion] = useState("")
    const [title, setTitle] = useState("")
    const [Documents, setDocuments] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState({ is_fast_forward_allowed: false, declare_additional_info: false });
    //const [documentOptions,setDocumentOptions]=useState()
    const [frontFileTypes, setfrontFileTypes] = useState([]);
    const [backFileTypes, setBackFileTypes] = useState([]);
    const [selfieFileTypes, setSelfieFileTypes] = useState([]);

    const [frontName, setFrontName] = useState('');
    const [backName, setBackName] = useState('');
    const [selfieName, setSelfieName] = useState('');

    const [documentType, setDocumentType] = useState('');
    const [frontFileName, setFrontFileName] = useState("")
    const [backFileName, setBackFileName] = useState("")
    const [selfieFileName, setSelfieFileName] = useState("")

    const [frontExtension, setFrontExtension] = useState('')
    const [backExtension, setBackExtension] = useState('')
    const [selfieExtension, setSelfieExtension] = useState('')

    const [showFileError, setShowFileError] = useState({})

    const params = {
        id: ACTIVE_KYC_ID,
    }

    useEffect(() => {
        fetchPersonalDocuments();
    }, [])
     useEffect(() => {
        setStepperTitle("documents")
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

    const handleAdditionalInfoChange = (e) => {

        const { name, checked } = e.target;
        setAdditionalInfo({ ...additionalInfo, [name]: checked })
    }
    const handleChangeFront = async (event) => {
        let compressedFile;
        let newFrontFile;
        const file = event.target.files[0];
        const fileName = file.name;
        setFrontName(fileName)
        const fileSize = file.size
        const fileNameExtension = file.name.split('.').pop()
        setFrontExtension(fileNameExtension)
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
            if (status === 200 && data.data) {
                setFrontFileName(data.data.fileName)
            }
        }
    };

    const handleChangeBack = async (event) => {
        let compressedFile;
        let newBackFile;
        const file = event.target.files[0];
        const fileName = file.name;
        setBackName(fileName)

        const fileSize = file.size
        const fileNameExtension = file.name.split('.').pop();
        setBackExtension(fileNameExtension)
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

        const { status, data, error } = await uploadKyc(backImageData)
        if (error) {
            console.log(error)
        }
        else {
            if (status === 200 && data.data) {
                setBackFileName(data.data.fileName)
            }
        }

    };

    const handleChangeSelfie = async (event) => {
        let compressedFile;
        let newSelfieFile;
        const file = event.target.files[0];
        const fileName = file.name;
        setSelfieName(fileName)
        const fileSize = file.size
        const fileNameExtension = file.name.split('.').pop();
        setSelfieExtension(fileNameExtension)
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

        const { status, data, error } = await uploadKyc(selfieImageData)
        if (error) {
            console.log(error)
        }
        else {
            if (status === 200 && data.data) {
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

    const checkMandatory = (fieldName) => {
        let Mandate = Documents.find((doc) => doc.fieldName === fieldName)
        return Mandate.mandatory
    }

    const nextPage = () => {
        if (checkMandatory("document_type") && !documentType) {
            setShowFileError({
                ...showFileError,
                type: true,
                message: "please select document type"
            })
        } else if (checkMandatory("document_front") && !frontFileName) {
            setShowFileError({
                ...showFileError,
                front: true,
                message: "please upload front image"
            })
        } else if (checkMandatory("document_front") && !frontFileTypes.includes(frontExtension)) {
            setShowFileError({
                ...showFileError,
                front: true,
                message: " front image extension with .png , .pdf or .jpeg"
            })
        } else if (checkMandatory("document_back") && !backFileName) {
            setShowFileError({
                ...showFileError,
                back: true,
                message: "please upload back image"
            })
        } else if (checkMandatory("document_back") && !backFileTypes.includes(backExtension)) {
            setShowFileError({
                ...showFileError,
                back: true,
                message: " back image extension with .png , .pdf or .jpeg"
            })
        } else if (checkMandatory("document_back") && frontName && backName && frontName === backName) {
            setShowFileError({
                ...showFileError,
                frontback: true,
                message: " choose different back image"
            })
        } else if (checkMandatory("selfie") && !selfieFileName) {
            setShowFileError({
                ...showFileError,
                selfie: true,
                message: "please upload selfie image"
            })
        } else if (checkMandatory("document_back") && !selfieFileTypes.includes(selfieExtension)) {
            setShowFileError({
                ...showFileError,
                back: true,
                message: " selfie image extension with .png , .pdf or .jpeg"
            })
        } else if (checkMandatory("selfie") && backName && selfieName && selfieName === backName) {
            setShowFileError({
                ...showFileError,
                frontback: true,
                message: " choose different selfie image"
            })
        } else if (checkMandatory("declare_additional_info") && !additionalInfo.declare_additional_info) {
            setShowFileError({
                ...showFileError,
                declare_additional_info: true,
                message: "please check the declare additional info"
            })
        } else if (checkMandatory("is_fast_forward_allowed") && !additionalInfo.is_fast_forward_allowed) {
            setShowFileError({
                ...showFileError,
                is_fast_forward_allowed: true,
                message: "please check the fast forward allowed"
            })
        } else {
            setShowFileError({})
            createOrUpdateKyc();

        }
    }

    const createOrUpdateKyc = async () => {
        let Data = {}
        Data["document_type"] = documentType;
        Data["document_front"] = frontFileName;
        Data["document_back"] = backFileName;
        Data["selfie"] = selfieFileName;
        Data["declare_additional_info"] = additionalInfo.declare_additional_info
        Data["is_fast_forward_allowed"] = additionalInfo.is_fast_forward_allowed


        let postData = {
            kycId: ACTIVE_KYC_ID,
            created_by: getCookie("phoneNumber"),
            data: Data,
            version: documentVersion
        }
        const { status, data, error } = await submitKyc(postData);
        if (error) {
            toast.error(error.message)
        } else if (status === 200 && data) {
            console.log("document submit", data)
        }
    }

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
                                        <div key={document.fieldName}>
                                            <RadioInput
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
                                                    {frontFileName === '' ? <div className='document-front' onClick={handleClickFront} >
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
                                                <div className='document-checkbox-type' key={document.fieldName}>
                                                    <div className='document-type'>
                                                        <b>
                                                            <label className="checkbox-container">
                                                                <input type="checkbox"name={document.fieldName} onChange={handleAdditionalInfoChange}/> {document.fieldDisplayName}<span className='mandatory-section'>{document.mandatory ? "*" : ""}</span>
                                                                <span className="checkbox-checkmark"></span>
                                                            </label>
                                                        </b>
                                                    </div>
                                                </div>
                                            );
                                        case "is_fast_forward_allowed":
                                            return (
                                                <div className='document-checkbox-type' key={document.fieldName}>
                                                    <div className='document-type'>
                                                        <b>
                                                            <label className="checkbox-container">
                                                                <input type="checkbox" name={document.fieldName} onChange={handleAdditionalInfoChange}/> {document.fieldDisplayName}<span className='mandatory-section'>{document.mandatory ? "*" : ""}</span>
                                                                <span className="checkbox-checkmark"></span>
                                                            </label>
                                                        </b>
                                                    </div>
                                                </div>
                                            );
                                        default:
                                            break;
                                    }
                                })
                            }
                        </div>
                    </div>
                    {Object.keys(showFileError).length !== 0 ? <div className="document-error">{showFileError.message}</div> : <div className="document-no-error"></div>}
                </div>
            </div>
            <div className="documents-buttons-main-div">
                <div className="documents-buttons">
                    <button className="btn-pre" >Previous</button>
                    <button className={error === null ? "btn-dis" : "btn-en"} disabled={!checkboxToggle} onClick={nextPage}>Continue</button>
                </div>
            </div>
        </div>


    );
};

export default Documents;