import React, { Fragment, useState } from 'react'

export default function Slider({
    value,
    label,
    min = 0,
    max = 100,
    onChange    
} : any) {

  return (
    <Fragment>
        <label htmlFor="basic-range-slider-usage">{label}</label>
        <div className='flex flex-row gap-3'>
          <span className="text-gray-700 dark:text-neutral-300">{min}</span>
          <input type="range" value={value} min={0} max={100}  onChange={(e) => { onChange(e) }} className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
              [&::-webkit-slider-thumb]:w-2.5
              [&::-webkit-slider-thumb]:h-2.5
              [&::-webkit-slider-thumb]:-mt-0.5
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:ease-in-out
              [&::-webkit-slider-thumb]:dark:bg-neutral-700

              [&::-moz-range-thumb]:w-2.5
              [&::-moz-range-thumb]:h-2.5
              [&::-moz-range-thumb]:appearance-none
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-4
              [&::-moz-range-thumb]:border-blue-600
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:transition-all
              [&::-moz-range-thumb]:duration-150
              [&::-moz-range-thumb]:ease-in-out

              [&::-webkit-slider-runnable-track]:w-full
              [&::-webkit-slider-runnable-track]:h-2
              [&::-webkit-slider-runnable-track]:bg-gray-100
              [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-runnable-track]:dark:bg-neutral-700

              [&::-moz-range-track]:w-full
              [&::-moz-range-track]:h-2
              [&::-moz-range-track]:bg-gray-100
              [&::-moz-range-track]:rounded-full" id="basic-range-slider-usage"></input>
          <span className="text-gray-700 dark:text-neutral-300">{max}</span>
        </div>
    </Fragment>
  )
}
