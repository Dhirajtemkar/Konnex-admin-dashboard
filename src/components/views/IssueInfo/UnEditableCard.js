import React, {useState} from 'react'
import '../../../styles/issueInfo.css';
import Button from '@material-ui/core/Button';
import SendEmailModel from './SendEmailModel';


function UnEditableCard(props) {
    const data = props.data ? props.data : {};
    const [delModal, setDelModal] = useState(false);

    const handleDeleteModalOpen = () => {
        setDelModal(true)
        // setAnchorEl(null);
    }
    const handleDeleteModalClose = () => {
        setDelModal(false)
    }
    return (
        <div className="nonEditableCard">
            {/*this is the header section*/}
            <div className="infoFormHeader">
                <p>User Collected Information</p>
            </div>
            <div className="nonEditableHeader">
                <p>Personal Info</p>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Name: </div>
                <div className="eachSectionData">{data.name}</div>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Email: </div>
                <div className="eachSectionData">{data.email}</div>
            </div>

            <div className="borderDiv"/>
            <div className="nonEditableHeader">
                <p>Issue Info</p>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Issue Id: </div>
                <div className="eachSectionData">{data.tId}</div>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Issue Description: </div>
                <div className="eachSectionData">{data.issue}</div>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Reporting Time: </div>
                <div className="eachSectionData">{data.timestamp}</div>
            </div>
            <div className="borderDiv"/>
            
            <div className="bottomEmailBtn">
                <div className="emailBtn">
                <Button variant="contained" color="primary" onClick={handleDeleteModalOpen}>
                    Email User
                </Button>
                {
                    delModal ? (
                        <SendEmailModel data={props.data} delClose={handleDeleteModalClose} delModal={delModal} setDelModal={setDelModal}/>
                    ) : (<div />)
                }
                </div>
                <div className="footNote">
                    <span>note*:</span>
                    The current info related to the issue will be mailed to the user.
                </div>
            </div>
        </div>
    )
}

export default UnEditableCard
