import React from "react";
import { useAppSelector } from "../redux/hooks";
import Plot from 'react-plotly.js';



const TemperatureDailyPlot = () => {
    const { generalData } = useAppSelector(state => state.information);
    const config = {
        staticPlot: true
    };
    const days = generalData.daily.time;
    const maxTemperature = generalData.daily.temperature_2m_max;
    const minTemperature = generalData.daily.temperature_2m_min;


    return (
        <>
            { generalData && 
                <div className='overflow-x-scroll lg:overflow-x-auto h-[200px] ml-2 text-center'>
                    <Plot className='' 
                        data={[
                            {
                                x: days,
                                y: maxTemperature,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: '#DE1A14'},
                                showlegend: false,
                            },
                            {
                                x: days,
                                y: minTemperature,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: '#1C18B4'},
                                showlegend: false,
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
            }
        </>
    )
};

export default TemperatureDailyPlot;