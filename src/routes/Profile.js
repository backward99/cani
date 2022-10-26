import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect } from "react";
import "style.css";
import HelpBt from "components/HelpBt";
import Modal from "components/Modal";


const Profile = ({ UserObj }) => {
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);

    useEffect(() => {
        dbService.collection("FILE_scan_rt").onSnapshot((snapshot) => {
            const icanArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(icanArray);
        });

    }, [])
    // console.log(Texts[4].data[0]);
    const onClickJson = (event) => {
        if (event.target.tagName !== "BUTTON") return;
        if (Texts[+event.target.dataset.number].data[0] !== "undefined" && Texts[+event.target.dataset.number].data[0] !== undefined) {
            const readJson = Object.entries(Texts[+event.target.dataset.number].data[0].attributes.last_analysis_results);
            setJson(readJson);
        console.log("실행");
            

        } else if (Texts[+event.target.dataset.number].data.length === 0) {
            setJson([]);
            console.log(Json);
        }
    }
    const toggleJson = () => {
        setUploading((prev) => !prev);
    }

    return (
        <div className="home">
            <HelpBt start={1} />
            <div onClick={onClickJson}>
                {Texts && Texts.map((ican, index) => (
                    <div className="divSiteName" key={index}>
                        <Ican
                            key={ican.id} 
                            IcanObj={ican} 
                            Index={index}/>
                        <button className="btSiteName" data-number={index} onClick={toggleJson}>View Result</button>
                    </div>
                ))}
            </div>
            {Uploading ?
                <Modal toggle={setUploading}>
                    <div className={"tlstprud" + (Json.length === 0 ? " blank" : "")}>

                        {(Json.length === 0) ?
                            <>
                                {/* <button onClick={onClickModal} className="btModal"><h1>X</h1></button> */}

                                <div className="noData">No detected</div>
                            </>
                            :
                            <>
                                <div className="outGrid">
                                    {/* <button onClick={onClickModal} className="btModal"><h1>X</h1></button> */}

                                    {Json && (
                                        <>
                                            {Json.map((json) => (
                                                <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                            ))}
                                        </>
                                    )}
                                </div>
                            </>
                        }

                    </div>
                </Modal>
                :
                <></>}
        </div>
    )
}


export default Profile;
