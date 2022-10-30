import axios from 'axios';
import React, { useEffect , useState } from 'react';
import Plot from 'react-plotly.js';
import Image from 'next/image';
import clearDay from '../../public/animated/day.svg';
import clearNight from '../../public/animated/night.svg';
import cloudDay from '../../public/animated/cloudy-day-2.svg';
import cloudNight from '../../public/animated/cloudy-night-2.svg';
import rainy2 from '../../public/animated/rainy-2.svg';
import rainy4 from '../../public/animated/rainy-4.svg'
import rainy3 from '../../public/animated/rainy-3.svg';
import rainy5 from '../../public/animated/rainy-5.svg'
import rainy6 from '../../public/animated/rainy-6.svg';


const HomePage = () => {
    const [status,setStatus] = useState(0);
    const [dayOrNigth , setDayOrNight] = useState('');
    const [hours,setHours] = useState([]);
    const [temperature,setTemperature] = useState([]);
    const [weatherCode, setweatherCode] = useState(0);
    const [actualIndex,setActualIndex] = useState(0);
    const [dayState,setDayState] = useState('');
    const now = new Date();
    const actualHourDisplay = now.toLocaleTimeString ('es-ES', {hour: '2-digit' , minute: '2-digit'});
    const actualHourForDay = parseInt(now.toLocaleTimeString ('es-ES', {hour: '2-digit'}));
    

    const actualDateDisplay = now.toDateString();
    useEffect (() => {
        const fetchData = async () => {
            const responseAPI = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-34.58&longitude=-58.49&hourly=temperature_2m,rain,cloudcover&timezone=auto&current_weather=true');
            console.log(responseAPI);
            const weatherCodeNow = responseAPI.data.current_weather.weathercode;
            console.log('weather code: ', weatherCodeNow);
            setweatherCode(responseAPI.data.current_weather.weathercode);
            const times = responseAPI.data.hourly.time.map(item => parseInt(new Date(item).getTime())); // timestamp miliseconds
            const rawTimes = responseAPI.data.hourly.time.map(item => item); // timestamp miliseconds           
            setHours(rawTimes);
            setStatus(responseAPI.request.status);
            const timeNow = parseInt(Date.now()); // now in miliseconds
            const timeIndex = times.findIndex(item => timeNow - item < 3600000 && timeNow - item > 0);
            setActualIndex(timeIndex);
            setTemperature(responseAPI.data.hourly.temperature_2m.map(item => item));
            if (actualHourForDay > 6 && actualHourForDay < 20 ) {
                setDayOrNight('day');
                console.log('day');
                console.log(actualHourForDay);
            } else {
                setDayOrNight('night');
                console.log('night');
                console.log(actualHourForDay);
            };        
        };
        fetchData();
    },[]);

	return (
		<div className='w-full min-h-screen h-full bg-teal-500'>
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
                            {weatherCode === 0 && dayOrNigth === 'nigth' ? <Image src={clearNight} width={200} alt='sunny' priority={true} /> : null}
                            
                            {weatherCode >= 1 && weatherCode <=3 && dayOrNigth === 'day' ? <Image src={cloudDay} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 1 && weatherCode <=3 && dayOrNigth === 'nigth' ? <Image src={cloudNight} width={200} alt='sunny' priority={true} /> : null}

                            {weatherCode >= 45 && weatherCode <=57 && dayOrNigth === 'day' ? <Image src={rainy2} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 45 && weatherCode <=57 && dayOrNigth === 'nigth' ? <Image src={rainy4} width={200} alt='sunny' priority={true} /> : null}
                            
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'day' ? <Image src={rainy3} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'nigth' ? <Image src={rainy5} width={200} alt='sunny' priority={true} /> : null}
                            
                            {weatherCode >= 66 && weatherCode <=67 && dayOrNigth === 'day' ? <Image src={rainy6} width={200} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 66 && weatherCode <=67 && dayOrNigth === 'nigth' ? <Image src={rainy6} width={200} alt='sunny' priority={true} /> : null}
                            
                            {/* {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'day' ? <Image src={clearNight} width={150} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'nigth' ? <Image src={clearDay} width={150} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'day' ? <Image src={clearNight} width={150} alt='sunny' priority={true} /> : null}
                            {weatherCode >= 61 && weatherCode <=65 && dayOrNigth === 'nigth' ? <Image src={clearDay} width={150} alt='sunny' priority={true} /> : null} */}
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
                


                    <Plot className='ml-2'
                        data={[
                            {
                                x: hours.slice(actualIndex,actualIndex+16),
                                y: temperature.slice(actualIndex,actualIndex+16),
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: '#272727'},
                            },
                        ]}
                        layout={ 
                            {
                            plot_bgcolor:'rgb(20 184 166)',
                            paper_bgcolor:"rgb(20 184 166)",
                            margin: {autoexpand: true,
                                l:35, r:35 , t: 20 , b:20 , pad: 0},
                            height: 180, 
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
            }
		</div>
	);
}

export default HomePage;