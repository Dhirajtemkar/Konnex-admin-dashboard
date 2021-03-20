import React from 'react'

function IssueInfo(props) {
    // console.log(props.location.state);
    const IssueViewed = props.location.state.issueInfo ? props.location.state.issueInfo : {};

    return (
        <div>
            <h2>This is IssueInfo page</h2>
            <h2>Issue Id: {IssueViewed.tId}</h2>
            <h2>Issue title: {IssueViewed.issue}</h2>        

        </div>
    )
}

export default IssueInfo
