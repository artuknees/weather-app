import React from "react";
import { useAppSelector } from "../redux/hooks";

const Humidity = () => {
    const { generalData , actualTimeIndex } = useAppSelector(state => state.information);
    const humidityNow = generalData.hourly.relativehumidity_2m[actualTimeIndex];
    return (
        <>
            {generalData && 
                <div className='flex flex-col items-center'>
                    <p className='text-[20px] font-semibold text-white'>Humidity</p>
                    <div className='text-[18px] font-semibold text-white'>{`${humidityNow}%`}</div>
                </div>
            }
        </>
    )
};

export default Humidity;