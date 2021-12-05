import { useEffect, useState } from "react";
import { Data, Value} from "../types";

//ESTE HOOK SE UTILIZA PARA PASAR LOS DATOS DEL ARCHIVO .JSON A JS, LO CUAL NOS PERMITIRA MANIPULARLOS 

const useData = () => {

    const [data, setData] = useState<Data | undefined>()
    const [power, setPower] = useState<Value[]>();
    const [temperature, setTemperature] = useState<Value[]>();

    useEffect(()=>{

        const getDataJson= async()=>{
            const response = await fetch('data/data.json'
            ,{
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            )
            const data: Data = await response.json()
            setData(data)
            
        }
        getDataJson()

    },[])

    useEffect(()=>{
        setTemperature(data?.temperature.values)
        setPower(data?.power.values)

    },[data])

    return { power, temperature}
}

export { useData }

