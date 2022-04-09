import React from 'react'
import Graph from './Graph';
import axios from 'axios';

function RefreshButton() {

    const baseURL = "http://localhost:3001/data/dateRange";


const data = async function() {
        const test = await axios.get(baseURL).data;
        console.log(test)
    }

  return (
    <div> 
        <button onClick={data}>
        Refresh
        </button>
        <div><Graph/></div>
    </div>
  );
}
export default RefreshButton