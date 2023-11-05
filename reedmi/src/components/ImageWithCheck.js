
import React from "react";

class ImageWithCheck extends React.Component {
    state = {
      validImage: true,
    };
  
    handleImageError = () => {
      this.setState({ validImage: false });
    };
  
    render() {
      const { src, alt, ...props } = this.props;
      const { validImage } = this.state;
  
      return validImage ? (
        <img src={src} alt={alt} onError={this.handleImageError} {...props} />
      ) : null;
    }
  }

  export default ImageWithCheck;