import React, {useEffect, useState} from 'react'
import '../../../styles/home.css';
import VerticalBar from './VerticalChart';
import SummaryHeader from '../issues/SummaryHeader';
import ReactLoading from 'react-loading';
import Fire from "../../../Fire";
import firebase from 'firebase';

export default function Home({ page }) {
    let db = Fire.firestore();
    const [dataFromDb, setDataFromDb] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [groupLabel, setGroupLabel] = useState();
    const [groupCount, setGroupCount] = useState();
    const [summaryLabel, setSummaryLabel] = useState();
    const [summaryCount, setSummaryCount] = useState();
    const [summaryDataObj, setSummaryDataObj] = useState([]);

    useEffect(() =>{
        let dataArr = [];
        let sumData = [];
        // run only once to initialize
        db.collection("testUserData")
          .onSnapshot(snapshot => {
            let ob = {
                tId: "",
                email:"",
                name:"",
                issue:"", //issue is description in db
                priority: "",
                dateTime:"",
                group:"",
                team:"",
                status:"",
            } 
            snapshot.docs.map(doc => {
                ob = {
                    tId: doc.id,
                    email: doc.data().email,
                    name:doc.data().name,
                    issue:doc.data().description, 
                    priority: doc.data().priority,
                    dateTime:doc.data().dateTime,
                    group:doc.data().group,
                    team:doc.data().team,
                    status:doc.data().status ? doc.data().status: "open",
                };
                dataArr.push(ob);
            })
            setDataFromDb(dataArr);

            dataArr.map((e) => {
                let s = e.status ? e.status : "open";
                let p = e.priority;
                if(sumData.filter(a => a.name.toLowerCase() === s.toLowerCase()).length < 1){
                    let sCount = dataArr.filter(i => i.status === s).length;
                    sumData.push({
                        name: s,
                        data: sCount,
                    })
                }
                if(sumData.filter(a => a.name.toLowerCase() === p.toLowerCase()).length < 1) {
                    let pCount = dataArr.filter(i => i.priority === p).length;
                    sumData.push({
                        name: p,
                        data: pCount,
                    })
                }
            })
            if(sumData.filter(a => a.name.toLowerCase() === "pending").length < 1){
                sumData.push({
                    name: "Pending",
                    data: 0,
                })
            }
            if(sumData.filter(a => a.name.toLowerCase() === "done").length < 1){
                sumData.push({
                    name: "Done",
                    data: 0,
                })
            }
            if(sumData.filter(a => a.name.toLowerCase() === "high").length < 1){
                sumData.push({
                    name: "High",
                    data: 0,
                })
            }
            if(sumData.filter(a => a.name.toLowerCase() === "medium").length < 1){
                sumData.push({
                    name: "Medium",
                    data: 0,
                })
            }
            if(sumData.filter(a => a.name.toLowerCase() === "low").length < 1){
                sumData.push({
                    name: "Low",
                    data: 0,
                })
            } 
            if(sumData.filter(a => a.name.toLowerCase() === "open").length < 1){
                sumData.push({
                    name: "Open",
                    data: 0,
                })
            }
            setSummaryDataObj(sumData);

            setTimeout(function() {
                //your code to be executed after 1 second
                setIsLoading(false)
              }, 1000);
        })
    }, [page])

    useEffect(() => {
        // handle types of groups and count of them
        let data = dataFromDb ? dataFromDb : [];
        let dcount = [];
        let gLabel = [];
        let gCount = [];

        let scount = summaryDataObj ? summaryDataObj : [];
        let sLabel = [];
        let sCount = [];

        data.map((e) => {
            let g = e.group;
            if(dcount.filter(a => a.name === g).length < 1) {
                let count = data.filter(i => i.group === g).length;
                dcount.push({
                    name: g,
                    count: count,
                })
            }
        })

        dcount.map((e) => {
            gLabel.push(e.name);
            gCount.push(e.count);
        })

        scount.map((e) => {
            sLabel.push(e.name);
            sCount.push(e.data);
        })

        // console.log(dcount);
        setGroupCount(dcount);
        setGroupLabel(gLabel);
        setGroupCount(gCount);

        setSummaryLabel(sLabel);
        setSummaryCount(sCount);
        // console.log(sLabel, sCount)
    }, [dataFromDb, summaryDataObj])

    return (
        <div>
            {
                isLoading ? (
                    <div style={{marginLeft:"50%", marginTop: "20%"}}>
                        <ReactLoading type={"spin"} color={"#0000af"} />
                    </div>
                ) : (
                <div>
                    <SummaryHeader summaryDataObj={summaryDataObj} title={"Issue Summary"}/>
                    <div style={{display:"flex", marginTop:"4vh"}}>            
                        <VerticalBar groupLabel={groupLabel} groupCount={groupCount} title={"Groups of Issues"}/>
                        <VerticalBar groupLabel={summaryLabel} groupCount={summaryCount} title={"Summary of Issues"}/>
                    </div>
                </div>)
            }
        </div>
    )
}
