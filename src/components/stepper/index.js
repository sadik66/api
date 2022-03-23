import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';

import check from "../../assets/Check.png"

import "./stepper.css"

const Stepper = () => {
    const [one,SetOne]=useState("sub-empty-div");
    const [two,SetTwo]=useState("sub-empty-div active");
    const [three,SetThree]=useState("sub-empty-div");
    const [four,SetFour]=useState("sub-empty-div ");
    const [five,SetFive]=useState("sub-empty-div");
    const [six,SetSix]=useState("sub-empty-div");
    const [seven,SetSeven]=useState("sub-empty-div");

    const history=useHistory()
    const handleClick =(e,value)=>{
        e.preventDefault();
        console.log(e)
        if(value===1){
            console.log(value)
            SetTwo("sub-empty-div")
            SetOne("sub-empty-div active")
            SetThree("sub-empty-div")
            SetFour("sub-empty-div")
            SetFive("sub-empty-div")
            SetSix("sub-empty-div")
            SetSeven("sub-empty-div")
        }else if(value===2){
            SetTwo("sub-empty-div active")
            SetOne("sub-empty-div")
            SetThree("sub-empty-div")
            SetFour("sub-empty-div")
            SetFive("sub-empty-div")
            SetSix("sub-empty-div")
            SetSeven("sub-empty-div")
            history.push("/personaldetails")
        }else if(value===4){
            console.log(value)
            SetFour("sub-empty-div active")
            SetTwo("sub-empty-div ")
            SetOne("sub-empty-div")
            SetThree("sub-empty-div")
            SetFive("sub-empty-div")
            SetSix("sub-empty-div")
            SetSeven("sub-empty-div")
           history.push('/documents')
        }else if(value===3){
            SetTwo("sub-empty-div ")
            SetOne("sub-empty-div ")
            SetThree("sub-empty-div active")
            SetFour("sub-empty-div")
            SetFive("sub-empty-div")
            SetSix("sub-empty-div")
            SetSeven("sub-empty-div")

        }else if(value===5){
            SetFive("sub-empty-div active")
            SetTwo("sub-empty-div ")
            SetOne("sub-empty-div ")
            SetThree("sub-empty-div ")
            SetFour("sub-empty-div")
            SetSix("sub-empty-div")
            SetSeven("sub-empty-div")

        }else if(value===6){
            SetTwo("sub-empty-div ")
            SetOne("sub-empty-div ")
            SetThree("sub-empty-div ")
            SetFour("sub-empty-div")
            SetFive("sub-empty-div ")
            SetSix("sub-empty-div active")
            SetSeven("sub-empty-div")
        }
        else if(value===7){
            SetTwo("sub-empty-div ")
            SetOne("sub-empty-div ")
            SetThree("sub-empty-div ")
            SetFour("sub-empty-div")
            SetFive("sub-empty-div ")
            SetSix("sub-empty-div ")
            SetSeven("sub-empty-div active")
        }
    }
    return (
        <div className='stepper-container'>
            <div className='stepper-main-div'>
                <div className="loan-info">
                    <div className='one one-active'><img src={check} alt="check"/></div>
                    <div className='two two-active' onClick={(e)=>{handleClick(e,1)}}>Loan Info</div>
                </div>
                <div className="loan-info">
                    <div className='one one-active '>2</div>
                    <div className='two two-active ' onClick={(e)=>{handleClick(e,2)}} >Personal Info</div>
                </div>
                <div className="loan-info">
                    <div className='one '>3</div>
                    <div className='two ' onClick={(e)=>{handleClick(e,3)}}>Address</div>
                </div>
                <div className="loan-info">
                    <div className='one '>4</div>
                    <div className='two 'onClick={(e)=>{handleClick(e,4)}}>Documents</div>
                </div>
                <div className="loan-info">
                    <div className='one'>5</div>
                    <div className='two ' onClick={(e)=>{handleClick(e,5)}}>Summary</div>
                </div>
                <div className="loan-info">
                    <div className='one'>6</div>
                    <div className='two ' onClick={(e)=>{handleClick(e,6)}}>Mandate</div>
                </div>
                <div className="loan-info">
                    <div className='one'>7</div>
                    <div className='two ' onClick={(e)=>{handleClick(e,7)}}>Esign</div>
                </div>
            </div>
            <div className='main-empty-div'>
                <div className='empty-div'>
                    <div className= {`${one}`} ></div>
                    <div className= {`${two}`} ></div>
                    <div className= {`${three}`} ></div>
                    <div className= {`${four} `}></div>
                    <div className={`${five}`}></div>
                    <div className={`${six}`}></div>
                    <div className={`${seven}`}></div>
                </div>
            </div>
        </div>
    );
};
export default Stepper;