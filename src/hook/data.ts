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
    //PASAJE DE UNIDAD DE MW A KW
        const newValue= ((Number(item.value))*1000).toString()
    
        return {...item}
    });

    const dataTemperature = data?.temperature.values
    const dataTemperatureC:any = dataTemperature?.map(item => {
        //PASAJE DE UNIDAD DE MW A KW
        const newValue= (Number(item.value)*0.1-273).toFixed(3).toString()
        return {...item , value: newValue}
    })


    return {getDataJson, powerValuesKw, dataTemperatureC}
}

export { useData }

