import React from 'react';
import './css/DashboardPage.css'
import SideBar from '../components/SideBar';
import DBTile from '../components/DBTile';
import {ic_receipt_outline} from 'react-icons-kit/md/ic_receipt_outline'
import {arrowRightOutline} from 'react-icons-kit/typicons/arrowRightOutline'
import {play} from 'react-icons-kit/icomoon/play'
import {list} from 'react-icons-kit/ikons/list'

function DashboardPage() {

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard-content">
        <p>Welcome to your dashboard</p>
        <div className="dashboard-content-subtitle">Take the first step towards video creation excellence. Your choices await! </div>
        <div className="dashboard-tiles">
          <DBTile
            icon1={{'icon': list, 'size': 30}}
            icon2={{'icon': arrowRightOutline, 'size': 28}}
            icon3={{'icon': play, 'size': 32}}    
            text={"Title to Video"} 
            link = {"/title"}
            buttonName = "Continue"
          />
          <DBTile 
            icon1={{'icon': ic_receipt_outline, 'size': 32}}
            icon2={{'icon': arrowRightOutline, 'size': 28}}
            icon3={{'icon': play, 'size': 32}}            
            text={"Script to Video"}
            link = {"/dashboard"}
            buttonName = "Coming Soon"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;