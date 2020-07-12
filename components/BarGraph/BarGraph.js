import React from 'react';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
  } from 'recharts';
  
const BarGraph = (props) =>{
   
    return(
        <BarChart width={props.chartWidth} height={350} style={{width:'unset',height:'unset'}} data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="confirmed" fill="#8884d8" />
        <Bar dataKey="recovered" fill="#82ca9d" />
        <Bar dataKey="deaths" fill="red" />
    </BarChart>
    )
}

export default BarGraph;