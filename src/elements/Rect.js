export default class Rect {
  constructor(id, attrs, style){
    this.id = id;
    this.type = 'rect';
    this.name = 'Prostokąt';
    this.selected = false;
    this.visible = true;
    this.dragging = false;
    this.attrs = attrs;
    this.style = style;
  }

  render(){
    let attrs = '';
    let style = '';
    if(this.style.fill === null) {
      this.style.fill = 'transparent';
    }
    
    for(let key in this.attrs) {
      attrs += `${key}="${this.attrs[key]}" `;
    }

    for(let key in this.style) {
      style += `${key}="${this.style[key]}" `;
    }

    if(/^\d+$/.test(this.selected)) {
      style += `opacity="0.8"`;
    }

    if(this.visible) {
      return `<rect data-id="${ this.id }" ${ attrs } ${ style }></rect>`;
    }else{
      return null;
    }
  }
}