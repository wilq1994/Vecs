import React from 'react';
import styled from 'styled-components';

const Input = styled.div`
  background: hsl(43, 0%, 80%);
  border-radius: 5px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
  &:hover {
    box-shadow: 0 0 2px #bbb inset;
  }

  input {
    display: block;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    &:checked + i {
      display: block;
    }
  }

  i {
    background: var(--orange);
    display: block;
    border-radius: 5px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    display: none;
  }
`;

const Checkbox = ({ checked, onChange }) => (
  <Input><input type="checkbox" checked={ checked } onChange={ onChange }/><i></i></Input>
)

export default Checkbox;