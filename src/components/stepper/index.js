import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Mycontext } from '../context';

import "./stepper.css"

import check from "../../assets/Check.png"

const Stepper = () => {
    const {  setCount, setTitle,setPercentage } = useContext(Mycontext)
    let classes = {
        one: 'sub-empty-div',
        two: "sub-empty-div-two",
        three: "sub-empty-div",
        four: "sub-empty-div-four ",
        five: "sub-empty-div ",
        six: "sub-empty-div ",
        seven: "sub-empty-div ",
    }
    let circleClasses = {
        one: 'circle-red',
        two: "circle-red ",
        three: "circle-red",
        four: "circle-red ",
        five: "circle-red ",
        six: "circle-red ",
        seven: "circle-red ",
    }
    let titleClasses = {
        one: 'title-red',
        two: "title-red ",
        three: "title-red",
        four: "title-red ",
        five: "title-red ",
        six: "title-red ",
        seven: "title-red",
    }
    const [allClasses, setAllClasses] = useState(classes);
    const [allCircleClasses, setAllCircleClasses] = useState(circleClasses);
    const [allTitleClasses, setAllTitleClasses] = useState(titleClasses)
    const [targetvalue, setTargetValue] = useState(0)

    useEffect(() => {
        setAllClasses({ ...classes, two: "sub-empty-div-two active" })
        setAllCircleClasses({ ...circleClasses, two: " one-active", one: " one-active" })
        setAllTitleClasses({ ...titleClasses, two: " two-active", one: "two-active" })
    }, [])

    const history = useHistory()
    const handleClick = (event, value) => {
        setTargetValue(value)
        if (value === 2) {
            setCount(value)
            setPercentage("25%")
            setTitle("Personal Info")
            setAllClasses({ ...classes, two: "sub-empty-div-two active" })
            history.push('/personaldetails')
            setAllCircleClasses({ ...circleClasses, two: "one-active", one: " one-active" })
            setAllTitleClasses({ ...titleClasses, two: " two-active", one: "two-active" })

        }
        else if (value === 4) {
            setCount(value)
            setPercentage("60%")
            setTitle("Documents")
            setAllCircleClasses({ ...allCircleClasses, four: "one-active", three: 'one-active' })
            setAllTitleClasses({ ...allTitleClasses, four: "two-active", three: "two-active" })
            setAllClasses({ ...classes, four: "sub-empty-div-four active" })
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
                    <div className={`${allCircleClasses.two}`}>{targetvalue === 4 ? <img src={check} alt="check" /> : 2}</div>
                    <div className={`${allTitleClasses.two}`} onClick={(e) => { handleClick(e, 2) }} >Personal Info</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.three}`}>{targetvalue === 4 ? <img src={check} alt="check" /> : 3}</div>
                    <div className={`${allTitleClasses.three}`} onClick={(e) => { handleClick(e, 3) }}>Address</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.four}`}>4</div>
                    <div className={`${allTitleClasses.four}`} onClick={(e) => { handleClick(e, 4) }}>Documents</div>
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
                <div className={`${allClasses.one}`} ></div>
                <div className={`${allClasses.two}`} ></div>
                <div className={`${allClasses.three}`} ></div>
                <div className={`${allClasses.four} `}></div>
                <div className={`${allClasses.five}`}></div>
                <div className={`${allClasses.six}`}></div>
                <div className={`${allClasses.seven}`}></div>
            </div>
        </div>

    );
};
export default Stepper;