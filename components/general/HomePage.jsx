import axios from 'axios';
import React, { useEffect , useState } from 'react';
import Plot from 'react-plotly.js';
import Image from 'next/image';
import clearDay from '../../public/day.svg';
import clearNight from '../../public/night.svg';
import cloudDay from '../../public/cloudy-day-2.svg';
import cloudNight from '../../public/cloudy-night-2.svg';
import rainy2 from '../../public/rainy-2.svg';
import rainy4 from '../../public/rainy-4.svg'
import rainy3 from '../../public/rainy-3.svg';
import rainy5 from '../../public/rainy-5.svg'
import rainy6 from '../../public/rainy-6.svg';

const HomePage = () => {
    const [status,setStatus] = useState(0);
    const [dayOrNigth , setDayOrNight] = useState('');
    const [hours,setHours] = useState([]);
    const [temperature,setTemperature] = useState([]);
    const [weatherCode, setweatherCode] = useState(0);
    const [actualIndex,setActualIndex] = useState(0);
    const [windSpeed,setWindSpeed] = useState(0);
    const [windDirection,setWindDirection] = useState(0);
    const now = new Date();
    const actualHourDisplay = now.toLocaleTimeString ('es-ES', {hour: '2-digit' , minute: '2-digit'});
    const actualDateDisplay = now.toDateString();
    useEffect (() => {
        const fetchData = async () => {
            const responseAPI = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-34.58&longitude=-58.49&hourly=temperature_2m,rain,cloudcover&timezone=auto&current_weather=true');
            console.log(responseAPI);
            const weatherCodeNow = responseAPI.data.current_weather.weathercode;
            console.log('weather code: ', weatherCodeNow);
            setweatherCode(responseAPI.data.current_weather.weathercode);
            setWindSpeed(responseAPI.data.current_weather.windspeed);
            setWindDirection(responseAPI.data.current_weather.winddirection);
            const times = responseAPI.data.hourly.time.map(item => parseInt(new Date(item).getTime())); // timestamp miliseconds
            const rawTimes = responseAPI.data.hourly.time.map(item => item); // timestamp miliseconds           
            setHours(rawTimes);
            setStatus(responseAPI.request.status);
            const timeNow = parseInt(Date.now()); // now in miliseconds
            const now = new Date();
            const timeIndex = times.findIndex(item => timeNow - item < 3600000 && timeNow - item > 0);
            setActualIndex(timeIndex);
            setTemperature(responseAPI.data.hourly.temperature_2m.map(item => item));
            const actualHourForDay = parseInt(now.toLocaleTimeString ('es-ES', {hour: '2-digit'}));
            if (actualHourForDay > 6 && actualHourForDay < 20 ) {
                setDayOrNight('day');
            } else {
                setDayOrNight('night');
            };        
        };
        fetchData();
    },[]);

	return (
		<div className={dayOrNigth === 'day' ? 'w-full min-h-screen h-full bg-teal-500' : 'w-full min-h-screen h-full bg-teal-900'}>
            { status === 0 ? null : 
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-col w-full h-full'>
                    <header className='mt-7 mx-7 flex flex-row justify-between'>
                        <div className='text-xl font-semibold text-white'>Menu</div>
                        <div className='text-xl font-semibold text-white'>Buenos Aires</div>
                        <div className='text-xl font-semibold text-white'>+</div>
                    </header>
                    <div className='flex flex-col w-full h-full items-center'>
                        <div>
                            {weatherCode === 0 && dayOrNigth === 'day' ? <Image src={clearDay} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode === 0 && dayOrNigth === 'night' ? <Image src={clearNight} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 1 && weatherCode <=3 && dayOrNigth === 'day' ? <Image src={cloudDay} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 1 && weatherCode <=3 && dayOrNigth === 'night' ? <Image src={cloudNight} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 45 && weatherCode <=57 && dayOrNigth === 'day' ? <Image src={rainy2} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 45 && weatherCode <=57 && dayOrNigth === 'night' ? <Image src={rainy4} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'day' ? <Image src={rainy3} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'night' ? <Image src={rainy5} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 66 && weatherCode <=67 && dayOrNigth === 'day' ? <Image src={rainy6} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 66 && weatherCode <=67 && dayOrNigth === 'night' ? <Image src={rainy6} width={200} alt='sunny' priority={true} /> : null}
                            {/* {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'day' ? <Image src={clearNight} width={150} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'night' ? <Image src={clearDay} width={150} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'day' ? <Image src={clearNight} width={150} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'night' ? <Image src={clearDay} width={150} alt='sunny' priority={true} /> : null} */}
                        </div>
                        <div className='text-[52px] font-semibold text-white mb-4'>{temperature[actualIndex]} °C</div>
                        <div className='text-xl font-semibold text-white'>
                            {weatherCode === 0 ? 'Clear sky' : null}
                            {weatherCode >= 1 && weatherCode <=3 ? 'Partly cloudy' : null}
                            {weatherCode >= 45 && weatherCode <=57 ? 'Drizzle' : null}
                            {weatherCode >= 61 && weatherCode <=65 ? 'Rain' : null}
                            {weatherCode >= 66 && weatherCode <=67 ? 'Freezing Rain' : null}
                        </div>
                        <div className='font-semibold text-white text-lg'>{actualHourDisplay}</div>
                        <div className='text-base font-semibold text-white'>{actualDateDisplay}</div>
                    </div>

                    <section className='flex flex-col mt-4'>
                        <div className='flex flex-row justify-evenly'>
                            <div className='flex flex-col items-center'>
                                <p className='text-[20px] font-semibold text-white'>Wind direction</p>
                                <div className='text-[18px] font-semibold text-white'>{windDirection > 0 && windDirection <=90 ? 'NE' : null}</div>
                                <div className='text-[18px] font-semibold text-white'>{windDirection > 90 && windDirection <=180 ? 'SE' : null}</div>
                                <div className='text-[18px] font-semibold text-white'>{windDirection > 180 && windDirection <=270 ? 'SO' : null}</div>
                                <div className='text-[18px] font-semibold text-white'>{windDirection > 270 && windDirection <=360 ? 'NO' : null}</div>
                            </div>
                            <div className='border border-white'></div>
                            <div className='flex flex-col items-center'>
                                <p className='text-[20px] font-semibold text-white'>Wind speed</p>
                                <div className='text-[18px] font-semibold text-white'>{windSpeed} km/h</div>
                            </div>
                        </div>
                        {/* <div className='flex flex-row'>
                            <div></div>
                            <div></div>
                        </div> */}
                    </section>
            
                    <div className='overflow-x-scroll lg:overflow-x-auto h-[240px] ml-2 text-center'>
                    {/* <div className=' overflow-x-scroll h-[240px] self-center  ml-2'> */}

                        <Plot className=''
                            data={[
                                {
                                    x: hours.slice(actualIndex,actualIndex+23),
                                    y: temperature.slice(actualIndex,actualIndex+23),
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {color: '#272727'},
                                },
                            ]}
                            layout={ 
                                {
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                paper_bgcolor:'rgba(0,0,0,0)',
                                margin: {autoexpand: true,
                                    l:35, r:35 , t: 20 , b:20 , pad: 0},
                                height: 180, 
                                width: 1200,
                                yaxis: {
                                    tickfont: {
                                        color: '#ffffff'
                                    },
                                    gridcolor: '#bdbdbd',
                                    title: {
                                        text: 'T [°C]',
                                        font: {
                                            color: '#ffffff'
                                        }
                                    }
                                },
                                xaxis: {
                                    tickfont: {
                                        color: '#ffffff'
                                    },
                                    gridcolor: '#bdbdbd',
                                }
                                } 
                            }
                        />
                    </div>

                </div>
            </div>
            }
		</div>
	);
}

export default HomePage;