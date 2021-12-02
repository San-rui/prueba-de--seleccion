import { useState } from "react";
import { Data} from "../types";

//ESTE HOOK SE UTILIZA PARA PASAR LOS DATOS DEL ARCHIVO .JSON A JS, LO CUAL NOS PERMITIRA MANIPULARLOS 

const useData = () => {

    const [data, setData] = useState<Data | undefined>()

    const getDataJson=()=>{
        fetch('data/data.json'
        ,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            setData(data)
        });
    }

    const dataPower= data?.power.values
    const powerValuesKw :any= dataPower?.map(item => {
        return {...item}
    });

    const dataTemperature = data?.temperature.values
    const dataTemperatureC:any = dataTemperature?.map(item => {
        return {...item }
    })


    return {getDataJson, powerValuesKw, dataTemperatureC}
}

export { useData }

