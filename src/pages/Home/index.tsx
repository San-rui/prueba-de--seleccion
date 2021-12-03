import { FC, useEffect, useState } from "react";
import { useData } from "../../hook/data";
import { ArrayDataGraphic, Value } from "../../types";

import logo from '../../assets/meteorologia.png'

import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    Text
} from "recharts";

import './styles.css'

let array: ArrayDataGraphic[]=[]
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

        console.log(power)

    },[]);

    useEffect(() => {
        
        setTimeout(function showTime () {
            const myDate = new Date();
            const hours = myDate.getHours();
            const minutes = myDate.getMinutes();
            const seconds = myDate.getSeconds();

            const checkTime =(i:number) =>{
                if (i < 10) {
                    const result =`0${i}`;
                    return result
                }
                return i;
            }
            const hs= checkTime(hours);
            const min= checkTime(minutes);
            const sec= checkTime(seconds);

            const currentTime= `${hs}:${min}:${sec}`
            setTime(currentTime)

        }, 1000);
        

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
                array.push(itemAux)
            } 
        })

        chartFunction()
        showCurrentData()

    },[time])

    const chartFunction =()=>{
        return(
            <div className="chart">
                <div>
                    <ResponsiveContainer width="95%" height={400}>
                        <AreaChart data={array} margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}>
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#457b9d" stopOpacity={0.4} />
                                <stop offset="75%" stopColor="#457b9d" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <Area dataKey="temperature"  stroke="#457b9d" fill="url(#color)"/>

                        <XAxis dataKey="power"  tickFormatter={(str) => `${str}Kw/h`}
                        label={
                            <Text
                                x={0}
                                y={0}
                                dx={550}
                                dy={400}
                                offset={0}
                                angle={0}
                            >POWER</Text>
                        }/>

                        <YAxis dataKey="temperature" domain={[0, 30]} label={
                            <Text
                                x={0}
                                y={0}
                                dx={50}
                                dy={130}
                                offset={0}
                                angle={-90}
                            >TEMPERATURE</Text>
                        } tickFormatter={(str) => `${str.toFixed(2)}°C`}/>

                        <Tooltip/>

                        <CartesianGrid opacity={0.6} vertical={false} strokeDasharray="3 3" />

                        </AreaChart>
                    </ResponsiveContainer>
                    
                </div>  
            </div>)
    }

    const showCurrentData=()=>{
        return(
            <div>
                <div className="container-logo">
                    <img src={logo} alt="" className='logo'/>
                    <h1 className="title">METEOLOGICA</h1>
                </div>
                <h2 className="title-status">Current status</h2>
                <div className="current-status">
                    <div className="status">
                        <h3>Current time</h3>
                        <p className="text">{time}</p>
                    </div>
                    <div className="status">
                        <h3>Current temperature</h3>
                        <p className="text">{temp} °C</p>
                    </div>
                    <div className="status">
                        <h3>Current power</h3>
                        <p className="text">{pow} Kw/h</p>
                    </div>
                </div>
            </div>
            
        )
    }

    console.log(array)

    return(
        <div className="home">            
            {showCurrentData()}
            {chartFunction()}
        </div>
    )
}

export default Home