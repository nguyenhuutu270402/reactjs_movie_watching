import { useState } from 'react'
import logo from '../../assets/logo_movie.png';
import { ArrowBottom, SearchICon } from 'src/icons';
import MainButton from 'src/components/MainButton';
import FarvoriteIcon from 'src/icons/FarvoriteIcon';
import ItemPhim from 'src/components/ItemPhim';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomArrowSlider, { ArrowType } from 'src/components/CustomArrowSlider/CustomArrowSlider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover"
import ItemFilter from 'src/components/ItemFilter';
import ItemDropFilter from 'src/components/ItemDropFilter';

export default function Home() {
  const [showBoxFilter, setShowBoxFilter] = useState(false);
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
    <main className='items-center flex flex-col'>
      

      {/* body */}
      <div className='w-[1170px] flex flex-col items-start mt-[20px]'>
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
      <ItemPhim className='mx-[4px]' />
      <ItemPhim className='mx-[4px]' />
      <ItemPhim className='mx-[4px]' />

    </main>
  )
}
