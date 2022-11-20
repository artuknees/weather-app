import React from "react";
import IconSelector from "./IconSelector";


const WeatherCodeHourly = ({generalData , actualTimeIndex , dayOrNight}) => {

    const convertToStat = (hourNumber) => {
        if (hourNumber >= 6 && hourNumber <= 19) {
            return 'day'
        } else {
            return 'night'
        }
    };
    const times = generalData.hourly.time.map(item => parseInt(new Date(item).getHours()))

    return(
            <div className="overflow-x-scroll lg:overflow-x-hidden">
                <table className="w-max my-2 md:w-full">
                    <tbody className="w-max">
                        <tr className="w-max">
                            {generalData.hourly.weathercode.slice(actualTimeIndex,actualTimeIndex+18).map((item,index) => {
                                
                                return(
                                    <th className="w-max" key={`Hourly${index}`}>
                                        <IconSelector width={100} weatherCode={item} dayOrNight={convertToStat(times[actualTimeIndex+index])}/>
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