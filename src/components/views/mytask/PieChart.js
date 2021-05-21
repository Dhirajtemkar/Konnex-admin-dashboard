import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
    
    let data = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: props.groupLabel,
        datasets: [
          {
            label: props.title,
            // data: [12, 19, 3, 5, 2, 3],
            data: props.groupCount,
            backgroundColor: 
            // 'rgba(153, 102, 255, 0.2)',        
            [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: 
            // "#0000af",
            // borderColor: 'rgba(153, 102, 255, 1)',
            [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }

    return(
        <div style={{width: "50%", margin:"auto", border:"1px solid #0000af"}}>
            <Pie data={data} />
        </div>
    )
};

export default PieChart;