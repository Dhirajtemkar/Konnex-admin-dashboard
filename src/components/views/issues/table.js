import React, {useState, useEffect} from 'react'
import "../../../styles/issues.css";
import { IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link, Route, Switch, useHistory} from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SpringModal from './DeleteModel';

function ActionBtn (props) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [delModal, setDelModal] = useState(false);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAction = () => {
        history.push({
            pathname: '/dashboard/issues/moreInfo',
            state: {
                name: "dhiraj",
                tId: props.data.tId,
            }
        })
    }

    const handleSelfAssign = () => {
        props.selfAssignIssue(props.data)
        handleClose()
    }

    const handleDeleteModalOpen = () => {
        setDelModal(true)
        // setAnchorEl(null);
    }
    const handleDeleteModalClose = () => {
        setDelModal(false)
        setAnchorEl(null);
    }
    return (
        <div style={{zIndex: 10}}>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="actionBtn"
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                maxHeight: 40 * 4,
                width: '20ch',
                },
            }}
            >        
                <MenuItem onClick={handleAction}>
                    <div >Action</div>
                </MenuItem>
                {
                    props.data.status === "Un-Assigned" ? (
                        <MenuItem onClick={handleSelfAssign}>
                            <div >Self Assign</div>
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleSelfAssign} disabled>
                            <div >Self Assign</div>
                        </MenuItem>
                    )
                }
                
                <MenuItem onClick={() => handleDeleteModalOpen()}>
                    <div style={{color: "red"}}>Delete</div>
                </MenuItem>
            </Menu>
            {
                delModal ? (
                    <SpringModal delInfo={props.data} delClose={handleDeleteModalClose} delModal={delModal} setDelModal={setDelModal}/>
                ) : (<div />)
            }
            
        </div>
    )
}

function IssueTable(props) {
    const dummyData = props.dummyData ? props.dummyData : [];
    // const [dummyData, setDummyData] = useState()
    const history = useHistory();
    const handleAction = (id) => {
        let selectedIssue = {};
        dummyData.map((e) => {
            if (e.tId === id){
                selectedIssue = e;
            }
        })
        history.push({
            pathname: '/dashboard/issues/moreInfo',
            state: {
                name: "dhiraj",
                tId: id,
                issueInfo: selectedIssue,
            }
        })
    }

    const [dataDisplayed, setDataDisplayed] = useState([]);

    // const tableDisplay = () => {

    // }
    
    useEffect(() => {
        let arr = [];
        const lastElement = (props.countOfEachPage * props.pageSelected) + 1;
        const firstElement = (lastElement - props.countOfEachPage) - 1; 
        dummyData.map((e, i)=>{
            let now = i+1;
            if(now > firstElement && now < lastElement){
                arr.push(e);
            }
        })

        setDataDisplayed(arr)
    }, [props.pageSelected, dummyData])

    return (
        <div className="table">
            <table>
                <tr className="tableHeader" style={{borderBottom: "1px solid #0000af"}}>
                    <th><p>Transaction Id</p></th>
                    <th><p>Issue</p></th>
                    <th><p>Team</p></th>
                    <th><p>Group</p></th>
                    <th><p>Status</p></th>
                    <th><p>Action</p></th>
                </tr>
                <tbody>
                    {
                        dataDisplayed.map((data, i) => {
                            return (
                                <tr className="eachRow" key={data.tId}  >
                                    <td onClick={() => handleAction(data.tId)}><p style={{marginLeft:"10px"}}>{data.tId}</p></td>
                                    <td onClick={() => handleAction(data.tId)} width="55%"><p className="issueTd">{data.issue}</p></td>
                                    <td onClick={() => handleAction(data.tId)}><p>{data.team}</p></td>
                                    <td onClick={() => handleAction(data.tId)}><p>{data.group}</p></td>
                                    <td onClick={() => handleAction(data.tId)}><p>{data.status}</p></td>
                                    <td><ActionBtn data={data} selfAssignIssue={props.selfAssignIssue}/></td>
                                </tr>   
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default IssueTable;
