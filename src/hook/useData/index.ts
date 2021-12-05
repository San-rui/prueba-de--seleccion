import { useEffect, useState } from "react";
import { useTime } from "..";
import { ArrayDataGraphic, Data, Value} from "../../types";

//EN ESTE HOOK SE MANIPULAN LOS DATOS DEL ARCHIVO data.json PARA REALIZAR EL GRAFICO TENIENDO EN CUENTA LOS DATOS DE LA HORA ACTUAL

let itemAux: ArrayDataGraphic={}

const useData = () => {

    const [data, setData] = useState<Data | undefined>()
    const [power, setPower] = useState<Value[]>();
    const [temperature, setTemperature] = useState<Value[]>();
    const [temp, setTemp] = useState('');
    const [pow, setPow] = useState('');
    const [arrayData, setArrayData] = useState<ArrayDataGraphic[]>([]);
    const [arrayDataMinutal, setArrayDataMinutal] = useState<ArrayDataGraphic[]>([]);

    const {time, second} = useTime()

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

    },[data]);

    useEffect(() => {
        
        
        

        power?.map((item)=>{
            if(item.time===time){
                const num=item.value
                setPow((((Number(num)*1000)*3600)/5).toFixed(1).toString())
                itemAux ={
                    power: (((Number(num)*1000)*3600)/5).toFixed(1).toString(), 
                }
                
            } 
        })
        
        temperature?.map((item)=>{
            if(item.time===time){
                const num=item.value
                setTemp((Number(num)*0.1-273).toFixed(3).toString())
                itemAux ={
                    ...itemAux,
                    temperature: (Number(num)*0.1-273).toFixed(3).toString(),
                    time: item.time
                }
                setArrayData(prevState=>([...prevState, itemAux]))  

                if(item.time===time && second==='00'){
                const num=item.value
                itemAux ={
                    ...itemAux,
                    temperature: (Number(num)*0.1-273).toFixed(3).toString(),
                    time: item.time
                }
                    setArrayDataMinutal(prevState=>([...prevState, itemAux]))
                } 
                
            } 
        })
        

    },[time])

    return { power, temperature, arrayDataMinutal, temp, pow}
}

export { useData }

