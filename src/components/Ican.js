import { dbService, storageService } from "myBase";
import React, { useState, useEffect } from "react";
import LookJson from "components/LookJson";
import Home from "routes/Home";

const Ican = ({ IcanObj, Index }) => {



    return (
        <div >
            <h2 className="siteName">{IcanObj.id}</h2>
        </div>
    )
}

export default Ican;