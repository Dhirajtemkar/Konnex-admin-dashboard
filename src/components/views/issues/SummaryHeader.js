import React, {useState, useEffect} from 'react'
import '../../../styles/issues.css';

export default function SummaryHeader(props){
    const data = props.data;
    let summaryData = [
        {name: "Overdue", data: 40},
        {name: "Open", data: 26},
        {name: "On Hold", data: 12},
        {name: "Due Today", data: 7},
        {name: "Unassigned", data: 55},
    ];

    useEffect(() => {
        let overdue = 0;
        let open = 0;
        let onHold = 0;
        let dueToday = 0;
        let unAssigned = 0;

        data.map((e) => {
            if(e.status === "Un-Assigned"){
                unAssigned = unAssigned + 1;
            }
        })

        summaryData.map((e) => {
            if(e.name === "Unassigned"){
                e.data = unAssigned;
            }
        })
    }, [data])
    
    const IndividualSummary = ({name, data, index}) => {
        return (
            <div className="eachBox">
                <div className="overViewE">
                    <p className="overViewT">{name}</p>
                    <p className={data < 35 ? "overViewN" : "overViewNRed"}>{data}</p>
                </div>
                {
                    index > 3 ? (<div/>) : (<div className="divider" />)
                }
                
            </div>
        )
    }

    return (
        <div className="header">
            {/*<p className="headerT..">Issue Summary</p>*/}
            <div className="tableTitle">
                Issue Summary
            </div>
            <div className="overView">
            {summaryData.map((e, i) => (<IndividualSummary name={e.name} data={e.data} index={i}/>))}
            </div>
        </div>
    )
}
