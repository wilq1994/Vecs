import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Input from '../ui/Input';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Preview = styled.div`
  background: #f0f0f0;
  width: calc(1.4rem * 10);
  height: calc(1.4rem * 10);
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

  svg {
    max-width: 100%;
    max-height: 100%;
  }
`;

class SavePngPopup extends React.Component {
  render(){
    const { elements, width, height } = this.props;
    const svgContent = elements.map(element => element.render());

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
        <Preview>
          <div style={{ width: `${wRatio * 100}%`, height: `${hRatio * 100}%` }}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox={`0 0 ${ width } ${ height }`} width={ width } height={ height } dangerouslySetInnerHTML={{ __html: svgContent }}></svg>
          </div>
        </Preview>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  elements: state.elements.list,
  width: state.document.width,
  height: state.document.height
})

export default connect(mapStateToProps)(SavePngPopup);