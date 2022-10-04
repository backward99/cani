import React from "react"

const LookJson = ({ jsonObj2 }) => {
    return (
        <>
            {/* <div className="item">{jsonObj2[0]}</div>
            <div className="item"> {jsonObj2[1]}</div> */}
            <div>
            {jsonObj2[0]} : {jsonObj2[1]}
            </div>
        </>
    )
}

export default LookJson;
