import React, {useState, useEffect, useRef} from 'react'
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import TextField from '@material-ui/core/TextField';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';
import firebase from "firebase";
import Fire from "../../../Fire";
import '../../../styles/issues.css';
import IssueTable from '../issues/table';
import { Data } from "../../../assets/data/dummyData";
import SummaryHeader from '../issues/SummaryHeader';
import lodash from 'lodash';
import isEqual from 'lodash/isEqual'
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');



function FilterBtn (props) {
    const [BtnClicked, setBtnClicked] = useState()

    const handleClick = (val) => {
        setBtnClicked(!BtnClicked)
        props.setFilterActive(!BtnClicked)
        props.featureApplication(props.name)
    }

    return(
        <div 
        onClick={handleClick} 
        className={
            BtnClicked ? "selectedFilterBtn" : "filterBtn"}
        >
            {props.name}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0),
      marginLeft: theme.spacing(1),
    },
  }));

// Hook
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
let dataArr = [];
export default function MyTask({page, user}) {
    const db = Fire.firestore();

    const [isLoading, setIsLoading] = useState(true);
    const [dataFromDb, setDataFromDb] = useState([])
    const [dummyData, setDummyData] = useState([]);
    const originalData = Data;
    const classes = useStyles();
    const [jumpPage, setJumpPage] = useState();
    const [pageSelected, setPageSelected] = useState(1);
    const [searchedIssue, setSearchedIssue] = useState("");
    const [filtersApplied, setFiltersApplied] = useState([]);
    // const [filterActive, setFilterActive] = useState();
    const [selfAssignedIssues, setSelfAssignedIssues] = useState([]);
    const [summaryDataObj, setSummaryDataObj] = useState([]);
    const countOfEachPage = 10;
    const countOfPages = dummyData ? dummyData.length / countOfEachPage : 0;
    
    const prevData = usePrevious(dummyData);

    
    useEffect(() =>{
        // let data = Data;
        // run only once to initialize
        dataArr = [];
        let sumData = [];

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
                assignedTo:"",
                resTime:"",
                solution:"",
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
                    assignedTo:doc.data().assignedTo ? doc.data().assignedTo: "",
                    resTime:doc.data().resTime ? doc.data().resTime: "",
                    solution:doc.data().solution ? doc.data().solution: "", 
                };
                dataArr.push(ob);
            })
            setDummyData(dataArr);
            setDataFromDb(dataArr);    

        // sumData = [{name: "pending", data:1}, {name:"done", data:1}, {name:"high", data:1}]
// status=== pending, done, priority === high,medium,low
        dataArr.map((e) => {
            let s = e.status;
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
        setSummaryDataObj(sumData);

        setTimeout(function() {
            //your code to be executed after 1 second
            setIsLoading(false)
          }, 500);

        });
//         let sumData = [];
//         // sumData = [{name: "pending", data:1}, {name:"done", data:1}, {name:"high", data:1}]
// // status=== pending, done, priority === high,medium,low
//         dataArr.map((e) => {
//             let s = e.status;
//             let p = e.priority;
//             if(sumData.filter(a => a.name === s).length < 1){
//                 let sCount = dataArr.filter(i => i.status === s).length;
//                 sumData.push({
//                     name: s,
//                     data: sCount,
//                 })
//             }
//             // if(sumData.filter(a => a.name === p).length < 1) {
//             //     let pCount = dataArr.filter(i => i.priority === p).length;
//             //     sumData.push({
//             //         name: p,
//             //         data: pCount,
//             //     })
//             // }
//         })
//         setSummaryDataObj(sumData);
        console.log(sumData);
        // if(prevData && !_.isEqual(prevData, data)) {
        // }
        // console.log(dataArr);
        // dataArr
    }, [page])

    useEffect(() => {
        if(searchedIssue){} else {
            setDummyData(dataFromDb);
        }
        // if(filtersApplied.length !==0){
        //     let data = dummyData;
        //     const filters = filtersApplied;
        // }
    }, [searchedIssue])

    const paginationBar = () => {
        let listOfPages = [];
        for(let i=0; i<countOfPages; i++){
            const l = <li 
                        className={pageSelected === i+1 && jumpPage === null ? "selectedPageBtn" : "PageBtn"} 
                        onClick={() => {
                            setJumpPage(null);
                            setPageSelected(i+1);
                        }}
                      >{i+1}</li>;
            listOfPages.push(l);
        }
        return listOfPages.map((e) => (e));
    }

    const jumpPageBtnClick = (val) => {
        // setPageSelected(null) 
        setJumpPage(val)
    }

    const handleSearch = (event) => {
        setSearchedIssue(event.target.value)
        if(searchedIssue === ""){
            setDummyData(dataFromDb)
        }
    }

    function findIssueInfo(issue, searchString){
        return issue.toLowerCase().includes(searchString.toLowerCase());
    }

    const handleSearchBtn = () => {
        const data = dummyData;

        if(searchedIssue === null || searchedIssue === "") {
            setDummyData(dataFromDb)
        } else {
            let searchResult = data.filter(i => findIssueInfo(i.issue, searchedIssue));
            setDummyData(searchResult);
            setPageSelected(1);
        }
    }

    // const featureApplication = (val) => {
    //     let dataGot = dummyData;

    //     let data = filtersApplied;
    //     let loc = false;
    //     data.map((e, i) => {
    //         if(e === val){
    //             data.splice(i, 1);
    //             loc = true;
    //         }
    //     })
    //     if (loc === false) {
    //         data.push(val)
    //     }
    //     // console.log(data)
    //     setFiltersApplied(data)

    // }

    const selfAssignIssue = (val) => {
        let data = selfAssignedIssues;

        const existData = data.filter(i => i.tId === val.tId);

        if(existData.length === 0){
            data.push(val)
        } else {}
        console.log(data)
        setSelfAssignedIssues(data)
    }

    return (
        <div>
            {
                isLoading ? (
                    <div style={{marginLeft:"50%", marginTop: "20%"}}>
                        <ReactLoading type={"spin"} color={"#0000af"} />
                    </div>
                ) : (
                    <div>
                        <SummaryHeader data={originalData} summaryDataObj={summaryDataObj}/>
                        {/*this is where the table view will be in issues to view differnt incomming issues*/}
                        <div className="issuesTableView">
                            <div className="tableTitle">
                                General Issues
                            </div>
                            <div className="searchFilterBar">
                                <div className="searchDiv">
                                <TextField
                                    id="outlined-textarea"
                                    label="Multiline Placeholder"
                                    placeholder="Placeholder"
                                    multiline
                                    size="small"
                                    variant="outlined"
                                    onChange={handleSearch}
                                    // className="searchBar"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<SearchRoundedIcon />}
                                    onClick={handleSearchBtn}
                                >
                                    Search
                                </Button>
                                </div>
                                {/*<div className="filterDiv">
                                    <FilterBtn name="Un-Assigned" featureApplication={featureApplication} setFilterActive={setFilterActive}/>
                                    <FilterBtn name="Group L1" featureApplication={featureApplication} setFilterActive={setFilterActive}/>
                </div>*/}
                            </div>
                            
                            <IssueTable 
                                dataArr={dataArr}
                                dummyData={dummyData} 
                                countOfEachPage={countOfEachPage} 
                                pageSelected={pageSelected}
                                selfAssignIssue={selfAssignIssue}  
                                user={user}   
                            />
                            
                            <div className="pagination">
                                
                                <ul className="paginationUl">
                                    {
                                        jumpPage === "forward" ? (<div style={{padding:"1vh"}}>...</div>) : null
                                    }
                                    {paginationBar()}
                                    {
                                        jumpPage === "backward" ? (<div style={{padding:"1vh"}}>...</div>) : null
                                    }
                                </ul>
                                
                                <div onClick={() => jumpPageBtnClick("backward")} 
                                    className={jumpPage === "backward" ? "selectedPaginationIcon" : "paginationIcon"}>
                                    <div><ChevronLeftRoundedIcon /></div>
                                </div>
                                <div style={{padding:"1vh"}}>1-5</div>
                                <div onClick={() => jumpPageBtnClick("forward")} 
                                    className={jumpPage === "forward" ? "selectedPaginationIcon" : "paginationIcon"}>
                                    <div><ChevronRightRoundedIcon /></div>
                                </div>                
                            </div>
                        </div>

                        
                    </div>
                )
            }
        </div>
        
    )
}