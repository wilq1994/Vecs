import React from 'react';
import styled from 'styled-components';

const hue = Math.round(Math.random() * 360);

const Circle = styled.div`
  background: ${ props => props.hue ? `hsl(${props.hue}, 80%, 80%)` : `hsl(${hue}, 80%, 80%)`};
  color: ${ props => props.hue ? `hsl(${props.hue}, 80%, 30%)` : `hsl(${hue}, 80%, 30%)`};
  font-size: 1.333rem;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: ${ props => props.speak ? `0 0 0 2px hsl(${props.hue ? props.hue : hue}, 80%, 80%)` : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
  opacity: ${ props => props.inactive ? 0.4 : 1};
  span {
    font-weight: 500;
    text-transform: uppercase;
    line-height: 2.2em;
    transition: opacity 0.3s ease;
    &:empty {
      opacity: 0;
    }
  }
`;

const Avatar = ({ className, login }) => (
  <div className={className}><span>{login[0]}</span></div>
);

export default Circle.withComponent(Avatar);