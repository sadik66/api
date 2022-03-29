import React from "react"

import "./radioInput.css"

const RaadioInput = ({ handleChange, fieldDisplayName, fieldName, mandatory, options }) => {
    return (
        <div className='document-radio-type' >
            <div className='document-type'>
                <b>{fieldDisplayName}<span className='mandatory-section'>{mandatory ? "*" : ""}</span></b>
            </div>
            <div className='document-radio-type'>
                {
                    options.map((option) => {
                        return (
                            <label className="radio-container" key={option.value}>
                                <input type="radio" name="radio" value={option.value} onChange={handleChange}/>{option.display}
                                    <span className="checkmark"></span>
                            </label>
                        )
                })
                }
            </div>
        </div>
    )
}
export default RaadioInput;