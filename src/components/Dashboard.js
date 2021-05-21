import React from 'react';
import { DashboardNavBar, DashboardNavTree } from './DashboardNav';
import "../styles/App.css";

function Dashboard(props) {
  // console.log(props);
  return (
    <div className="Dashboard">
      <DashboardNavBar />
      <DashboardNavTree user={props.user} handleUser={props.handleUser} />
    </div>
  );
}

export default Dashboard;
