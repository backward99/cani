import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect } from "react";
import "style.css";


const Profile = ({ UserObj }) => {
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);

    useEffect(() => {
        const col = "url_scan_rt\\"
        dbService.collection("FILE_scan_rt").onSnapshot((snapshot) => {

            const icanArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(icanArray);
            setTexts(icanArray);
        });

    }, [])
    
    const onClickJson = (event) => {
        if (event.target.tagName !== "BUTTON") return;

        if (Texts[+event.target.dataset.number].data[0] !== "undefined" && Texts[+event.target.dataset.number].data[0] !== undefined) {
            const readJson = Object.entries(Texts[+event.target.dataset.number].data.attributes.last_analysis_results);
            setJson(readJson);
        } else if (Texts[+event.target.dataset.number].data.length === 0) {
            setJson([]);
            console.log(Json);
        }
    }
    const toggleJson = () => {
        setUploading((prev) => !prev);
    }
    const onClickModal = () => {
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
                    <div className="modal">
                        <div className="tlstprud">
                            {(Json.length === 0) ?
                                <>
                                    <div className="tlstprud" style={{ background: "#ffffff00" }}>
                                        <button onClick={onClickModal} className="btModal">x</button>
                                    </div>
                                    <div className="noData">탐지되지 않음</div>
                                </>
                                :
                                <>
                                    <button onClick={onClickModal} className="btModal">x</button>
                                    {Json && (
                                        <>
                                            {Json.map((json) => (
                                                <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                            ))}
                                        </>
                                    )}
                                </>}
                        </div>
                    </div>
                </> : <div></div>}
        </div>
    )
}


export default Profile;
