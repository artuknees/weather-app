import axios from 'axios';
import React, { useEffect , useState } from 'react';
import Plot from 'react-plotly.js';
import { useAppSelector , useAppDispatch } from '../../redux/hooks';
import { setGeneralData , setDayOrNight } from '../../redux/features/actions/information';
import Header from '../Header';
import IconSelector from '../IconSelector';
import WeatherTitle from '../WeatherTitle';


const HomePage = () => {
    const dispatch = useAppDispatch();
    const { dayOrNigth , generalData } = useAppSelector(state => state.information); 
    const [status,setStatus] = useState(0);
    const [hours,setHours] = useState([]);
    const [temperature,setTemperature] = useState([]);
    const [actualIndex,setActualIndex] = useState(0);
    const [windSpeed,setWindSpeed] = useState(0);
    const [windDirection,setWindDirection] = useState(0);
    const now = new Date();
    const actualHourDisplay = now.toLocaleTimeString ('es-ES', {hour: '2-digit' , minute: '2-digit'});
    const actualDateDisplay = now.toDateString();
    const config = {
        staticPlot: true
      };
    useEffect (() => {
        const fetchData = async () => {
            const responseAPI = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-34.58&longitude=-58.49&hourly=temperature_2m,rain,cloudcover&timezone=auto&current_weather=true');
            dispatch(setGeneralData(responseAPI.data));
            const now = new Date();
            const actualHourForDay = parseInt(now.toLocaleTimeString ('es-ES', {hour: '2-digit'}));
            if (actualHourForDay > 6 && actualHourForDay < 20 ) {
                dispatch(setDayOrNight('day'));
            } else {
                dispatch(setDayOrNight('night'));
            };
            setWindSpeed(responseAPI.data.current_weather.windspeed);
            setWindDirection(responseAPI.data.current_weather.winddirection);
            const times = responseAPI.data.hourly.time.map(item => parseInt(new Date(item).getTime())); // timestamp miliseconds
            const rawTimes = responseAPI.data.hourly.time.map(item => item); // timestamp miliseconds           
            setHours(rawTimes);
            setStatus(responseAPI.request.status);
            const timeNow = parseInt(Date.now()); // now in miliseconds
            const timeIndex = times.findIndex(item => timeNow - item < 3600000 && timeNow - item > 0);
            setActualIndex(timeIndex);
            setTemperature(responseAPI.data.hourly.temperature_2m.map(item => item));
        };
        fetchData();
    },[]);

	return (
		<div className={dayOrNigth === 'day' ? 'w-full min-h-screen h-full bg-teal-500' : 'w-full min-h-screen h-full bg-teal-900'}>
            { status === 0 ? null : 
            <div className='flex flex-col w-full h-full'>
                <div className='flex flex-col w-full h-full'>
                    <Header/>
                    <div className='flex flex-col w-full h-full items-center'>
                    <IconSelector width={200}/>
                        <p className='text-[52px] font-semibold text-white mb-4'>{generalData.current_weather.temperature} °C</p>
                        <WeatherTitle/>
                        <p className='font-semibold text-white text-lg'>{actualHourDisplay}</p>
                        <p className='text-base font-semibold text-white'>{actualDateDisplay}</p>
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
                            <div className='border border-white bg-white'></div>
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
                                        text: 'Temperature',
                                        font: {
                                            color: '#ffffff',
                                            family: 'Chivo'
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
                            config={config}
                        />
                    </div>

                </div>
            </div>
            }
		</div>
	);
}

export default HomePage;