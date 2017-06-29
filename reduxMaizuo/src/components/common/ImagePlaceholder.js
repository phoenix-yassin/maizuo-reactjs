import React from 'react';

class ImagePlaceholder extends React.Component {
  constructor(props){
    super(props);
    this.imageLoaded = this.imageLoaded.bind(this);
  }
  imageLoaded(){
    this.refs.image.style.opacity = 1;
  }
  render(){
      const {src, placeholder} = this.props;
      const bgStyle = {
        backgroundImage: `url(${placeholder})`,
        backgroundSize: 100 + '%',
      };
      return (
        <div className="img-responsive" style={bgStyle}>
          <img ref="image" src={src} style={{width: 100 + '%', transition: 'all 1.2s ease', opacity:0}}
            onLoad={this.imageLoaded} />
        </div>
      )
  }
}

export default ImagePlaceholder;