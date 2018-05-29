import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { broadcast } from '../socket';

import { changeMemberActivity } from '../store/actions/members';

import TopBar from '../ui/TopBar';
import ToolBar from '../ui/ToolBar';
import Stage from '../ui/Stage';
import Elements from '../ui/Elements';
import Properties from '../ui/Properties';
import Modal from '../ui/Modal';

const Layout = styled.div`
  display: grid;
  grid-template-rows: calc(1.4rem * 3.5) 1fr 1fr;
  grid-template-columns: calc(1.4rem * 2.5) 1fr calc(1.4rem * 18);
  grid-template-areas: "topbar topbar topbar" 
                       "toolbar stage properties"
                       "toolbar stage elements";
  height: 100%;
`;

class Room extends React.Component {
  constructor(props){
    super(props);
    this.setActivity = this.setActivity.bind(this);
  }

  componentDidMount(){
    window.addEventListener("visibilitychange", this.setActivity);
  }
  
  componentWillUnmount(){
    window.removeEventListener("visibilitychange", this.setActivity);
  }

  setActivity(event){
    const { userId } = this.props;
    broadcast(userId, changeMemberActivity(userId, !document.hidden));
  }

  render() {
    return (
      <React.Fragment>
        <Layout>
          <TopBar/>
          <ToolBar/>
          <Stage/>
          <Elements/>
          <Properties/>
        </Layout>
        <Modal/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

export default connect(mapStateToProps)(Room);