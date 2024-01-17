import { useState } from 'react'
import ItemPhim from 'src/components/ItemPhim';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomArrowSlider, { ArrowType } from 'src/components/CustomArrowSlider/CustomArrowSlider';

export default function Home() {
  let slider: Slider | null = null;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <main className='items-center flex flex-col flex-1'>
      <div className='w-[1170px] flex flex-col items-start mt-[20px] '>
        <span className='text-white text-[20px] ml-[16px]'>HÔM NAY XEM PHIM GÌ?</span>
        <div className='bg-[#202025] h-[4px] w-[100%]' />
      </div>

      <div className='relative mt-[16px]'>
        <Slider ref={(c) => (slider = c)} className='w-[1170px]' {...settings}>
          {[...Array(15)].map((_, index) => (
            <ItemPhim className='mx-[4px]' key={index} />
          ))}
        </Slider>
        <CustomArrowSlider arrowType={ArrowType.PREVIOUS} onClick={() => { slider && slider.slickPrev() }} />
        <CustomArrowSlider arrowType={ArrowType.NETX} onClick={() => { slider && slider.slickNext() }} />
      </div>
      <ItemPhim className='mx-[4px]'  />
      <ItemPhim className='mx-[4px]'  />
      <ItemPhim className='mx-[4px]'  />
      <ItemPhim className='mx-[4px]'  />
      <ItemPhim className='mx-[4px]'  />

    </main>
  )
}
