import { useEffect, useState } from "react";

//EN ESTE HOOK SE CREA EL RELOJ Y SE SETEAN LOS DATOS DE LA HORA ACTUAL 
//El state "time" se actualiza cada un segundo para contrastar la hora actual con el dato horario de cada elemento del archivo de datos

const useTime = () => {

    const [time, setTime] = useState('');
    const [second, setTSecond] = useState('');

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
            setTSecond(sec.toString())

            const currentTime= `${hs}:${min}:${sec}`
            setTime(currentTime)

        }, 1000);

    },[time])

    return {time, second}
}

export { useTime }