import React from "react";
import Image from "next/image";
import arrow from '../public/arrow.svg';


const ScrollArrow = () => {
    return(
        <div className='flex flex-col items-end lg:hidden'>
            <Image src={arrow} alt={'arrow'}/>
        </div>

    )
};

export default ScrollArrow