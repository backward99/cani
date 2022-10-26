import React from "react"

const LookJson = ({ jsonObj2 }) => {
    return (
        <>
            <div className="item formName">{jsonObj2[0]}</div>
            <div className="item prevent-overflow"> {jsonObj2[1] === null ? "Null" : jsonObj2[1]}</div>
        </>
    )
}

export default LookJson;
