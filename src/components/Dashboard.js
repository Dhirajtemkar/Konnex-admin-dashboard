import React from 'react';
import { DashboardNavBar, DashboardNavTree } from './DashboardNav';
import "../styles/App.css";

function Dashboard(props) {
  // console.log(props);
  return (
    <div className="Dashboard">
      <DashboardNavBar />
      <DashboardNavTree />
    </div>
  );
}

export default Dashboard;
