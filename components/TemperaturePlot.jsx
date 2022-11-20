import React from "react";
import { useAppSelector } from "../redux/hooks";
import Plot from 'react-plotly.js';



const TemperaturePlot = () => {
    const { generalData , actualTimeIndex } = useAppSelector(state => state.information);
    const config = {
        staticPlot: true
    };
    const hours = generalData.hourly.time.map(item => item);
    const temperature = generalData.hourly.temperature_2m.map(item => item);

    return (
        <>
            { generalData && 
                <div className='overflow-x-scroll lg:overflow-x-auto h-[200px] ml-2 text-center'>
                    <Plot className='' 
                        data={[
                            {
                                x: hours.slice(actualTimeIndex,actualTimeIndex+23),
                                y: temperature.slice(actualTimeIndex,actualTimeIndex+23),
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
            }
        </>
    )
};

export default TemperaturePlot;