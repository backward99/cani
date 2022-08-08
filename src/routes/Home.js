import Ican from "components/Ican";
import LookJson from "components/LookJson";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "myBase";
import React, { useState, useEffect, useRef } from "react";

const Home = ({ UserObj }) => {
    const [Text, setText] = useState("");
    const [Texts, setTexts] = useState([]);
    const [Json, setJson] = useState([]);
    const [Uploading, setUploading] = useState(false);
    const [Ref, setRef] = useState("");
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
            text: Text,
            createdAt: Date.now(),
            creatorId: UserObj.uid,
            ref: urlRef,
        }
        await dbService.collection("ican").add(ican);
        setText("");
        setRef("");
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setText(value);
        toggleJson();

    }

    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        const readerRef = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { target: { result } } = finishedEvent;
            const readJson = Object.values(JSON.parse(result).data.attributes.last_analysis_results);
            setJson(readJson);
        }
        reader.readAsText(theFile);

        readerRef.onloadend = (finishedEvent) => {
            const { target: { result } } = finishedEvent;
            setRef(result);
        }
        readerRef.readAsDataURL(theFile);

    }
    const toggleJson = () => {
        setUploading((prev) => !prev);
    }
    const fileInput = useRef();
    const onClearJson = () => {
        setJson([]);
        fileInput.current.value = null;
    }
    return (
        <div>

            <form onSubmit={onSubmit}>
                <input value={Text} onChange={onChange} type="text" placeholder="What" maxLength={120} />
                <input type="file" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="ican" />
            </form>
            <div>
                {Texts && Texts.map((ican) => (

                    <Ican
                        key={ican.id}
                        IcanObj={ican}
                        isOwner={ican.creatorId === UserObj.uid}
                    />
                ))}
            </div>
            <div>
                {Uploading ? (<>
                    <button onClick={toggleJson}>Hide Json</button>
                    {Json && (
                        <>
                            <button onClick={onClearJson}>Clear</button>
                            {Json.map((json) => (
                                <LookJson key={json.engine_name} jsonObj={json} />
                            ))}
                        </>
                    )}
                </>) : <button onClick={toggleJson}>View Json</button>}
            </div>
        </div>
    )
}


export default Home;
