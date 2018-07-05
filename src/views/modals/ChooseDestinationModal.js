import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setDocumentDestination, LOCAL_DISK, GOOGLE_DRIVE } from '../../store/actions/document';

const Picker = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background: ${ props => props.checked ? 'border-color: var(--orange);' : '#f0f0f0' };
  font-size: 1rem;
  width: calc(1.4rem * 10);
  height: calc(1.4rem * 10);
  padding: 0;
  margin: 0.7rem 0 1.4rem;
  border-radius: 5px;
  border: 2px solid #f0f0f0;
  ${ props => props.checked && 'border-color: var(--orange);' }
  position: relative;
  cursor: pointer;
  &:before {
    content: '';
    display: block;
    background: url('../img/destination-picker.png') no-repeat left top;
    width: 96px;
    height: 84px;
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    margin: auto;
  }

  &:first-child {
    margin-right: 2.8rem;
  }

  &:nth-child(2):before {
    background-position: right top;
  }

  &:hover {
    border-color: rgba(255, 182, 0, 0.4);
    ${ props => props.checked && 'border-color: var(--orange);' }
  }

  span {
    margin-top: calc(1.4rem * 6.5);
    display: inline-block;
  }
`;

class ChooseDestinationModal extends React.Component {
  setDocumentDestination(destination){
    const { dispatch } = this.props;
    dispatch(setDocumentDestination(destination));
  }

  render() {
    const { destination } = this.props;
    
    return (
      <Picker>
        <Button onClick={ this.setDocumentDestination.bind(this, LOCAL_DISK) } checked={ destination === LOCAL_DISK }><span>Dysk lokalny</span></Button>
        <Button onClick={ this.setDocumentDestination.bind(this, GOOGLE_DRIVE) } checked={ destination === GOOGLE_DRIVE }><span>Google drive</span></Button>
      </Picker>
    )
  }
}

const mapStateToProps = ({ document }) => (
  {
    destination: document.destination
  }
)

export default connect(mapStateToProps)(ChooseDestinationModal);