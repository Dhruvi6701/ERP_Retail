import React, { useEffect, useState } from "react";
import "../scss/dashboard.css";
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";
import Sales from "src/components/Sales";
import Purchase from "src/components/Purchase";
import Collection from "src/components/Collection";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  
   
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

 useEffect(() => {
   
 
 }, [])

  return (
    <div className="dashboard">
      <div className="titles">Statements
      <div className="datepickers" >
      From
      <input type="date"    name="startDate"  onSelect={(e) =>   
setStartDate(e.target.value)} />  
To
 <input type="date" name="endDate"   onSelect={(e) =>   
setEndDate(e.target.value)} />  
      </div>
      </div>
      <Sales dates = {{startdate : startDate , enddate : endDate}}/>
<Purchase  dates = {{startdate : startDate , enddate : endDate}}/>
<Collection  dates = {{startdate : startDate , enddate : endDate}}/>
      {/* purchase  container*/}
  
    </div>
  );
};

export default Dashboard;
