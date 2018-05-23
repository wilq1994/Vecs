import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: #888;
  font-size: 1rem;
  display: block;
  margin-bottom: 0.35rem;
`;

const Field = styled.input`
  background: #f0f0f0;
  color: #444;
  font-size: 1.333rem;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 1.05rem 1.4rem;
  border-radius: 5px;
  border: 0;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 0 2px #bbb inset;
  }

  &:invalid:not(:focus) {
    /* box-shadow: 0 0 2px #ff6e00 inset;
    background: #fff3d4; */
  }
`;

const Wrapper = styled.div`
  margin-bottom: 1.4rem;
`;

const Input = ({ label, change, required }) => (
  <Wrapper>
    <Label>{ label }</Label>
    <Field onChange={ change } required={ required }/>
  </Wrapper>
);

export default Input;