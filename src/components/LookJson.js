import React from "react"

const LookJson = ({jsonObj}) => {
 return (
    <>
                        <div >
                            <div>category : {jsonObj.category}</div>
                            <div>engine_name : {jsonObj.engine_name}</div>
                            <div>method : {jsonObj.method}</div>
                            <div>result : {jsonObj.result}</div>
                        </div>
                    </>
 )
}

export default LookJson;
