import React from "react"
import LookYara2 from "components/LookJson2";

const LookYara = ({ jsonObjKey, jsonObjValue }) => {
    return (
        <>
            <div >
                {jsonObjKey && <h3> {jsonObjKey} </h3>}
                {jsonObjValue && jsonObjValue.map((jsonObj, index) => (
                    <LookJson2 key={index} jsonObj2={jsonObj} />
                ))}
                
            </div>
        </>
    )
}

export default LookYara;
