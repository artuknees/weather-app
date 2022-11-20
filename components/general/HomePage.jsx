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


const HomePage = () => {
    const { dayOrNight , generalData , requestStatus , actualTimeIndex} = useAppSelector(state => state.information); 
    const now = new Date();
    const actualHourDisplay = now.toLocaleTimeString ('es-ES', {hour: '2-digit' , minute: '2-digit'});
    const actualDateDisplay = now.toDateString();

	return (
		<div className={dayOrNight === 'day' ? 'w-full min-h-screen h-full bg-teal-500' : 'w-full min-h-screen h-full bg-teal-900'}>
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
                        <div className='flex flex-col'>
                            <TemperaturePlot/>
                            <div className='flex flex-col items-end mr-5 lg:hidden'>
                                <Image src={arrow} alt={'arrow'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mx-5'>
                    <WeatherCodeHourly generalData={generalData} actualTimeIndex={actualTimeIndex} dayOrNight={dayOrNight}/>
                    <div className='flex flex-col items-end lg:hidden'>
                        <Image src={arrow} alt={'arrow'}/>
                    </div>

                </div>
                <div className='flex flex-col w-full h-full mt-3'>
                    <TemperatureDailyPlot/>
                    <div className='flex flex-col items-end mr-5 lg:hidden'>
                        <Image src={arrow} alt={'arrow'}/>
                    </div>

                </div>
                <div className='flex flex-col mx-5'>
                    <WeatherCodeDaily generalData={generalData} />
                    <div className='flex flex-col items-end lg:hidden'>
                        <Image src={arrow} alt={'arrow'}/>
                    </div>
                </div>
            </div>
            }
		</div>
	);
}

export default HomePage;