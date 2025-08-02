import React from 'react';
import barchart from '../assets/barchart.jpg'

const BarChart = () => {
    return (
        <div className='border-3 border-[#000] h-auto lg:h-[400px] w-[90%] lg:w-[60%]'>
            <img src={barchart} alt="" className='object-cover w-full h-full'/>
        </div>
    );
}

export default BarChart;
