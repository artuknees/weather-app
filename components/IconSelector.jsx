import React from "react";
import { useAppSelector } from "../redux/hooks";
import Image from "next/image";
import clearDay from '../public/day.svg';
import clearNight from '../public/night.svg';
import cloudDay from '../public/cloudy-day-2.svg';
import cloudNight from '../public/cloudy-night-2.svg';
import rainy2 from '../public/rainy-2.svg';
import rainy4 from '../public/rainy-4.svg'
import rainy3 from '../public/rainy-3.svg';
import rainy5 from '../public/rainy-5.svg'
import rainy6 from '../public/rainy-6.svg';

const IconSelector = ({width}) => {
    const { generalData , dayOrNight } = useAppSelector(state => state.information);
    const weatherCode = generalData.current_weather.weathercode;

    return (
        <>
            {weatherCode && 
                <div>
                    {weatherCode === 0 && dayOrNight === 'day' ? <Image src={clearDay} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode === 0 && dayOrNight === 'night' ? <Image src={clearNight} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 1 && weatherCode <=3 && dayOrNight === 'day' ? <Image src={cloudDay} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 1 && weatherCode <=3 && dayOrNight === 'night' ? <Image src={cloudNight} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 45 && weatherCode <=57 && dayOrNight === 'day' ? <Image src={rainy2} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 45 && weatherCode <=57 && dayOrNight === 'night' ? <Image src={rainy4} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 61 && weatherCode <=65 && dayOrNight === 'day' ? <Image src={rainy3} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 61 && weatherCode <=65 && dayOrNight === 'night' ? <Image src={rainy5} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 66 && weatherCode <=67 && dayOrNight === 'day' ? <Image src={rainy6} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 66 && weatherCode <=67 && dayOrNight === 'night' ? <Image src={rainy6} width={width} alt='sunny' priority={true} /> : null}
                    {weatherCode >= 68 && weatherCode <=100 && dayOrNight === 'day' ? null : null}
                    {weatherCode >= 68 && weatherCode <=100 && dayOrNight === 'night' ? null : null}
                </div>
            }
        </>
    )
};

export default IconSelector;

