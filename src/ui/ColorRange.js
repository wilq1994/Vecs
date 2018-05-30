import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

const Track = styled.div`
  ${ props => props.type === 'hue' &&
      'background: linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%));'
  }
  ${ props => props.type === 'light' &&
      'background: linear-gradient(to right, hsl(0, 0%, 0%), hsl(0, 0%, 100%));'
  }
  height: 1.05rem;
  border-radius: 0.7rem;
  box-shadow: 0 0 1px rgba(0,0,0,0.2) inset;
  box-sizing: border-box;
  position: relative;
`;

const Thumb = styled.div`
  background: #fff;
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 0.7rem;
  box-sizing: border-box;
  box-shadow: 0 0 5px #bbb;
  position: absolute;
  top: 0;
  transform: scale(1.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
`;

class ColorRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: this.props.min,
      max: this.props.max,
      position: 0,
      offset: 0
    };

    this.drag = this.drag.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.drop = this.drop.bind(this);
  }

  componentDidMount(){
    const thumb = ReactDOM.findDOMNode(this.refs.thumb);
    const track = ReactDOM.findDOMNode(this.refs.track);
    const maxPosition = track.clientWidth - thumb.clientWidth;
    this.setState({
      position: this.props.value / this.props.max * maxPosition
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      const thumb = ReactDOM.findDOMNode(this.refs.thumb);
      const track = ReactDOM.findDOMNode(this.refs.track);
      const maxPosition = track.clientWidth - thumb.clientWidth;
      this.setState({
        position: this.props.value / this.props.max * maxPosition
      });
    }
  }

  drag(event){
    const offset = event.clientX - ReactDOM.findDOMNode(this.refs.track).offsetLeft - ReactDOM.findDOMNode(this.refs.thumb).offsetLeft;
    this.setState({ offset });
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.drop);
  }

  mouseMove(event) {
    const thumb = ReactDOM.findDOMNode(this.refs.thumb);
    const track = ReactDOM.findDOMNode(this.refs.track);
    const maxPosition = track.clientWidth - thumb.clientWidth;
    let position = event.clientX - track.offsetLeft - this.state.offset;

    if(position <=0 ){
      position = 0;
    }
    if(position >= maxPosition) {
      position = maxPosition;
    }

    this.setState({
      position
    });

    this.props.change(position / maxPosition * this.state.max);
  }

  drop(){
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.drop);
  }

  render() {
    const { type, hue, light } = this.props;

    return (
      <Track type={ type } ref='track' style={{ background: `linear-gradient(to right, hsl(${hue}, 0%, ${light}%), hsl(${hue}, 100%, ${light}%))` }}>
        <Thumb onMouseDown={ this.drag } ref='thumb' style={{ left: this.state.position }}/>
      </Track>
    )
  }
}

export default ColorRange;