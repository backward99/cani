import React from "react";

const Modal = ({ children, toggle }) => {

    const toggleJson = () => {
        toggle((prev) => !prev);
    }
    return (
        <>
            <div className="modal">
                <button onClick={toggleJson} className="btModal"><h1>X</h1></button>
                {children}
            </div>
        </>
    )
}

export default Modal;
