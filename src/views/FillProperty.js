import React from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../ui/ColorPicker';
import { broadcast } from '../socket';

import { setFill, setStroke } from '../store/actions/toolbar';
import { setElementStyle } from '../store/actions/elements';

const FillProperty = ({ fill, stroke, userId, selectedElementId, changeFill, changeStroke }) => (
  <React.Fragment>
    <span>Tło</span><br/><br/>
    <ColorPicker color={ fill } change={ changeFill.bind(this, userId, selectedElementId) }/>
    <span>Obrys</span><br/><br/>
    <ColorPicker color={ stroke } change={ changeStroke.bind(this, userId, selectedElementId) }/>
  </React.Fragment>
);

const mapStateToProps = state => ({
  fill: state.toolbar.fill,
  stroke: state.toolbar.stroke,
  userId: state.user.id,
  selectedElementId: state.elements.selectedElementId
})

const mapDispatchToProps = dispatch => ({
  changeFill: (userId, selectedElementId, color) => {
    dispatch(setFill(color));
    if(selectedElementId !== null){
      dispatch(setElementStyle(selectedElementId, { fill: color }));
      broadcast(userId, setElementStyle(selectedElementId, { fill: color }));
    }
  },
  changeStroke: (userId, selectedElementId, color) => {
    dispatch(setStroke(color));
    if(selectedElementId !== null){
      dispatch(setElementStyle(selectedElementId, { stroke: color }));
      broadcast(userId, setElementStyle(selectedElementId, { stroke: color }));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FillProperty);