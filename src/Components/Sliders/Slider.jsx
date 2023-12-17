import React, { useState, useEffect } from "react";
import { images } from "../ImageData/image";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "./Slider.css";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [Datas, setDatas] = useState(images);
  const [imageLoaded, setImageLoaded] = useState(Array(images.length).fill(false));



  useEffect(() => {
    const slideshowDuration = 3000;
    const timeout = setTimeout(() => {
      slideshowNext();
    }, slideshowDuration);

    return () => clearTimeout(timeout);
  }, [activeSlide]);


  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };
  const slideshowNext = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % images.length);
  };

  const slideshowPrev = () => {
    setActiveSlide((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handlePaginationClick = (index) => {
    setActiveSlide(index);
  };
 
 
  return (
    <main className="main-content">
      <section className="slideshow">
        <div className="slideshow-inner">
          
          {Datas.map((item, index) => (
            <div
              key={index}
              className={`slide ${activeSlide === index ? "is-active" : ""}`}
            >
              <div className="slide-content">
                <div className="caption">
                  <div className="title">{item.title}</div>
                  <div className="text">
                    <p>{item.description}</p>
                  </div>
                  <a href="#" className="btn">
                    <span className="btn-inner">Learn More</span>
                  </a>
                </div>
              </div>
              <div className="image-container">
                <img key={index}
                  src={item.image}
                  alt=""
                  className={`image ${imageLoaded[index] ? "is-loaded" : ""}`}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            </div>
          ))}
         
          <div className="arrows">
            <div className="arrow prev" onClick={slideshowPrev}>
              <span className="svg svg-arrow-left">
                <MdArrowBackIosNew />
              </span>
            </div>
            <div className="arrow next" onClick={slideshowNext}>
              <span className="svg svg-arrow-right">
                <MdArrowForwardIos />
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Slider;
