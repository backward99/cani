import React from "react"
import LookJson2 from "components/LookJson2";

const LookJson = ({ jsonObjKey, jsonObjValue }) => {
    return (
        <>
            <div >
                <h3> {jsonObjKey} </h3>
                {jsonObjValue.map((jsonObj, index) => (
                    <LookJson2 key={index} jsonObj2={jsonObj} />
                ))}
                
            </div>
        </>
    )
}

export default LookJson;
