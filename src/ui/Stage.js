import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { broadcast } from '../socket';

import { selectElement, setElementAttributes } from '../store/actions/elements';

const Wrapper = styled.div`
  background: url('../img/cork-wallet.png') repeat;
  grid-area: stage;
  padding: 1.4rem;
`;

const Container = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    flex: 0 0 auto;
    background: #fff;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StageContainer = styled.div``;

class Stage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startPosX: 0,
      startPosY: 0,
      posX: 0,
      posY: 0
    };
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }
  
  mouseDown(event){
    const stage = ReactDOM.findDOMNode(this.refs.stage);
    this.setState({
      startPosX: event.clientX - stage.offsetLeft,
      startPosY: event.clientY - stage.offsetTop,
      posX: event.clientX - stage.offsetLeft,
      posY: event.clientY - stage.offsetTop
    })
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  }
  
  mouseMove(event){
    const stage = ReactDOM.findDOMNode(this.refs.stage);
    const { userId, tool, moveElement } = this.props;
    this.setState({
      posX: event.clientX - stage.offsetLeft,
      posY: event.clientY - stage.offsetTop
    })
    if(tool === 'select'){
      moveElement(userId, parseInt(event.target.getAttribute('data-id')), { x: this.state.posX - 50, y: this.state.posY- 50 })
    }
  }
  
  mouseUp(event){
    const { startPosX, startPosY, posX, posY } = this.state;
    const { userId, tool, elements, clickElement } = this.props;
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
    if(tool === 'select' && startPosX === posX && startPosY === posY) {
      clickElement(userId, parseInt(event.target.getAttribute('data-id')));
    }
  }

  render(){
    const { elements, documentWidth, documentHeight } = this.props;
    const svgContent = elements.map(element => element.render());
    return (
      <Wrapper>
        <Container>
          <StageContainer ref="stage" onMouseDown={ this.mouseDown }>
            <svg id="stage" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox={`0 0 ${ documentWidth } ${ documentHeight }`} width={ documentWidth } height={ documentHeight } dangerouslySetInnerHTML={{ __html: svgContent }}></svg>
          </StageContainer>
        </Container>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  tool: state.toolbar.tool,
  elements: state.elements.list,
  documentWidth: state.document.width,
  documentHeight: state.document.height
});

const mapDispatchToProps = dispatch => ({
  clickElement: (userId, id) => {
    broadcast(userId, selectElement(id, userId));
    dispatch(selectElement(id, null));
  },
  moveElement: (userId, id, attrs) => {
    broadcast(userId, setElementAttributes(id, attrs));
    dispatch(setElementAttributes(id, attrs));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage);