import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Header from '../Header';
import Image from 'next/image';
import IconSelector from '../IconSelector';
import WeatherTitle from '../WeatherTitle';
import TemperaturePlot from '../TemperaturePlot';
import TemperatureDailyPlot from '../TemperatureDailyPlot';
import SummaryTable from '../containers/SummaryTable';
import WeatherCodeHourly from '../WeatherCodeHourly';
import WeatherCodeDaily from '../WeatherCodeDaily';
import arrow from '../../public/arrow.svg';
import ScrollArrow from '../ScrollArrow';


const HomePage = () => {
    const { dayOrNight , generalData , requestStatus , actualTimeIndex} = useAppSelector(state => state.information); 
    const now = new Date();
    const actualHourDisplay = now.toLocaleTimeString ('es-ES', {hour: '2-digit' , minute: '2-digit'});
    const actualDateDisplay = now.toDateString();

	return (
		<div className={dayOrNight === 'day' ? 'w-full min-h-screen h-full bg-teal-500 pb-5' : 'w-full min-h-screen h-full bg-teal-900 pb-5'}>
            { requestStatus === 200 && 
            <div className='w-full'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-col w-full h-full'>
                        <Header/>
                        <div className='flex flex-col w-full h-full items-center'>
                            <IconSelector width={200} weatherCode={generalData.current_weather.weathercode} dayOrNight={dayOrNight}/>
                            <p className='text-[52px] font-semibold text-white mb-4'>{generalData.current_weather.temperature} °C</p>
                            <WeatherTitle/>
                            <p className='font-semibold text-white text-lg'>{actualHourDisplay}</p>
                            <p className='text-base font-semibold text-white'>{actualDateDisplay}</p>
                        </div>
                        <SummaryTable/>
                        <div className='flex flex-col mx-3'>
                            <TemperaturePlot/>
                            <ScrollArrow/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mx-3 mt-2'>
                    <WeatherCodeHourly generalData={generalData} actualTimeIndex={actualTimeIndex} dayOrNight={dayOrNight}/>
                    <ScrollArrow/>
                </div>
                <div className='flex flex-col mt-2 mx-3'>
                    <TemperatureDailyPlot/>
                    <ScrollArrow/>
                </div>
                <div className='flex flex-col mx-3 mt-2'>
                    <WeatherCodeDaily generalData={generalData} />
                    <ScrollArrow/>
                </div>
            </div>
            }
		</div>
	);
}

export default HomePage;