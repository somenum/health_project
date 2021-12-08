import $ from 'jquery';
import 'bootstrap';
import 'slick-carousel';
import './index.scss';

$('.last-articles__slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
  arrows: true,
  nextArrow: document.querySelector('#last-articles-slider__arrow_next'),
  prevArrow: document.querySelector('#last-articles-slider__arrow_prev')
});

$('.about__slider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
  arrows: true,
  nextArrow: document.querySelector('#about-slider__arrow_next'),
  prevArrow: document.querySelector('#about-slider__arrow_prev')
});
