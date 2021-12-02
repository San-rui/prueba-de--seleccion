import { FC, useEffect, useState } from "react";
import { useData } from "../../hook/data";
import { ArrayDataGraphic, Value } from "../../types";

import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";

let array: ArrayDataGraphic[]=[{
    time:"0",
    power:"0",
    temperature:"0"
}]
let itemAux: ArrayDataGraphic={}

const Home :FC= () =>{

    const [time, setTime] = useState('')
    const [temp, setTemp] = useState('')
    const [pow, setPow] = useState('')
    const [power, setPower] = useState<Value[]>();
    const [temperature, setTemperature] = useState<Value[]>();
    
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

        power?.map((item)=>{
            if(item.time===time){
                const num=item.value
                setPow((((Number(num)*1000)*3600)/5).toString())
                itemAux ={
                    power: (((Number(num)*1000)*3600)/5).toString(), 
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
                array.push(itemAux)
            } 
        })

        chartFunction()
        showCurrentData()

    }, [time])


    const chartFunction =()=>{
        return(
            <div className="home">
                <div>
                    <ResponsiveContainer width="95%" height={400}>
                        <AreaChart data={array}>
                            <defs>
                                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                                    <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>

                        <Area dataKey="temperature"  stroke="#2451B7" fill="url(#color)"/>

                        <XAxis dataKey="power" />

                        <YAxis dataKey="temperature" tickCount={10} tickFormatter={(str) => `${str.toFixed(3)}°C`}/>

                        <Tooltip/>

                        <CartesianGrid opacity={0.6} vertical={false}/>

                        </AreaChart>
                    </ResponsiveContainer>
                </div>  
                
            </div>)
    }

    const showCurrentData=()=>{
        return(
            <div>
                <h1>Current status:</h1>
                <h2>{time}</h2>
                <h2>{temp}</h2>
                <h2>{pow}</h2>
            </div>
        )
    }


    return(
        <div className="home">            
            {showCurrentData()}
            {chartFunction()}
        </div>
    )
}

export default Home