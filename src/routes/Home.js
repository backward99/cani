import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "myBase";
import React, { useState, useEffect, useRef } from "react";
import "style.css";

const Home = ({ UserObj }) => {
    const [Title, setTitle] = useState("");
    const [Text, setText] = useState("");
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Ref, setRef] = useState("");
    const [Uploading, setUploading] = useState(false);

    useEffect(() => {
        dbService.collection("ican").orderBy("createdAt", "desc").onSnapshot((snapshot) => {

            const icanArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(icanArray);
        });

    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        let urlRef = "";
        if (Ref !== "") {
            const fileRef = storageService.ref().child(`${UserObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(Ref, "data_url");
            // const response = await fileRef.put(Ref);
            urlRef = await response.ref.getDownloadURL();
        }
        const ican = {
            title: Title,
            text: Text,
            createdAt: Date.now(),
            creatorId: UserObj.uid,
            ref: urlRef,
        }
        //이 부분이 올리는 부분인데 문서 아이디는 어떻게 설정했을까
        await dbService.collection("ican").add(ican);
        setText("");
        setRef("");
    }

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "title") {
            setTitle(value);
        } else if (name === "text") {
            setText(value);
        }
    }

    // const onFileChange = (event) => {
    //     const { target: { files }, } = event;
    //     const theFile = files[0];
    //     const reader = new FileReader();
    //     const readerRef = new FileReader();
    //     reader.onloadend = (finishedEvent) => {
    //         const { target: { result } } = finishedEvent;

    //         try {
    //             const readJson = Object.entries(JSON.parse(result).data[0].attributes.last_analysis_results);
    //             setJson(readJson);
    //             console.log(readJson);
    //         } catch (error) {
    //             const readJson = Object.entries(JSON.parse(result).data.attributes.last_analysis_results);
    //             setJson(readJson);
    //             console.log(readJson);
    //         }
    //     }
    //     reader.readAsText(theFile);

    //     readerRef.onloadend = (finishedEvent) => {
    //         const { target: { result } } = finishedEvent;
    //         setRef(result);
    //     }
    //     readerRef.readAsDataURL(theFile);
    //     toggleJson();

    // }
    const onClickJson = (event) => {
        if (event.target.tagName !== "BUTTON") return;

        // console.log(Texts[+event.target.dataset.number]);
        // console.log(target);

        if (Texts[+event.target.dataset.number].data !== "undefined" && Texts[+event.target.dataset.number].data !== undefined) {
            const readJson = Object.entries(Texts[+event.target.dataset.number].data.attribute.last_analysis_results);
            setJson(readJson);
        }

        // if(event.target.dataset.number === "0"){
        //      Object.entries(JSON.parse(result).data[0].attributes.last_analysis_results);
        //         setJson(readJson);
        // }
    }
    const toggleJson = () => {
        setUploading((prev) => !prev);

    }
    const fileInput = useRef();
    // const onClearJson = () => {
    //     setJson([]);
    //     fileInput.current.value = null;
    // }
    return (
        <div className="home">
            {/* <form onSubmit={onSubmit}>
                <label style={{ display: "block" }} htmlFor="title">Site:</label>
                <input id="title" name="title" value={Title} onChange={onChange} type="text" placeholder="Title" maxLength={20} />
                <input name="text" value={Text} onChange={onChange} type="text" placeholder="text" maxLength={120} />
                <label style={{ display: "block" }} htmlFor="text">Text:</label>
                <textarea style={{ display: "block" }} id="text" name="text" value={Text} onChange={onChange} placeholder="text" rows="10" cols="50" />
                <input style={{ display: "block" }} type="file" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="저장하기" />
            </form> */}
            <div onClick={onClickJson}>
                {Texts && Texts.map((ican, index) => (
                    <div key={index}>
                        <Ican
                            key={ican.id}
                            IcanObj={ican}
                            isOwner={ican.creatorId === UserObj.uid}
                            Index={index}
                        />
                        <button data-number={index} onClick={toggleJson}>View Json</button>
                        {/* {Uploading ?
                            <div> 안보여주는 상태</div>
                            :
                            (<>
                                <button data-number={index} onClick={onClickJson}>Hide Json</button>
                                {Json && (
                                    <>
                                        <div>dlqnqnsdla</div>
                                        {Json.map((json) => (
                                            <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                        ))}
                                    </>
                                )}
                            </>)} */}
                        {/* <button type="button" data-number={index}>View JSON</button> */}
                    </div>
                ))}
            </div>
            {/* <div>
                {Uploading ?
                    <button onClick={toggleJson}>View Json</button>
                    :
                    (<>
                        <button onClick={toggleJson}>Hide Json</button>
                        {Json && (
                            <>
                                <div>dlqnqnsdla</div>
                                {Json.map((json) => (
                                    <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                ))}
                            </>
                        )}
                    </>)}
            </div> */}
            {/* <div>
                {Uploading ? (<>
                    <button onClick={toggleJson}>Hide Json</button>
                    {Json && (
                        <>
                            <button onClick={onClearJson}>Clear</button>
                            {Json.map((json) => (
                                <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                            ))}
                        </>
                    )}
                </>) : <button onClick={toggleJson}>View Json</button>}
            </div> */}
            {Uploading ?
                <>
                    {<div className="tlstprud" style={{ position: "fixed", top: 0, right: 0, left: 0, bottom: 0, margin: "auto", width: "50vw", height: "50vh", boxShadow: "2px 2px 10px gray" }}>
                        뭐야 나랑 장난해?
                        {Json && (
                            <>
                                <div>dlqnqnsdla</div>
                                {Json.map((json) => (
                                    <LookJson key={json[1].engine_name} jsonObjKey={json[0]} jsonObjValue={Object.entries(json[1])} />
                                ))}
                            </>
                        )}
                    </div>}
                </> : <div></div>}
        </div>
    )
}


export default Home;
