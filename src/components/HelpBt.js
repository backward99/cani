import React, { useState, useEffect,useRef } from "react";
import helpImage from "images/help.png";
import url_scan_guide1 from "images/URL_Scan_Guide/url_scan_guide_1.png";
import url_scan_guide2 from "images/URL_Scan_Guide/url_scan_guide_2.jpg";
import url_scan_guide3 from "images/URL_Scan_Guide/url_scan_guide_3.jpg";
import url_scan_guide4 from "images/URL_Scan_Guide/url_scan_guide_4.jpg";
import file_scan_guide1 from "images/File_Scan_Guide/file_scan_guide_1.jpg";
import file_scan_guide2 from "images/File_Scan_Guide/file_scan_guide_2.jpg";
import file_scan_guide3 from "images/File_Scan_Guide/file_scan_guide_3.jpg";
import file_scan_guide4 from "images/File_Scan_Guide/file_scan_guide_4.jpg";
import file_scan_guide5 from "images/File_Scan_Guide/file_scan_guide_5.jpg";
import yara_scan_guide1 from "images/Yara_Scan_Guide/yara_scan_guide_1.jpg";
import yara_scan_guide2 from "images/Yara_Scan_Guide/yara_scan_guide_2.jpg";
import yara_scan_guide3 from "images/Yara_Scan_Guide/yara_scan_guide_3.jpg";
import Modal from "./Modal";



// import urlImage from "images/URL_Scan_Guide";

const HelpBt = ({ start, about }) => {
    const [ViewImg, setViewImg] = useState(false);
    const [CaroNum, setCaroNum] = useState(start);
    const [ScanRt, setScanRt] = useState([]);
    const [TotalCaro, setTotalCaro] = useState(0);

    const aboutRt = () => {
        
    }
    aboutRt();
    

    useEffect(() => {
        if(about === "url"){
            setScanRt([url_scan_guide1,url_scan_guide2,url_scan_guide3,url_scan_guide4]);
            
        }else if (about === "file"){
            setScanRt([file_scan_guide1,file_scan_guide2,file_scan_guide3,file_scan_guide4,file_scan_guide5]);
    
        }else if (about === "yara"){
    
            setScanRt([yara_scan_guide1,yara_scan_guide2,yara_scan_guide3]);
    
        }
        setTotalCaro(ScanRt.length-1);
    }, [ViewImg])
    
    useEffect(() => {
        if (slideRef.current !== null) {
            slideRef.current.style.transition = 'all 0.5s ease-in-out';
            slideRef.current.style.transform = `translateX(-${CaroNum}00%)`;
        }
        
    },[CaroNum, ViewImg]);

    const onClickHelp = () => {
        setViewImg((prev) => !prev);
    }
    const slideRef = useRef(null);
    // const totalCaro = 1;
    
    const onClickMove = (event) => {
        const {
            target: {
                name
            }
        } = event;
        if (name === "lt") {
            if (CaroNum === 0) {
                setCaroNum(TotalCaro);
                return 0;
            }
            setCaroNum(prev => prev - 1);

        } else {
            if (CaroNum >= TotalCaro) {
                setCaroNum(0);
                return 0;
            }
            setCaroNum(prev => prev + 1);

        }
    }
    return (
        <>
      <button onClick={onClickHelp} className="help" >
            <img className="help" alt="help" src={helpImage} />
            </button>
            {ViewImg ? <>
                <button onClick={onClickMove} name="lt" className="btMove btLt">&lt; </button>
                <Modal toggle={setViewImg}>
                <div className="window">
                    <div ref={slideRef} className="imgBox" >
                        {ScanRt.length !== 0 && ScanRt.map((scanRt)=> (
                            <img key={scanRt} className="img" alt="dns" src={scanRt} />

                        )
                        )}
                    </div>
                </div>
                <button onClick={onClickMove} name="gt" className="btMove btGt"> &gt;</button>
                </Modal>

            </> : <></>}  </>
    )
}

export default HelpBt;



