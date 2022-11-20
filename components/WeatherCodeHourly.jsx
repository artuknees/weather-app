import React from "react";
import IconSelector from "./IconSelector";


const WeatherCodeHourly = ({generalData , actualTimeIndex , dayOrNight}) => {
    return(
            <div className="overflow-x-scroll lg:overflow-x-hidden">
                <table className="w-max my-2 md:w-full">
                    <tbody className="w-max">
                        <tr className="w-max">
                            {generalData.hourly.weathercode.slice(actualTimeIndex,actualTimeIndex+18).map((item,index) => {
                                return(
                                    <th className="w-max" key={`Hourly${index}`}>
                                        <IconSelector width={100} weatherCode={item} dayOrNight={dayOrNight}/>
                                        <span>{generalData.hourly.time[actualTimeIndex+index].slice(-5)}</span>
                                    </th>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
    )
}

export default WeatherCodeHourly;