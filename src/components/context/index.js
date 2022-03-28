import React,{createContext,useState} from "react";

export let Mycontext=createContext()

export default function Context(props) {
  const [title,setTitle]=useState("Personal Info")
  const [stepperTitle,setStepperTitle]=useState("")
  const [count,setCount]=useState(2)
  const [percentage,setPercentage]=useState("25%")
  return (
    <Mycontext.Provider value={{title,setTitle,count,setCount,percentage,setPercentage,stepperTitle,setStepperTitle}}>
        {props.children}
    </Mycontext.Provider>
  );
}
