import React, { useState, useEffect } from "react"
import LookJson from "./LookJson";


const LookYara2 = ({ jsonObj3 }) => {

    const [Yara, setYara] = useState([]);

    //오브젝트 형식만 담아놓을 곳
    const [Yara2, setYara2] = useState([]);
    //스트링 형식만 담아 놓을 곳
    const [Yara3, setYara3] = useState([]);


    useEffect(() => {
        const readJson2 = Object.values(jsonObj3);
        const readJson3 = Object.entries(readJson2[1]);
        readJson3.map((rJson2) => {
            if (rJson2[1].constructor !== Object) {
                setYara2(readJson3.filter(student => student[0] !== rJson2[0]));
                setYara3(Object.values(rJson2));
            }

        });
    }, [])
    console.log(Yara2);
    return (
        <>
            {Yara2.length !== 0 ?
                <>
                    {Yara3.length !== 0 ?
                        <>
                            <div className="stGrid">
                                <h5 className="item">{Yara3[0]} </h5>
                                <div className="item">{Yara3[1]}</div>
                            </div>
                        </>
                        :
                        <div></div>
                    }
                    {Yara2.map((json, index) => (
                        <LookJson key={index} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                    ))}
                </>
                :
                <>

                    <div>{Yara[0]}</div>
                    {Yara.map((json, index) => (
                        <LookJson key={json[0]} jsonObjKey={json[1][index]} jsonObjValue={Object.entries(json[1])} isYara={Yara3} />
                    ))}

                </>
            }
        </>
    )
}

export default LookYara2;
