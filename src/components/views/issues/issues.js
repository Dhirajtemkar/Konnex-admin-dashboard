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
import SummaryHeader from './SummaryHeader';



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

export default function Issues() {
    const [dummyData, setDummyData] = useState(Data);
    const originalData = Data;
    const classes = useStyles();
    const [jumpPage, setJumpPage] = useState();
    const [pageSelected, setPageSelected] = useState(1);
    const [searchedIssue, setSearchedIssue] = useState("");
    const [filtersApplied, setFiltersApplied] = useState([]);
    const [filterActive, setFilterActive] = useState();
    const [selfAssignedIssues, setSelfAssignedIssues] = useState([]);

    const countOfEachPage = 10;
    const countOfPages = dummyData.length / countOfEachPage;
    
    useEffect(() => {
        if(searchedIssue){} else {
            setDummyData(Data);
        }
        if(filtersApplied.length !==0){
            let data = dummyData;
            const filters = filtersApplied;
    
            // filters.map((e) => {
            //     if(e === "Un-Applied"){
            //         data = data.filter(i => i.status === "Un-Assigned");
            //     } else if(e === "Group L1") {
            //         data = data.filter(i => i.group === "Group L1");
            //     }
            // })
            // console.log(data);
            // setDummyData(data);
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

    const featureApplication = (val) => {
        let dataGot = dummyData;
        // const filters = filtersApplied;

        let data = filtersApplied;
        let loc = false;
        data.map((e, i) => {
            if(e === val){
                data.splice(i, 1);
                loc = true;
                // return false;
            }
        })
        if (loc === false) {
            // setFiltersApplied()
            data.push(val)
            // return true;
        }
        // console.log(data)
        setFiltersApplied(data)

        // data.map((e) => {
        //     if(e === "Un-Applied"){
        //         dataGot = dataGot.filter(i => i.status === "Un-Assigned");
        //     } else if(e === "Group L1") {
        //         dataGot = dataGot.filter(i => i.group === "Group L1");
        //     }
        // })
        // console.log(dataGot);
        // setDummyData(dataGot);

        // let resultData = dataGot.filter(i => )
    }

    // useEffect(() => {
    //     let data = dummyData;
    //     const filters = filtersApplied;

    //     filters.map((e) => {
    //         if(e === "Un-Applied"){
    //             data = data.filter(i => i.status === "Un-Assigned");
    //         } else if(e === "Group L1") {
    //             data = data.filter(i => i.group === "Group L1");
    //         }
    //     })
    //     // console.log(data);
    //     setDummyData(data);
    // },[filterActive])

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
                    {/*<div className="filterDiv">
                        <FilterBtn name="Un-Assigned" featureApplication={featureApplication} setFilterActive={setFilterActive}/>
                        <FilterBtn name="Group L1" featureApplication={featureApplication} setFilterActive={setFilterActive}/>

    </div>*/}
                </div>
                
                <IssueTable 
                    dummyData={dummyData} 
                    countOfEachPage={countOfEachPage} 
                    pageSelected={pageSelected}
                    selfAssignIssue={selfAssignIssue}     
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
