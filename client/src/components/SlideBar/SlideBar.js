import React from "react";
import Flickity from "react-flickity-component";
import style from "./SlideBar.module.sass";
import carouselConstants from "../../carouselConstants";
import "./flickity.css";

const SliderBar = (props) => {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    initialIndex: 1,
    lazyLoad: true,
  };

  const getStyleName = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER:
        return style.mainCarousel;
      case carouselConstants.EXAMPLE_SLIDER:
        return style.exampleCarousel;
      case carouselConstants.FEEDBACK_SLIDER:
        return style.feedbackCarousel;
    }
  };

  const renderSlides = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <article key={index} className={style["carousel-cell"]}>
            <img src={props.images[key]} alt="slide" />
          </article>
        ));
      }
      case carouselConstants.EXAMPLE_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <article className={style["example-cell"]} key={index}>
            <img src={props.images[key]} alt="slide" />
            <p>{carouselConstants.EXAMPLE_SLIDER_TEXT[index]}</p>
          </article>
        ));
      }
      case carouselConstants.FEEDBACK_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <article className={style["feedback-cell"]} key={index}>
            <img src={props.images[key]} alt="slide" />
            <p>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].name}</span>
          </article>
        ));
      }
    }
  };
  return (
    <Flickity className={getStyleName()} elementType="section" options={options}>
      {renderSlides()}
    </Flickity>
  );
};

export default SliderBar;
