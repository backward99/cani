import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect } from "react";
import "style.css";

const Home = ({ UserObj }) => {
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);

    useEffect(() => {
        //collectrion : 지정된 경로의 컬렉션을 참조 하는 인스턴스를 가져 오는 기능
        //onSnapshot : 실시간으로 DB를 가져오는기능
        dbService.collection("url_scan_rt\\").onSnapshot((snapshot) => {
            const icanArray = snapshot.docs.map((doc) => ({
                //
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(icanArray);
        });    
    }, [])


    const onClickJson = (event) => {
        if (event.target.tagName !== "BUTTON") return;

        try{
            if (Texts[+event.target.dataset.number].data !== "undefined" && Texts[+event.target.dataset.number].data !== undefined) {
                    const readJson = Object.entries(Texts[+event.target.dataset.number].data.attributes.last_analysis_results);
                    setJson(readJson);
                }
        }catch(error){
            const readJson = Object.entries(Texts[+event.target.dataset.number].error);
            setJson(readJson);
        }

        // if (Texts[+event.target.dataset.number].data !== "undefined" && Texts[+event.target.dataset.number].data !== undefined) {
        //     const readJson = Object.entries(Texts[+event.target.dataset.number].data.attributes.last_analysis_results);
        //     setJson(readJson);
        // } else if(Texts[+event.target.dataset.number].error !== "undefined" && Texts[+event.target.dataset.number].error !== undefined){
        //     const readJson = Object.entries(Texts[+event.target.dataset.number].error);
        //     setJson(readJson);
        // }
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
                        {Json.error !== undefined && Json.error !== "undefined" ? 
                         <div>탐지가 방지된 사이트</div>: <>{Json && (
                            <>
                                {Json.map((json) => (
                                    <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                ))}
                            </>
                        )}</>}
                        
                    </div>}
                </> : <div></div>}
        </div>
    )
}

export default Home;
