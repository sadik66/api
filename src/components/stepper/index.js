import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import check from "../../assets/Check.png"

import "./stepper.css"

const Stepper = () => {
    let classes = {
        one: 'sub-empty-div',
        two: "sub-empty-div ",
        three: "sub-empty-div",
        four: "sub-empty-div ",
        five: "sub-empty-div ",
        six: "sub-empty-div ",
        seven: "sub-empty-div ",
    }
    const [allClasses, setAllClasses] = useState(classes)
    useEffect(() => {
        setAllClasses({ ...classes, two: "sub-empty-div active" })
    }, [])
    useEffect(()=>{
        console.log(allClasses)
    },[allClasses])
    
    const history = useHistory()
    const handleClick = (event, value) => {
        console.log(event)
        if (value === 1) {
            let temp={ ...classes, one: "sub-empty-div active" }
            setAllClasses(temp)
        } 
        else if (value === 2) {
            setAllClasses({ ...classes, two: "sub-empty-div active" })
          
            history.push("/personaldetails")
        }
         else if (value === 3) {
            setAllClasses({ ...classes, three: "sub-empty-div active" })
        } 
        else if (value === 4) {
            let temp={ ...classes, four: "sub-empty-div active" }
            setAllClasses(temp)
                history.push('/documents')
        }
         else if (value === 5) {
            setAllClasses({ ...classes, five: "sub-empty-div active" })
        } 
        else if (value === 6) {
            setAllClasses({ ...classes, six: "sub-empty-div active" })
        }
        else if (value === 7) {
            setAllClasses({ ...classes, seven: "sub-empty-div active" })
        }
    }
    return (
        <div className='stepper-container'>
            <div className='stepper-main-div'>
                <div className="loan-info">
                    <div className='one one-active'><img src={check} alt="check" /></div>
                    <div className='two two-active' onClick={(e) => { handleClick(e, 1) }}>Loan Info</div>
                </div>
                <div className="loan-info">
                    <div className='one one-active '>2</div>
                    <div className='two two-active ' onClick={(e) => { handleClick(e, 2) }} >Personal Info</div>
                </div>
                <div className="loan-info">
                    <div className='one '>3</div>
                    <div className='two ' onClick={(e) => { handleClick(e, 3) }}>Address</div>
                </div>
                <div className="loan-info">
                    <div className='one '>4</div>
                    <div className='two ' onClick={(e) => { handleClick(e, 4) }}>Documents</div>
                </div>
                <div className="loan-info">
                    <div className='one'>5</div>
                    <div className='two ' onClick={(e) => { handleClick(e, 5) }}>Summary</div>
                </div>
                <div className="loan-info">
                    <div className='one'>6</div>
                    <div className='two ' onClick={(e) => { handleClick(e, 6) }}>Mandate</div>
                </div>
                <div className="loan-info">
                    <div className='one'>7</div>
                    <div className='two ' onClick={(e) => { handleClick(e, 7) }}>Esign</div>
                </div>
            </div>
            <div className='main-empty-div'>
                <div className='empty-div'>
                    <div className={`${allClasses.one}`} ></div>
                    <div className={`${allClasses.two}`} ></div>
                    <div className={`${allClasses.three}`} ></div>
                    <div className={`${allClasses.four} `}></div>
                    <div className={`${allClasses.five}`}></div>
                    <div className={`${allClasses.six}`}></div>
                    <div className={`${allClasses.seven}`}></div>
                </div>
            </div>
        </div>
    );
};
export default Stepper;