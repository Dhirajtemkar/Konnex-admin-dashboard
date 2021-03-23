import React, {useState, useEffect} from 'react'
import {Link, Route, Switch, useLocation} from 'react-router-dom';
import IssueInfo from '../IssueInfo/IssueInfo';
import Issues from './issues';
import Fire from "../../../Fire";
import firebase from "firebase";

function MainIssue() {
    // const db = Fire.firestore();
    // const [dataFromDb, setDataFromDb] = useState([])

    // useEffect(() =>{
    //     let dataArr = [];
    //     // run only once to initialize
    //     db.collection("testUserData")
    //       .onSnapshot(snapshot => {
    //         let ob = {
    //             tId: "",
    //             email:"",
    //             name:"",
    //             issue:"", //issue is description in db
    //             priority: "",
    //             dateTime:"",
    //             group:"",
    //             team:"",
    //             status:"",
    //         } 
    //         snapshot.docs.map(doc => {
    //             ob = {
    //                 tId: doc.id,
    //                 email: doc.data().email,
    //                 name:doc.data().name,
    //                 issue:doc.data().description, 
    //                 priority: doc.data().priority,
    //                 dateTime:doc.data().dateTime,
    //                 group:doc.data().group,
    //                 team:doc.data().team,
    //                 status:"",
    //             };
    //             dataArr.push(ob);
    //         })
            
    //     });

    //     // setDummyData(dataArr);
    //     setDataFromDb(dataArr);
    //     // if(prevData && !_.isEqual(prevData, data)) {
    //     // }
    //     console.log(dataArr);
    // }, [dataFromDb])

    return (
        <div>
            <Switch>
                <Route 
                exact 
                path="/dashboard/issues/" 
                // component={Issues}
                render={() => <Issues />} 
                />
                <Route path="/dashboard/issues/moreInfo" component={IssueInfo} />

                <Route exact path="/dashboard/issues" component={Issues} />
            </Switch>
        </div>
    )
}

export default MainIssue
