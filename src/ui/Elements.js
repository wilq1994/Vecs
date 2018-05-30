import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { broadcast } from '../socket';

import { selectElement, setElementVisibility, setElementsVisibility, setElementDragging, setElementOrder, deleteElement } from '../store/actions/elements';
import { setFill, setStroke } from '../store/actions/toolbar';

import Checkbox from './Checkbox';
import { createDocument } from '../store/actions/document';

const Box = styled.div`
  background: #fff;
  grid-area: elements;
  border-left: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Heading = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  border-left: 5px solid transparent;
  h2 {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 2px;
    margin: 0;
    margin-left: 0.7rem;
  }
`;

const List = styled.div`
  overflow: auto;
  flex: 1 1 auto;
  height: 0;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
  }
`;

const Item = styled.li`
  background: ${ props => props.selected ? '#f0f0f0' : '#fff' };
  color: ${ props => props.hue ? `hsla(${props.hue}, 80%, 30%, 0.5)` : 'inherit' };
  font-size: 0.75rem;
  padding: 0.35rem 0.7rem;
  display: flex;
  align-items: center;
  border-left: 5px solid ${ props => props.hue ? `hsl(${props.hue}, 80%, 80%)` : 'transparent' };
  box-shadow: ${ props => props.selected ? '0 0 2px #bbb inset' : 'none' };
  cursor: ${ props => props.hue ? 'default' : 'pointer' };
  position: ${ props => props.dragging ? 'absolute' : 'static' };
  left: 0;
  right: 0;
  ${ props => props.dragging ? 'box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 1;' : null }
  &:hover {
    background: ${ props => props.hue ? '#fff' : '#f0f0f0' };
  }

  span {
    margin-left: 0.7rem;
    flex: 1 1 auto;
  }
`;

const EmptyItem = styled.li`
  background: repeating-linear-gradient(to right bottom, #fff, #fff 5px, #f0f0f0 5px, #f0f0f0 10px);
  background-size: 2.056rem 2.056rem;
  display: block;
  height: 2.056rem;
`;

const DragIcon = styled.div`
  background: url('../img/drag-icon.png') no-repeat;
  width: 18px;
  height: 11px;
  flex: 0 0 auto;
  cursor: move;
`;

class Elements extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      draggingElementId: null,
      draggingId: null,
      position: 0,
      list: null,
      itemHeight: null,
      order: null
    }

    this.mouseMove = this.mouseMove.bind(this);
    this.drop = this.drop.bind(this);
    this.pressDeleteKey = this.pressDeleteKey.bind(this);
  }

  componentDidMount(){
    this.setState({
      list: ReactDOM.findDOMNode(this.refs.list),
      itemHeight: ReactDOM.findDOMNode(this.refs.list).querySelector('li').clientHeight
    })

    window.addEventListener('keyup', this.pressDeleteKey);
  }

  componentWillUnmount(){
    window.removeEventListener('keyup', this.pressDeleteKey);
  }

  drag(elementId, id, event){
    const { dragElement } = this.props;
    const { list, itemHeight } = this.state;
    const pos = event.clientY - list.offsetTop - 12;
    
    this.setState({
      draggingElementId: elementId,
      draggingId: id,
      position: pos,
      order: Math.min(Math.abs(Math.round(pos / itemHeight)), this.props.list.length-1)
    });
    dragElement(elementId);
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.drop);
  }
  
  mouseMove(event) {
    const { list, itemHeight } = this.state;
    const pos = event.clientY - list.offsetTop - 12;

    this.setState({
      position: pos,
      order: Math.min(Math.abs(Math.round(pos / itemHeight)), this.props.list.length-1)
    });
  }

  drop() {
    const { dropElement, userId } = this.props;
    const { draggingElementId, order } = this.state;

    this.setState({ order: null, draggingId: null });
    dropElement(userId, draggingElementId, order);
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.drop);
  }

  pressDeleteKey(event){
    const { selectedElementId, pressDeleteKey, userId } = this.props;
    if(event.code === 'Delete' && selectedElementId !== null) {
      pressDeleteKey(userId, selectedElementId);
    }
  }

  render() {
    const { selectedElementId, elementsVisible, list, members, userId, clickElement, clickElementCheckbox, clickElementsCheckbox } = this.props;
    const { order, position, draggingId } = this.state;

    return (
      <Box>
        <Heading>
          <Checkbox checked={ elementsVisible } onChange={ clickElementsCheckbox.bind(this, !elementsVisible) }/>
          <h2>Elementy</h2>
        </Heading>
        
        <List>
          <ul ref="list">
            {
              list.map((item, id) => {
                let hue = null;
                members.map(member => {
                  if(member.id === item.selected) {
                    hue = member.hue;
                  }
                });

                return (
                  <React.Fragment key={ item.id }>
                    { ((item.dragging && order === id) || (order === id && draggingId > id)) && <EmptyItem/> }
                    <Item selected={ item.id === selectedElementId } hue={ hue } dragging={ item.dragging } onClick={ clickElement.bind(this, userId, item.id, item.selected, item.style.fill, item.style.stroke, selectedElementId) } style={{ top: position }}>
                      <Checkbox checked={ item.visible } onChange={ clickElementCheckbox.bind(this, item.id, !item.visible) }/><span>{ item.name }</span>
                      <DragIcon onMouseDown={ this.drag.bind(this, item.id, id) }/>
                    </Item>
                    { (order === id && draggingId < id) && <EmptyItem/> }
                  </React.Fragment>
                )
              })
            }
          </ul>
        </List>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  const { selectedElementId, elementsVisible, list } = state.elements;

  return {
    userId: state.user.id,
    selectedElementId,
    elementsVisible,
    list,
    members: state.members
  }
};

const mapDispatchToProps = dispatch => ({
  clickElement: (userId, id, selected, fill, stroke, selectedElementId, event) => {
    if(event.target.nodeName === 'INPUT' || event.target.nodeName === 'DIV') return;
    if(!/^\d+$/.test(selected)) {
      if(selectedElementId !== null && selectedElementId !== id) broadcast(userId, selectElement(selectedElementId, userId));
      broadcast(userId, selectElement(id, userId));
      dispatch(selectElement(id, null));
      dispatch(setFill(fill));
      dispatch(setStroke(stroke));
    }
  },
  clickElementCheckbox: (id, visible, event) => {
    dispatch(setElementVisibility(id, visible))
  },
  clickElementsCheckbox: (visible) => {
    dispatch(setElementsVisibility(visible));
  },
  dragElement: (id) => {
    dispatch(setElementDragging(id, true));
  },
  dropElement: (userId, id, order) => {
    dispatch(setElementDragging(id, false));
    dispatch(setElementOrder(id, order));
    broadcast(userId, setElementOrder(id, order));
  },
  pressDeleteKey: (userId, id) => {
    dispatch(deleteElement(id));
    broadcast(userId, deleteElement(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Elements);