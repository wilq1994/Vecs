import React from 'react';
import styled from 'styled-components';

import ColorRange from './ColorRange';

const Sample = styled.div`
  ${ props => props.empty ? 'background: linear-gradient(to right bottom,#fff 40%,#ff0000 40%,#ff0000 60%,#fff 60%);' : null }
  width: 5.95rem;
  height: 5.95rem;
  border: 1px solid #d9d9d9;
  box-shadow: 0 0 1px rgba(0,0,0,0.2) inset;
  box-sizing: border-box;
  margin-right: 0.7rem;
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
`;

const Left = styled.div`
  flex: 0 0 auto;
`;

const Right = styled.div`
  flex: 1 1 auto;
  > div {
    margin: 0.7rem 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Select = styled.select`
  padding: 0.35rem 0.7rem;
  margin-bottom: 0.7rem;
  width: 100%;
  border-radius: 5px;
  background: #f0f0f0;
  border: 0;
`;


class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    let dimensions = [0, 100, 50];
    if(this.props.color){
      dimensions = this.props.color.match(/\d{1,3}/g);
    }
    this.state = {
      type: !this.props.color ? 'empty' : 'color',
      hue: dimensions[0],
      saturation: dimensions[1],
      light: dimensions[2]
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.color !== this.props.color && this.props.color){
      let dimensions = [0, 100, 50];
      dimensions = this.props.color.match(/\d{1,3}/g);
      this.setState({
        type: !this.props.color ? 'empty' : 'color',
        hue: dimensions[0],
        saturation: dimensions[1],
        light: dimensions[2]
      })
    }
  }

  setValue(type, value){
    this.setState({
      [type]: Math.round(value)
    });
    
    const { hue, saturation, light } = this.state;
    this.props.change(`hsl(${hue}, ${saturation}%, ${light}%)`);
  }

  setFillType(event){
    this.setState({
      type: event.target.value
    });
    if(event.target.value === 'empty'){
      this.props.change(null);
    }else{
      const { hue, saturation, light } = this.state;
      this.props.change(`hsl(${hue}, ${saturation}%, ${light}%)`);
    }
  }

  render(){
    const { type, hue, saturation, light } = this.state;
    return (
      <React.Fragment>
        <Select onChange={ this.setFillType.bind(this) } value={ this.props.color === null ? 'empty' : 'color' }>
          <option value="empty">Brak</option>
          <option value="color">Kolor</option>
        </Select>
        <Wrapper>
          <Left>
            { type === 'empty' ? <Sample empty/> : <Sample style={{ background: `hsl(${hue}, ${saturation}%, ${light}%)` }}/> }
          </Left>
          {
            type !== 'empty' &&
            <Right>
              <ColorRange type='hue' min={0} max={360} value={hue} change={ this.setValue.bind(this, 'hue') }/>
              <ColorRange type='saturation' hue={hue} light={light} min={0} max={100} value={saturation} change={ this.setValue.bind(this, 'saturation') }/>
              <ColorRange type='light' min={0} max={100} value={light} change={ this.setValue.bind(this, 'light') }/>
            </Right>
          }
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default ColorPicker;