import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect } from "react";
import "style.css";
import LookYara from "components/LookYara";
import LookJson2 from "components/LookJson2";

const YaraLog = ({ UserObj }) => {
    
    //맨 처음 배열로 받아온 값을 저장하는 곳
    const [Texts, setTexts] = useState([]);

    
    const [Json, setJson] = useState([]);

    //모달 표시
    const [Uploading, setUploading] = useState(false);
    
    //오브젝트 형식을 제외한 것만 담아놓을 곳
    const [RpJson, setRpJson] = useState([]);
    //오보젝트 형식이면 담아놓을 곳
    const [Yara, setYara] = useState([]);

    //오브젝트 형식만 담아놓을 곳
    const [Yara2, setYara2] = useState([]);
    //스트링 형식만 담아 놓을 곳
    const [Yara3, setYara3] = useState([]);

    useEffect(() => {
        const col = "url_scan_rt\\"
        dbService.collection("yara_scan").onSnapshot((snapshot) => {
            const icanArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(icanArray);
        });
    }, [])


    const onClickJson = (event) => {
        setYara([]);
        setYara2([]);
        setYara3([]);
        setRpJson([]);
        if (event.target.tagName !== "BUTTON") return;
        if (Texts[+event.target.dataset.number].id !== "undefined" && Texts[+event.target.dataset.number].id !== undefined) {
            const readJson = Object.entries(Texts[+event.target.dataset.number]);
            setJson(readJson);
            readJson.map((rJson) => {
                if (rJson[1].constructor === Object) {
                    const readJson2 = Object.values(rJson);
                    const readJson3 = Object.entries(readJson2[1]);
                    readJson3.map((rJson2) => {
                        if (rJson2[1].constructor !== Object) {
                            setYara2(readJson3.filter(student => student[0] !== rJson2[0]));
                            setYara3(Object.values(rJson2));
                        }
                    });
                    setYara(prev => [...prev, ...readJson2]);
                    setRpJson(readJson.filter(prev => prev[0] !== rJson[0]));
                }
            })
        }
    }

    const toggleJson = () => {
        setUploading((prev) => !prev);
    }

    console.log(Yara2);
    return (
        <div className="home">
            <div onClick={onClickJson}>
                {Texts && Texts.map((ican, index) => (
                    <div className="divSiteName" key={index}>
                        <Ican
                            key={ican.id}
                            IcanObj={ican}
                            Index={index}
                        />
                        <button className="btSiteName" data-number={index} onClick={toggleJson}>View Json</button>
                    </div>
                ))}
            </div>
            {/* {Yara3.length=== "0"  ? <div></div>  :<div>{Yara3[0][1]} : {Yara3[1][1]}</div>} */}
            {Uploading ?
                <>
                    {RpJson.length !== 0 ? <>
                        <div className="modal">
                        <button onClick={toggleJson} className="btModal"><h1>X</h1></button>

                            <div className="tlstprud">
                                
                                {RpJson.map((json, index) => (
                                    <LookYara key={index} jsonObj2={json} />
                                ))}

                                
                                {Yara && Yara.length !== 0 ?
                                    <>
                                        {Yara2 && Yara2.length !== 0 ?
                                            <>
                                                <div className="stGrid">
                                                <h4 className="item">{Yara[0]}</h4>
                                                <div className="item">Detect</div>
                                                </div>
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
                                    :
                                    <div></div>
                                }

                            </div>
                        </div>
                    </>
                        : <>
                            <div className="modal">
                    <button onClick={toggleJson} className="btModal"><h1>X</h1></button>

                                <div className="tlstprud">
                                    
                                    {Json &&
                                        <>
                                            {Json.map((json, index) => (
                                                <LookYara key={index} jsonObj2={json} />
                                            ))}
                                        </>
                                    }
                                    
                                </div>
                            </div>
                        </>
                    }
                </> : <div></div>}
        </div>
    )
}

export default YaraLog;
