import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setDocumentDimensions } from '../store/actions/document';

import Input from '../ui/Input';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Preview = styled.div`
  background: #f0f0f0;
  width: calc(1.4rem * 10);
  height: calc(1.4rem * 10);
  margin-bottom: 1.4rem;
  margin-right: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    background: url('../img/bg.png') repeat center center;
    width: 50px;
    height: 50px;
    border: 1px solid #aaa;
    transition: width 0.5s ease, height 0.5s ease;
  }
`;

class SavePngPopup extends React.Component {
  setDimentions(type, event){
    const { width, height, setDimentions } = this.props;
    if(type==='width'){
      setDimentions(event.target.value, parseInt(height));
    }else{
      setDimentions(parseInt(width), event.target.value);
    }
  }
  
  render(){
    const { width, height } = this.props;

    let wRatio, hRatio = 0;
    if(width>height){
        wRatio = 1;
        hRatio = height/width;
    }else{
        hRatio = 1;
        wRatio = width/height;
    }

    return (
      <Wrapper>
        <Preview><div style={{ width: `${wRatio * 100}%`, height: `${hRatio * 100}%` }}></div></Preview>
        <div>
          <Input label="Szerokość (px):" type="number" change={ this.setDimentions.bind(this, 'width') } value={ width }/>
          <Input label="Wysokość (px):" type="number" change={ this.setDimentions.bind(this, 'height') } value={ height }/>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  width: state.document.tempWidth,
  height: state.document.tempHeight
})

const mapDispatchToProps = dispatch => ({
  setDimentions: (width, height) => {
    dispatch(setDocumentDimensions(width, height))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SavePngPopup);