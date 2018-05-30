import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Textarea = styled.textarea`
  background: #f0f0f0;
  color: #444;
  font-size: 1rem;
  line-height: 1.4;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 1.05rem 1.4rem;
  border-radius: 5px;
  border: 0;
  resize: none;
  height: 250px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 0 2px #bbb inset;
  }
`;

const CodePopup = ({ elements, documentWidth, documentHeight }) => {
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${ documentWidth } ${ documentHeight }" width="${ documentWidth }" height="${ documentHeight }">`;
  elements.map(element => { svgContent += element.render() });
  svgContent += '</svg>';
  
  return (
    <Textarea spellCheck={ false }>{ svgContent }</Textarea>
  )
}

const mapStateToProps = state => ({
  elements: state.elements.list,
  documentWidth: state.document.width,
  documentHeight: state.document.height
});

export default connect(mapStateToProps)(CodePopup);