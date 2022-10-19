import React from "react"
import LookJson2 from "components/LookJson2";

const LookJson = ({ jsonObjKey, jsonObjValue, isYara }) => {
    jsonObjValue.sort();
    return (
        <>
            <div className="grid" >
                {jsonObjKey && <h4 className="item title prevent-overflow"> {jsonObjKey} </h4>}
                {jsonObjValue && jsonObjValue.map((jsonObj, index) => (
                    <LookJson2 key={index} jsonObj2={jsonObj} />
                ))}
            </div>
        </>
    )
}

export default LookJson;
