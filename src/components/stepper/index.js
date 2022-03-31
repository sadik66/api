import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Mycontext } from '../context';

import "./stepper.css"

import check from "../../assets/Check.png"

const Stepper= (props) => {
    const { setCount, setTitle, setPercentage } = useContext(Mycontext)
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

    useEffect(() => {
        if (props.count === 4) {
            setAllCircleClasses({ ...allCircleClasses, one: "one-active", two: 'one-active', four: "one-active", three: 'one-active' })
            setAllTitleClasses({ ...allTitleClasses, one: "two-active", two: "two-active", four: "two-active", three: "two-active" })
            setAllClasses({ ...classes, four: "sub-empty-div-four active" })
        } else if (props.count === 2) {
            setAllCircleClasses({ ...allCircleClasses, one: "one-active", two: 'one-active' })
            setAllTitleClasses({ ...allTitleClasses, one: "two-active", two: "two-active", })
            setAllClasses({ ...classes, two: "sub-empty-div-four active" })
        }


    }, [props.count])

    const history = useHistory()
    const handleClick = (event, value) => {
        if (value === 2) {
            setCount(value)
            setPercentage("25%")
            setTitle("Personal KYC")
            history.push('/personaldetails')
        }
        else if (value === 4) {
            setCount(value)
            setPercentage("60%")
            setTitle("Documents")
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
                    <div className={`${allCircleClasses.two}`}>{props.count === 4 ? <img src={check} alt="check" /> : 2}</div>
                    <div className={`${allTitleClasses.two}`} onClick={(e) => { handleClick(e, 2) }} >Personal Info</div>
                </div>
                <div className="loan-info">
                    <div className={`${allCircleClasses.three}`}>{props.count === 4 ? <img src={check} alt="check" /> : 3}</div>
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
                <div className={`${allClasses.one} first-div`} ></div>
                <div className={`${allClasses.two} second-div`}></div>
                <div className={`${allClasses.three} third-div`} ></div>
                <div className={`${allClasses.four} four-div`}></div>
                <div className={`${allClasses.five} fifth-div`}></div>
                <div className={`${allClasses.six} six-div`} ></div>
                <div className={`${allClasses.seven} seventh-div`}></div>
            </div>
        </div>

    );
};
export default Stepper;