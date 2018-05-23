import React from 'react';
import styled from 'styled-components';

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

const Room = () => (
  <React.Fragment>
    <Layout>
      <TopBar/>
      <ToolBar/>
      <Stage/>
      <Elements/>
      <Properties/>
    </Layout>
    {
      false &&
      <Modal title='Tytuł'>
        Treść
      </Modal>
    }
  </React.Fragment>
);

export default Room;