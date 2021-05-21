import React, {useState} from 'react'
import '../../../styles/issueInfo.css';
import Button from '@material-ui/core/Button';
import SendEmailModel from './SendEmailModel';
import emailjs from 'emailjs-com';
import { DateRange } from '@material-ui/icons';
import SuccessEmail from "./SendEmailModel";

function UnEditableCard(props) {
    const data = props.data ? props.data : {};
    const [delModal, setDelModal] = useState(false);
    const [delSuccessModal, setDelSuccessModal] = useState(false);

    const handleDeleteModalOpen = () => {
        setDelModal(true)
        // setAnchorEl(null);
    }
    const handleDeleteModalClose = () => {
        setDelModal(false)
    }

    const handleSuccessModalOpen = () => {
        setDelSuccessModal(true)
        // setAnchorEl(null);
    }
    const handleSuccessModalClose = () => {
        setDelSuccessModal(false)
    }

    const sendEmail = (e) => {
        // e.preventDefault();
    
        let templateParams = {
            from_name: "Forward ITSM",
            to_name: 'dhiraj',
            to_email: data.email,   
            name: data.name,
            email: data.email,
            solution: props.issueUpdate.solution,
            resTime: props.issueUpdate.resTime,
            issue: data.issue,
            reply_to: data.email,
       }

       emailjs.send("gmail","template_dgizkn4",{
        from_name: "Fordward ITSM",
        tname: data.name,
        email: data.email,
        issue: data.issue,
        solution: props.issueUpdate.solution,
        resTime: props.issueUpdate.resTime,
        to_email: data.email,
        reply_to: "",
        }, 'user_308GmVOybpHk2JvRciU1z')
        .then((result) => {
              console.log(result.text);
            //   handleSuccessModalOpen()
          }, (error) => {
              console.log(error.text);
          });
        //   handleSuccessModalOpen()
      }
    return (
        <div className="nonEditableCard">
            {/*this is the header section*/}
            {
                delSuccessModal ? (
                    <SuccessEmail data={props.data} delClose={handleSuccessModalClose} delModal={delSuccessModal} setDelModal={setDelSuccessModal} />
                ) : (<div />)
            }
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
                <div className="eachSectionData">#{data.tId}</div>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Issue Description: </div>
                <div className="eachSectionData">{data.issue}</div>
            </div>
            <div className="eachSection">
                <div className="eachSectionLabel">Reporting Time: </div>
                <div className="eachSectionData">{data.dateTime}</div>
            </div>
            <div className="borderDiv"/>
            
            <div className="bottomEmailBtn">
                <div className="emailBtn">
                <Button variant="contained" color="primary" onClick={handleDeleteModalOpen}>
                    Email User
                </Button>
                {
                    delModal ? (
                        <SendEmailModel data={props.data} delClose={handleDeleteModalClose} delModal={delModal} setDelModal={setDelModal} sendEmail={sendEmail} handleSuccessModalOpen={handleSuccessModalOpen}/>
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
