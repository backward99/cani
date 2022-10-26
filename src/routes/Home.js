import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect } from "react";
import "style.css";
import HelpBt from "components/HelpBt";
import Modal from "components/Modal";


const Home = ({ UserObj }) => {
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);

    useEffect(() => {
        //collectrion : 지정된 경로의 컬렉션을 참조 하는 인스턴스를 가져 오는 기능
        //onSnapshot : 실시간으로 DB를 가져오는기능
        dbService.collection("url_scan_rt").onSnapshot((snapshot) => {
            const icanArray = snapshot.docs.map((doc) => ({
                //
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(icanArray);
        });
    }, [])

    const onClickJson = (event) => {
        setJson([]);
        if (event.target.tagName !== "BUTTON") return;

        try {
            if (Texts[+event.target.dataset.number].data !== "undefined" && Texts[+event.target.dataset.number].data !== undefined) {
                const readJson = Object.entries(Texts[+event.target.dataset.number].data.attributes.last_analysis_results);
                readJson.sort();
                setJson(readJson);
            }

        } catch (error) {
            const readJson = Object.entries(Texts[+event.target.dataset.number].error);
            readJson.sort();
            setJson(readJson);

        }
    }
    const toggleJson = () => {
        setUploading((prev) => !prev);
    }

    return (
        <div className="home">
            <HelpBt start={0} />
            <div onClick={onClickJson}>
                {Texts && Texts.map((ican, index) => (
                    <div className="divSiteName" key={index}>
                        <Ican
                            key={ican.id}
                            IcanObj={ican}
                        />
                        <button className="btSiteName" data-number={index} onClick={toggleJson}>View Result</button>
                    </div>
                ))}
            </div>
            {Uploading ?
                <Modal toggle={setUploading}>
                    <div className={"tlstprud" + (Json.length === 0 ? " blank" : "")} >
                        <div className="outGrid">
                            {Json.length === 0 ?
                                <div className="noDetect">Sites that have been prevented from being detected</div> :
                                <>{Json && (
                                    <>
                                        {Json.map((json) => (
                                            <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                        ))}
                                    </>
                                )}</>}
                        </div>
                    </div>
                </Modal>
                : <></>
            }
        </div>
    )
}

export default Home;
