import React, {useState, useEffect} from 'react'
import '../../../styles/issues.css';
import IssueTable from './table';
import { Data } from "../../../assets/data/dummyData";
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import TextField from '@material-ui/core/TextField';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


function SummaryHeader(props){
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
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(0),
      marginLeft: theme.spacing(1),
    },
  }));

export default function Issues() {
    const [dummyData, setDummyData] = useState(Data);
    const originalData = Data;
    const classes = useStyles();
    const [jumpPage, setJumpPage] = useState();
    const [pageSelected, setPageSelected] = useState(1);
    const [searchedIssue, setSearchedIssue] = useState("");

    const countOfEachPage = 10;
    const countOfPages = dummyData.length / countOfEachPage;
    
    useEffect(() => {
        if(searchedIssue){

        } else {
            setDummyData(Data);
        }
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
            setDummyData(Data)
        }
    }
    function findIssueInfo(issue, searchString){
        return issue.toLowerCase().includes(searchString.toLowerCase());
    }
    const handleSearchBtn = () => {
        const data = dummyData;

        if(searchedIssue === null || searchedIssue === "") {
            setDummyData(Data)
        } else {
            let searchResult = data.filter(i => findIssueInfo(i.issue, searchedIssue));
            setDummyData(searchResult);
            setPageSelected(1);
        }
    }
    const [filterApplied, setFilterApplied] = useState([])

    const handleFilterApplication = (val) => {
        let data = filterApplied;
        let loc = false;
        data.map((e, i) => {
            if(e === val){
                data.splice(i, 1);
                loc = true;
                // return false;
            }
        })
        if (loc === false) {
            data.push(val)
            // return true;
        }
        console.log(data)
        setFilterApplied(data)
    }

    return (
        <div>
            <SummaryHeader data={originalData} />
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
                    <div className="filterDiv">
                        <div 
                        onClick={() => handleFilterApplication("Un-Assigned")} 
                        className={
                            filterApplied.filter(i => i == "Un-Assigned").length !== 1  ? "filterBtn" : "selectedFilterBtn"}
                        >
                            Un-Assigned
                        </div>
                        <div 
                        onClick={() => handleFilterApplication("Assigned")} 
                        className={
                            filterApplied.filter(i => i == "Assigned").length !== 1 ? "filterBtn" : "selectedFilterBtn"}
                        >
                            Assigned
                        </div>
                    </div>
                </div>
                
                <IssueTable 
                    dummyData={dummyData} 
                    countOfEachPage={countOfEachPage} 
                    pageSelected={pageSelected}     
                />
                
                <div className="pagination">
                    <div onClick={() => jumpPageBtnClick("backward")} 
                        className={jumpPage === "backward" ? "selectedPaginationIcon" : "paginationIcon"}>
                        <div><ChevronLeftRoundedIcon /></div>
                    </div>
                    <ul className="paginationUl">
                        {paginationBar()}
                    </ul>
                    <div onClick={() => jumpPageBtnClick("forward")} 
                        className={jumpPage === "forward" ? "selectedPaginationIcon" : "paginationIcon"}>
                        <div><ChevronRightRoundedIcon /></div>
                    </div>                
                </div>
            </div>

            
        </div>
    )
}
