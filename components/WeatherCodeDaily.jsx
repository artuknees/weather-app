import React from "react";
import IconSelector from "./IconSelector";


const WeatherCodeDaily = ({generalData }) => {
    return(
            <div className="overflow-x-scroll md:overflow-x-hidden">
                <table className="w-max my-2 md:w-full">
                    <tbody className="w-max">
                        <tr className="w-max">
                            {generalData.daily.weathercode.map((item,index) => {
                                return(
                                    <th className="w-max px-2" key={`Daily${index}`}>
                                        <IconSelector width={100} weatherCode={item} dayOrNight={'day'}/>
                                        <span className="">{generalData.daily.time[index]}</span>
                                    </th>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
    )
}

export default WeatherCodeDaily;