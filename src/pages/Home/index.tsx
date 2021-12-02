import { FC, useEffect, useState } from "react";
import { useData } from "../../hook/data";
import { ArrayDataGraphic, Value } from "../../types";

const Home :FC= () =>{

    const [time, setTime] = useState('')
    const [power, setPower] = useState<Value[]>();
    const [temperature, setTemperature] = useState<Value[]>();
    const [arrayData, setArrayData]= useState<ArrayDataGraphic[]>()

    const {getDataJson, powerValuesKw, dataTemperatureC} = useData();

    useEffect(()=>{
        getDataJson()
        setPower(powerValuesKw)
        setTemperature(dataTemperatureC)
    },[]);

    useEffect(() => {
        setTimeout(function showTime () {
            const myDate = new Date();
            const hours = myDate.getHours();
            const minutes = myDate.getMinutes();
            const seconds = myDate.getSeconds();
            const actualTime= `${hours}:${minutes}:${seconds}`
            setTime(actualTime)

        }, 1000);
    },[time])

    useEffect(() => {
        if(arrayData!==[]){
            let array: ArrayDataGraphic[]=[]
            let itemAux: ArrayDataGraphic={}

            power?.map((item)=>{
                if(item.time===time){
                    const num=item.value
                    console.log((Number("2")*1000).toString())
                    console.log((Number(num)*1000).toString())
                    itemAux ={
                        power: (Number(num)*1000).toString(), 
                        time: item.time
                    }
                } 
            })

            if(itemAux!=={}){
                array.push(itemAux)
                console.log(array.length, itemAux)
                setArrayData(array)
            }
        }
        
    }, [])

    

    return(
        <div className="home">
            <h2> 
                {time}
            </h2>           
        </div>

    )
    
}

export default Home