import React from "react";
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

const IconSelector = ({width , weatherCode , dayOrNight}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {weatherCode === 0 && dayOrNight === 'day' ? <Image src={clearDay} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode === 0 && dayOrNight === 'night' ? <Image src={clearNight} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 1 && weatherCode <=3 && dayOrNight === 'day' ? <Image src={cloudDay} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 1 && weatherCode <=3 && dayOrNight === 'night' ? <Image src={cloudNight} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 45 && weatherCode <=57 && dayOrNight === 'day' ? <Image src={rainy2} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 45 && weatherCode <=57 && dayOrNight === 'night' ? <Image src={rainy4} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 61 && weatherCode <=65 && dayOrNight === 'day' ? <Image src={rainy3} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 61 && weatherCode <=65 && dayOrNight === 'night' ? <Image src={rainy5} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 66 && weatherCode <=67 && dayOrNight === 'day' ? <Image src={rainy6} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 66 && weatherCode <=67 && dayOrNight === 'night' ? <Image src={rainy6} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            
            {weatherCode >= 68 && weatherCode <=79 && dayOrNight === 'day' ? null : null}
            {weatherCode >= 68 && weatherCode <=79 && dayOrNight === 'night' ? null : null}

            {weatherCode >= 80 && weatherCode <=82 && dayOrNight === 'day' ? <Image src={rainy6} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            {weatherCode >= 80 && weatherCode <=82 && dayOrNight === 'night' ? <Image src={rainy6} layout="fill" width={width} alt='sunny' priority={true} /> : null}
            
            {weatherCode >= 83 && weatherCode <=100 && dayOrNight === 'day' ? null : null}
            {weatherCode >= 83 && weatherCode <=100 && dayOrNight === 'night' ? null : null}
        </div>
    )
};

export default IconSelector;

