import React from "react";
import Humidity from "../Humidity";
import RealFeelTemperature from "../RealFeelTemperature";
import WindDirection from "../WindDirection";
import WindSpeed from "../WindSpeed";

const SummaryTable = () => {
    return(
        <table className='flex flex-col mx-5 mt-4 items-center '>
            <tbody className='w-full lg:w-1/2'>
                <tr className='text-center w-full flex flex-row justify-evenly border-b border-b-white'>
                    <th className='border-r border-r-white w-full'>
                        <WindDirection/>
                    </th>
                    <th className='w-full'>
                        <WindSpeed/>
                    </th>
                </tr>
                <tr className='text-center w-full flex flex-row justify-evenly'>
                    <th className='border-r border-r-white w-full'>
                        <Humidity/>
                    </th>
                    <th className='w-full'>
                        <RealFeelTemperature/>
                    </th>
                </tr>

            </tbody>
        </table>

    )
};

export default SummaryTable;