import React, { useState, useEffect,useRef } from "react";
import logo from "images/dnsLogo.png";
import logo2 from "images/dnsLogo2.png";
import helpImage from "images/help.png"


const HelpBt = ({ start }) => {
    const [ViewImg, setViewImg] = useState(false);
    const [CaroNum, setCaroNum] = useState(start);

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
    const totalCaro = 1;
    
    const onClickMove = (event) => {
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
    return (
        <>
      <button onClick={onClickHelp} className="help" >
            <img className="help" alt="help" src={helpImage} />
            </button>
            {ViewImg ? <>
                <button onClick={onClickMove} name="lt" className="btMove btLt">&lt; </button>
                <div className="window">
                    <div ref={slideRef} className="imgBox" >
                        <img className="img" alt="dns" src={logo} />
                        <img className="img" alt="dns" src={logo2} />
                    </div>
                </div>
                <button onClick={onClickMove} name="gt" className="btMove btGt"> &gt;</button>
            </> : <></>}  </>
    )
}

export default HelpBt;



