import React from "react";
import { useAppSelector } from "../redux/hooks";

const WindDirection = () => {
    const { generalData } = useAppSelector(state => state.information);
    const windDirection = generalData.current_weather.winddirection;
    return (
        <>
        {generalData && 
            <div className='flex flex-col items-center'>
                <p className='text-[20px] font-semibold text-white'>Wind direction</p>
                <div className='text-[18px] font-semibold text-white'>{windDirection > 0 && windDirection <=90 ? 'NE' : null}</div>
                <div className='text-[18px] font-semibold text-white'>{windDirection > 90 && windDirection <=180 ? 'SE' : null}</div>
                <div className='text-[18px] font-semibold text-white'>{windDirection > 180 && windDirection <=270 ? 'SO' : null}</div>
                <div className='text-[18px] font-semibold text-white'>{windDirection > 270 && windDirection <=360 ? 'NO' : null}</div>
            </div>}
        </>
    )
};

export default WindDirection;