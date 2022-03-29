import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Mycontext } from '../context';

import "./stepper.css"

import check from "../../assets/Check.png"

const Stepper = () => {
    const {  setCount, setTitle,setPercentage ,stepperTitle} = useContext(Mycontext)
    let classes = {
        one: 'sub-empty-div',
        personal_kyc: "sub-empty-div-two",
        three: "sub-empty-div",
        documents: "sub-empty-div-four ",
        five: "sub-empty-div ",
        six: "sub-empty-div ",
        seven: "sub-empty-div ",
    }
    let circleClasses = {
        one: 'circle-red',
        personal_kyc: "circle-red ",
        three: "circle-red",
        documents: "circle-red ",
        five: "circle-red ",
        six: "circle-red ",
        seven: "circle-red ",
    }
    let titleClasses = {
        one: 'title-red',
        personal_kyc: "title-red ",
        three: "title-red",
        documents: "title-red ",
        five: "title-red ",
        six: "title-red ",
        seven: "title-red",
    }
    const [allClasses, setAllClasses] = useState(classes);
    const [allCircleClasses, setAllCircleClasses] = useState(circleClasses);
    const [allTitleClasses, setAllTitleClasses] = useState(titleClasses)
    const [targetvalue, setTargetValue] = useState(0)

    useEffect(() => {
        setAllClasses({ ...classes, documents: "sub-empty-div-two active" })
        setAllCircleClasses({ ...circleClasses, personal_kyc: " one-active", one: " one-active" })
        setAllTitleClasses({ ...titleClasses, personal_kyc: " two-active", one: "two-active" })
    }, [stepperTitle])
    useEffect(() => {
        setAllClasses({ ...classes, personal_kyc: "sub-empty-div-two active" })
        setAllCircleClasses({ ...circleClasses, personal_kyc: " one-active", one: " one-active" })
        setAllTitleClasses({ ...titleClasses, personal_kyc: " two-active", one: "two-active" })
    }, [])
    const history = useHistory()
    const handleClick = (event, value) => {
        setTargetValue(value)
        if (value === 2) {
            setCount(value)
            setPercentage("25%")
            setTitle("Personal Info")
            setAllClasses({ ...classes, personal_kyc: "sub-empty-div-two active" })
            history.push('/personaldetails')
            setAllCircleClasses({ ...circleClasses, personal_kyc: "one-active", one: " one-active" })
            setAllTitleClasses({ ...titleClasses, personal_kyc: " two-active", one: "two-active" })

        }
        else if (value === 4) {
            setCount(value)
            setPercentage("60%")
            setTitle("Documents")
            setAllCircleClasses({ ...allCircleClasses, documents: "one-active", three: 'one-active' })
            setAllTitleClasses({ ...allTitleClasses, documents: "two-active", three: "two-active" })
            setAllClasses({ ...classes, documents: "sub-empty-div-four active" })
            history.push('/documents')
        }

    }
    return (

        <div className='stepper-container'>
            <div className='stepper-main-div'>
                <div className="loan-info">
                    <div className={`${allCircleClasses.one}`}><img src={check} alt="check" /></div>
                    <div className={`${allTitleClasses.one}`} onClick={(e) => { handleClick(e, 1) }}>Loan Info</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.personal_kyc}`}>{targetvalue === 4 ? <img src={check} alt="check" /> : 2}</div>
                    <div className={`${allTitleClasses.personal_kyc}`} onClick={(e) => { handleClick(e, 2) }} >Personal Info</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.three}`}>{targetvalue === 4 ? <img src={check} alt="check" /> : 3}</div>
                    <div className={`${allTitleClasses.three}`} onClick={(e) => { handleClick(e, 3) }}>Address</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.documents}`}>4</div>
                    <div className={`${allTitleClasses.documents}`} onClick={(e) => { handleClick(e, 4) }}>Documents</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.five}`}>5</div>
                    <div className={`${allTitleClasses.five}`} onClick={(e) => { handleClick(e, 5) }}>Summary</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.six}`}>6</div>
                    <div className={`${allTitleClasses.six}`} onClick={(e) => { handleClick(e, 6) }}>Mandate</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.seven}`}>7</div>
                    <div className={`${allTitleClasses.seven}`} onClick={(e) => { handleClick(e, 7) }}>Esign</div>
                </div>
            </div>
            <div className='main-empty-div'>
                <div className={`${allClasses.one} first-div`} ></div>
                <div className={`${allClasses.personal_kyc} second-div`}></div>
                <div className={`${allClasses.three} third-div`} ></div>
                <div className={`${allClasses.documents} four-div`}></div>
                <div className={`${allClasses.five} fifth-div`}></div>
                <div className={`${allClasses.six} six-div`} ></div>
                <div className={`${allClasses.seven} seventh-div`}></div>
            </div>
        </div>

    );
};
export default Stepper;