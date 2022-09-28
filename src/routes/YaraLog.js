import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect } from "react";
import "style.css";

import LookJson2 from "components/LookJson2";

const YaraLog = ({ UserObj }) => {
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);

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
        if (event.target.tagName !== "BUTTON") return;

        if (Texts[+event.target.dataset.number].id !== "undefined" && Texts[+event.target.dataset.number].id !== undefined) {
            const readJson = Object.entries(Texts[+event.target.dataset.number]);
            setJson(readJson);
            console.log(readJson);
        }

    }
    const toggleJson = () => {
        setUploading((prev) => !prev);

    }
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
            {Uploading ?
                <>
                    {<div className="tlstprud" style={{ position: "fixed", top: 0, right: 0, left: 0, bottom: 0, margin: "auto", width: "70vw", height: "70vh" }}>
                        
                        {Json && (
                            <>
                                {Json.map((json,index) => (
                                    <LookJson2 key={index}  jsonObj2={json} />
                                ))}
                            </>
                        )}
                    </div>}
                </> : <div></div>}
        </div>
    )
}


export default YaraLog;
