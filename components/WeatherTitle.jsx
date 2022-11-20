import React from "react";
import { useAppSelector } from "../redux/hooks";

const WeatherTitle = () => {
    const { generalData } = useAppSelector(state => state.information);
    const weatherCode = generalData.current_weather.weathercode;

    return (
        <>
            {weatherCode && 
                <div className='text-xl font-semibold text-white'>
                    {weatherCode === 0 ? 'Clear sky' : null}
                    {weatherCode >= 1 && weatherCode <=3 ? 'Partly cloudy' : null}
                    {weatherCode >= 45 && weatherCode <=57 ? 'Drizzle' : null}
                    {weatherCode >= 61 && weatherCode <=65 ? 'Rain' : null}
                    {weatherCode >= 66 && weatherCode <=67 ? 'Freezing Rain' : null}
                    {weatherCode >= 68 && weatherCode <=100 ? 'Non characterized' : null}
                </div>
        
            }
        </>
    )
};

export default WeatherTitle;