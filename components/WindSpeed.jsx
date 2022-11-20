import React from "react";
import { useAppSelector } from "../redux/hooks";

const WindSpeed = () => {
    const { generalData } = useAppSelector(state => state.information);
    const windSpeed = generalData.current_weather.windspeed;
    return (
        <>
            {generalData && 
                <div className='flex flex-col items-center'>
                    <p className='text-[20px] font-semibold text-white'>Wind speed</p>
                    <div className='text-[18px] font-semibold text-white'>{windSpeed} km/h</div>
                </div>
            }
        </>
    )
};

export default WindSpeed;