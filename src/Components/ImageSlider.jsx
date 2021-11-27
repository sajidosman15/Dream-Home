import React from 'react';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const ImageSlider = (props) => {
  var pic = props.pic;

  var cardimg = new Array(2);
  // cardimg[0] = require('../Database/public/img/' +pic.pic1);

  try {
    cardimg[0] = require('../Database/public/img/' + pic.pic1);
  } catch (ex) {
    cardimg[0] = require('../Database/public/img/noimage.png');
  }

  try {
    cardimg[1] = require('../Database/public/img/' + pic.pic2);
  } catch (ex) {
    cardimg[1] = require('../Database/public/img/noimage.png');
  }


  const images = [0, 1].map((number) => ({
    src: `${cardimg[number].default}`
  }));


  return (
    <Carousel images={images} style={{ height: 345 }} />
  );
};

export default ImageSlider;