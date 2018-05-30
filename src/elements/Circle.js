export default class Circle {
  constructor(id, attrs, style){
    this.id = id;
    this.type = 'circle';
    this.name = 'Koło';
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
      return `<circle data-id="${ this.id }" ${ attrs } ${ style }></circle>`;
    }else{
      return null;
    }
  }
}