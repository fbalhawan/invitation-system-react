import React, { useState, useMemo, useEffect } from "react";
import "./index.css";
import PartnersApi from "../../api/partners";
import { Partner } from "../../interfaces/partner";
const Homepage: React.FC = () => {

    const getPartners = ()=>{
        PartnersApi.search("").then((response)=>{
            console.log("Response",response);
        });
    }

    useEffect(() => {
        getPartners();
      }, []);
      
    return(
        <>
            <h1>Testing app</h1>
        </>
    );
}

export default Homepage;