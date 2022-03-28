import React from "react"

import "./radioInput.css"

const RaadioInput = ({ handleChange, fieldDisplayName, fieldName, mandatory,options}) => {
    return (
        <div className='document-radio-type' key={fieldName}>
            <div className='document-type'>
                <b>{fieldDisplayName}<span className='mandatory-section'>{mandatory ? "*" : ""}</span></b>
            </div>
            <div className='document-radio-type'>
                {
                    options.map((option) => {
                        return (
                            <span className='main-span' key={option.value}>
                                <span className='main-span'><input type='radio' name={fieldName }value={option.value} onClick={handleChange} /><span>{option.display}</span></span>
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default RaadioInput;