import { FC } from "react";
import { useData, useTime } from "../../hook/";
import logo from '../../assets/meteorologia.png'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    CartesianGrid,
    Text,
} from "recharts";

import './styles.css'

const Home :FC= () =>{

    const {time} = useTime()
    const { arrayDataMinutal, temp, pow} = useData();

    //ESTA FUNCION MUESTRA EL GRAFICO EN PANTALLA:
    //EL GRAFICO MUESTRA LA TEMPERATURA EN FUNCION DE LA ENERGIA CON UN INTERVALO SE UN MINUTO, LO CUAL SE TRADUCE EN QUE CUANDO PASA DE UN MINUTO A OTRO LA HORA ACTUAL, EL GRAFICO SE RENDERIZA.
    
    const chartFunction =()=>{
        return(
            <div className="chart">
                <div>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={arrayDataMinutal}  margin={{ top: 15, right: 30, left: 30, bottom: 20 }}>

                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#457b9d" stopOpacity={0.4} />
                                <stop offset="75%" stopColor="#457b9d" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <Area dataKey="temperature"  stroke="#457b9d" fill="url(#color)"/>

                        <XAxis dataKey="power" angle={10} y={-10} dy={10} domain={[0, 'dataMax']} tickFormatter={(str) => `${str}Kw/h`}
                        label={
                            <Text
                                x={0}
                                y={0}
                                dx={80}
                                dy={400}
                                offset={0}
                                angle={0}
                            >POWER</Text>
                        }/>

                        <YAxis dataKey="temperature" tickCount={100} domain={[0, 'dataMax']} label={
                            <Text
                                x={0}
                                y={0}
                                dx={20}
                                dy={130}
                                offset={0}
                                angle={-90}
                            >TEMPERATURE</Text>
                        } tickFormatter={(str) => `${str.toFixed(2)}°C`}/>

                        <CartesianGrid opacity={0.6} vertical={false} strokeDasharray="3 3" />

                        </AreaChart>
                    </ResponsiveContainer>
                    
                </div>  
            </div>)
    }

    //CON ESTA FUNCION SE MUESTRA EN PANTALLA LOS DATOS DE LA TEMPERATURA Y LA ENERGIA ACTUAL. ESTOS DATOS SE ACTUALIZAN CADA 5 SEGUNDOS. 
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

    return(
        <div className="home">            
            {showCurrentData()}
            {chartFunction()}
        </div>
    )
}

export default Home