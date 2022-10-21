import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { dbService } from "myBase";
import React, { useState, useEffect, useRef } from "react";
import "style.css";
import logo from "images/dnsLogo.png";
import logo2 from "images/dnsLogo2.png";



const Home = ({ UserObj }) => {
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);
    const [ViewImg, setViewImg] = useState(false);

    const [CaroNum, setCaroNum] = useState(0);

    const slideRef = useRef(null);
    const totalCaro = 1;
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

    useEffect(() => {
        if (slideRef.current !== null) {
            slideRef.current.style.transition = 'all 0.5s ease-in-out';
            slideRef.current.style.transform = `translateX(-${CaroNum}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
        }
    }, [CaroNum]);
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

    const onClickModal = () => {
        setUploading((prev) => !prev);
    }

    const onClickHelp = () => {
        setViewImg((prev) => !prev);
        setUploading(false);
    }


    const onClickMove = (event, loc) => {
        const {
            target: {
                name
            }
        } = event;
        if (name === "lt") {
            if (CaroNum === 0) {
                setCaroNum(totalCaro);
                return 0;
            }
            setCaroNum(prev => prev - 1);

        } else {
            if (CaroNum >= totalCaro) {
                setCaroNum(0);
                return 0;
            }
            setCaroNum(prev => prev + 1);

        }
    }
    console.log(CaroNum);
    // const importAll = (f) => {
    //     console.log(f);

    // }
    return (
        <div className="home">
            <button onClick={onClickHelp} className="help"><h1>?</h1></button>
            {/* <button onClick={importAll} className=""><h1>????</h1></button> */}

            {ViewImg ? <>
                {/* <div className="modal window"> */}
                <button onClick={onClickMove} name="lt" className="btMove btLt">&lt; </button>

                <div className="window">
                    {/* <button onClick={onClickHelp} className="btModal"><h1>X</h1></button> */}

                    {/* <div className="imgBox" style={{marginLeft : `-${CaroNum}00%`}}> */}
                    <div ref={slideRef} className="imgBox" >

                        <img className="img" alt="dns" src={logo} />
                        <img className="img" alt="dns" src={logo2} />

                    </div>

                </div>
                <button onClick={onClickMove} name="gt" className="btMove btGt"> &gt;</button>

            </> : <></>}
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
                <>
                    <div className="modal">
                        <button onClick={onClickModal} className="btModal"><h1>X</h1></button>
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
                    </div>
                </> : <div></div>}
        </div>
    )
}

export default Home;
