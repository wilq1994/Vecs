import React from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../ui/ColorPicker';

import { setFill } from '../store/actions/toolbar';

const FillProperty = ({ changeColor }) => (
  <React.Fragment>
    <ColorPicker color={ null } change={ changeColor.bind(this) }/>
  </React.Fragment>
);

const mapDispatchToProps = dispatch => ({
  changeColor: (color) => {
    dispatch(setFill(color));
  }
});

export default connect(null, mapDispatchToProps)(FillProperty);