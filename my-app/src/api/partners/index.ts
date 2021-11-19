import { Partner } from "../../interfaces/partner";
import axios from "axios";
import { rejects } from "assert";

class PartnersApi{
    static search = (searchTerm: string) =>{
        return new Promise<Partner>((resolve,rejects)=>{
            axios.get("/partners?searchTerm="+searchTerm,{
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