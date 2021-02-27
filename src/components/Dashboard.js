import React from 'react';
import { DashboardNavBar, DashboardNavTree } from './DashboardNav';

function Dashboard() {
  return (
    <div className="Dashboard">
      <DashboardNavBar />
      <DashboardNavTree />
    </div>
  );
}

export default Dashboard;
