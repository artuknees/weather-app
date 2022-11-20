import React from "react";
import { useAppSelector } from "../redux/hooks";

const RealFeelTemperature = () => {
    const { generalData , actualTimeIndex } = useAppSelector(state => state.information);
    const realFeelTemperatureNow = generalData.hourly.apparent_temperature[actualTimeIndex];
    return (
        <>
            {generalData && 
                <div className='flex flex-col items-center'>
                    <p className='text-[20px] font-semibold text-white'>Apparent temp</p>
                    <div className='text-[18px] font-semibold text-white'>{`${realFeelTemperatureNow}°C`}</div>
                </div>
            }
        </>
    )
};

export default RealFeelTemperature;