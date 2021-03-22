import React, {useState, useEffect} from 'react'
import '../../../styles/issueInfo.css';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import UnEditableCard from './UnEditableCard';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
function IssueInfo(props) {
    // console.log(props.location.state);
    const classes = useStyles();
    const IssueViewed = props.location.state.issueInfo ? props.location.state.issueInfo : {};
    const [editBtn, setEditBtn] = useState();
    const [value, setValue] = React.useState("");
    const [issueUpdate, setIssueUpdate] = useState({

    })
    // {tId:"", 
    // name:"", 
    // email:"", 
    // timestamp:"", 
    // issue:"", 
    // group:"", 
    // status:"",
    // team: "",
    // solution: "",
    // resTime: "",
    // assignedTo: "",}

    useEffect(() => {
        const data = IssueViewed;
        setValue(data.resTime)
        setIssueUpdate(data);
    }, [])

    const updateValue = (type, val) => {
        let data = issueUpdate;
        if(type === "team"){
            data = {
                ...data, team: val.target.value,  
            }
        } else if (type === "group") {
            data = {
                ...data, group: val.target.value,  
            }
        } else if (type === "solution") {
            data = {
                ...data, solution: val.target.value,  
            }
        } else if (type === "status") {
            data = {
                ...data, status: val.target.value,  
            }
        } else if (type === "resTime") {
            data = {
                ...data, resTime: val.target.value,  
            }
        } else if (type === "assignedTo") {
            data = {
                ...data, assignedTo: val.target.value,  
            }
        }
        setIssueUpdate(data)
    }
    
    const handleEditBtn = () => {
        setEditBtn(!editBtn)
    }


    const handleChange = (event) => {
        let data = issueUpdate;

        data = {
            ...data, resTime: event.target.value,
        }
        setIssueUpdate(data)
        setValue(event.target.value);
    };

    return (
        <div className="issueInfoMain">
            <div className="infoHeader">
                <p>IssueInfo</p>
                <div>Issue Id: <span>{IssueViewed.tId}</span></div>
            </div>

            {/*this is the main section*/}
            <div className="mainSection">
                {/*this is the left side section*/}

                <div className="issueInfoFormDiv">
                    {/*this is the header section*/}
                    <div className="infoFormHeader">
                        <p>Information about the Issue</p>
                        <Button
                            variant="contained"
                            color={editBtn ? "secondary" : "default"}
                            size="small"
                            className={classes.button}
                            endIcon={<EditIcon />}
                            onClick={handleEditBtn}
                        >
                            Edit
                        </Button>
                    </div>

                    {/*this is the first section*/}
                    <div className="eachBlockForm">
                        <div className="nonEditableHeader">
                            <p>Model Data</p>
                        </div>  
                        <div className="eachFormInputArea">
                            <TextField
                                id="outlined-textarea"
                                label="Team Assigned"
                                placeholder="Team"
                                multiline
                                variant="outlined"
                                margin="dense"
                                value={issueUpdate.team}
                                onChange={(val) => updateValue("team", val)}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Group Assigned"
                                placeholder="Group"
                                multiline
                                variant="outlined"
                                margin="dense"
                                value={issueUpdate.group}
                                onChange={(val) => updateValue("group", val)}
                            />
                        </div>
                    </div>

                    <div className="borderDiv"/>
                    {/*this is the second section*/}
                    <div className="eachBlockForm">
                        <div className="nonEditableHeader">
                            <p>Process Data</p>
                        </div>
                        <div className="eachFormInputArea">
                            <TextField
                                id="outlined-textarea"
                                label="Ticket Status"
                                placeholder="Status"
                                multiline
                                variant="outlined"
                                margin="dense"
                                value={issueUpdate.status}
                                onChange={(val) => updateValue("status", val)}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Assigned To"
                                placeholder="Employee Name"
                                multiline
                                variant="outlined"
                                margin="dense"
                                value={issueUpdate.assignedTo}
                                onChange={(val) => updateValue("assignedTo", val)}
                            />
                        </div>
                        <div className="eachFormInputArea">
                            <TextField
                                label="Solution"
                                placeholder="The solution to the issue reported is..."
                                // helperText="Full width!"
                                fullWidth
                                multiline
                                id="outlined-multiline-static"
                                row={5}
                                rowsMax={Infinity}
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                variant="outlined"
                                value={issueUpdate.solution}
                                onChange={(val) => updateValue("solution", val)}
                            />
                        </div>
                        <div className="nonEditableHeader">
                            <p>Recommended resolution time</p>
                        </div>
                        <div className="eachFormInputArea">
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="1-day" control={<Radio color="primary" />} label="1 day priority resolution." />
                                <FormControlLabel value="3-days" control={<Radio color="primary" />} label="3 days general resolution" />
                                <FormControlLabel value="5-days" control={<Radio color="primary" />} label="5 days general resolution" />
                                <FormControlLabel value="1-week" control={<Radio color="primary" />} label="1 week extensive resolution" />
                            </RadioGroup>
                        </div> 
                    </div>

                    <div className="borderDiv"/>
                    {/*this is the footer section*/}
                    <div className="eachBlockForm">
                    <div className="bottomUpdateBtn">
                        <div className="updateBtn">
                        {
                            editBtn ? (
                                <Button variant="contained" color="primary" onClick={() => {console.log(issueUpdate)}} >
                                    Update Ticket
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => {}} disabled>
                                    Update Ticket
                                </Button>
                            )
                        }
                        {
                            // editBtn
                            // delModal ? (
                            //     <SendEmailModel data={props.data} delClose={handleDeleteModalClose} delModal={delModal} setDelModal={setDelModal}/>
                            // ) : (<div />)
                        }
                        </div>
                        
                    </div>
                    <div className="footNote">
                        <span>note*:</span>
                        The current info related to the ticket will be updated.
                    </div>
                    </div>
                </div>

                <div className="spaceClass"/>
                
                {/*this is the right side section*/}
                <UnEditableCard data={IssueViewed}/>
            </div>
                   

        </div>
    )
}

export default IssueInfo
