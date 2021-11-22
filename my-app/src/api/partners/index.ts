import { Partner } from "../../interfaces/partner";
import axios, { AxiosResponse } from "axios";
import { rejects } from "assert";

class PartnersApi{
    static search = (term: string, range: number) =>{
        return new Promise<AxiosResponse>((resolve,rejects)=>{
            axios.get("/partners",{
                params:{
                    term: term,
                    range: range
                },
                baseURL:"http://localhost:8000/api",
                headers:{
                    "Content-Type": "application/json"
                }
            }).then((response: any)=>{
                resolve(response);
            }).catch((error)=>{
                console.log(error);
            })
        });

    }
}

export default PartnersApi