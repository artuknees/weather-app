import axios from 'axios';
import React, { useEffect , useState } from 'react';
import Plot from 'react-plotly.js';


const HomePage = () => {
    const [time,setTime] = useState(0);
    const [hours,setHours] = useState([]);
    const [status,setStatus] = useState(0);
    const [temperature,setTemperature] = useState([]);
    const [actualIndex,setActualIndex] = useState(0);
    const [timeToPlot,setTimeToPlot] = useState([]);
    const actualTime = () => {
        setTime(parseInt(Date.now()/1000));
    };
    useEffect (() => {
        const fetchData = async () => {
            console.log('Loading data...');
            const responseAPI = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-34.58&longitude=-58.49&hourly=temperature_2m&timezone=auto');
            console.log(responseAPI);
            console.log('Successfully loaded!');
            const times = responseAPI.data.hourly.time.map(item => parseInt(new Date(item).getTime()/1000));
            setStatus(responseAPI.request.status)
            setTimeout(() => actualTime(),100);
            setHours(times);
            setTemperature(responseAPI.data.hourly.temperature_2m.map(item => item));
            const timeNow = parseInt(Date.now()/1000);
            const timeIndex = times.findIndex(item => timeNow - item < 3600 && timeNow - item > 0);
            setActualIndex(timeIndex);
        };
        fetchData();
    },[]);

	return (
		<div className='mt-5 flex flex-col w-full h-full'>
            <h1 className='text-[36px] text-center'>Weather app</h1>

            <p className='text-[18px]'>Hora actual</p>
            { status === 0 ? null : 
                <p className='text-[18px]'>{new Date((hours[actualIndex] * 1000)-(3600000*3)).toISOString().substring(11, 16)}</p>
            }
            <p className='text-[18px]'>Temperatura</p>
            { status === 0 ? null : 
                <p className='text-[18px]'>{temperature[actualIndex]} °C</p>
            }

            <Plot
                data={[
                {
                    x: hours,
                    y: temperature,
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'red'},
                },
                ]}
                layout={ {width: 375, height: 300, title: 'Hourly temperature'} }
            />
		</div>
	);
}

export default HomePage;