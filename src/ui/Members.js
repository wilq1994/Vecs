import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Avatar from './Avatar';

const List = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;
  ${ Avatar }:last-child {
    margin-left: 2.1rem;
    position: relative;
    &:before {
      content: '';
      display: block;
      background: #d9d9d9;
      top: 5px;
      bottom: 5px;
      position: absolute;
      right: 100%;
      width: 1px;
      margin-right: 1.05rem;
    }
  }
`;

const Members = ({ user, members }) => {
  return (
    <List>
      {
        members.map((member, id) => (
          <Avatar key={ id } login={ member.login } hue={ member.hue } inactive={ !member.active } speak={ member.speak }/>
        ))
      }
      <Avatar login={ user.login } hue={ user.hue } speak={ user.speak }/>
    </List>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  members: state.members
});

export default connect(mapStateToProps)(Members);