import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setFileName, setFileFolder } from '../../store/actions/drive';

import Input from '../../ui/Input';

const Folders = styled.div`
  label {
    color: #888;
    font-size: 1rem;
    display: block;
    margin-bottom: 0.35rem;  
  }

  div {
    max-height: 200px;
    overflow: auto;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const Folder = styled.li`
  background: ${ props => props.checked ? 'border-color: var(--orange);' : '#f0f0f0' };
  color: #444;
  font-weight: 500;
  flex: 0 0 49%;
  padding: 1.05rem 1.4rem;
  margin-bottom: 0.7rem;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid #f0f0f0;
  ${ props => props.checked && 'border-color: var(--orange);' }
  &:hover {
    border-color: rgba(255, 182, 0, 0.4);
    ${ props => props.checked && 'border-color: var(--orange);' }
  }
`;

class SaveToCloudModal extends React.Component {
  setFileName(event){
    const { dispatch } = this.props;
    dispatch(setFileName(event.target.value));
  }

  setFileFolder(id){
    const { dispatch } = this.props;
    dispatch(setFileFolder(id));
  }

  render() {
    const { folders, folderId } = this.props;

    return (
      <div>
        <Input label='Nazwa pliku:' change={ this.setFileName.bind(this) } />
        {
          folders &&
          <Folders>
            <label>Wybierz folder:</label>
            <div>
              <ul>
                {
                  folders.map(folder => (
                    <Folder key={ folder.id } checked={ folder.id === folderId } onClick={ this.setFileFolder.bind(this, folder.id ) }>{ folder.name }</Folder>
                  ))
                }
              </ul>
            </div>
          </Folders>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ drive }) => (
  {
    folders: drive.folders,
    folderId: drive.folderId
  }
)

export default connect(mapStateToProps)(SaveToCloudModal);