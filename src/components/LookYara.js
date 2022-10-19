import React from "react"

const LookYara = ({jsonObj2}) => {
 return (
    <>
                        <div className="Yara">
                            <h4 className="item prevent-overflow">{jsonObj2[0]} </h4> 
                            <div className="item">{jsonObj2[1]}</div>
                        </div>
                    </>
 )
}

export default LookYara;
