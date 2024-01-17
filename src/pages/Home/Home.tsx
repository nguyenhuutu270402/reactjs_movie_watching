import React, { useState } from 'react'
import logo from '../../assets/logo_movie.png';
import { ArrowBottom, SearchICon } from 'src/icons';
import MainButton from 'src/components/MainButton';
import FarvoriteIcon from 'src/icons/FarvoriteIcon';
import ItemPhim from 'src/components/ItemPhim';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomArrowSlider, { ArrowType } from 'src/components/CustomArrowSlider/CustomArrowSlider';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
      <div className='w-[1170px] flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <img className='h-[80px] pr-[30px]' src={logo} alt='logo' />
          <div className='w-[400px] h-min px-[16px] py-[6px] rounded-[50px] border-[1px] border- border-[#f17009] bg-[#3c3c3c] flex flex-row gap-[10px]'>
            <SearchICon width={20} height={20} color='white' />
            <input className='w-full outline-none  bg-transparent text-white placeholder-gray-400 text-[13px]'
              type='text'
              placeholder='Tìm kiếm' />
          </div>
        </div>
        <MainButton className='bg-[#265aa6] rounded-[30px] px-[16px] py-[6px] justify-center items-center flex flex-row' onClick={() => { }}>
          <FarvoriteIcon width={13} height={13} />
          <span className='text-white text-[13px] ml-[6px]'>Tủ phim</span>
          <span className='bg-[#141518] text-white text-[13px] ml-[10px] px-[8px] py-[3px] rounded-[50px]'>0</span>
        </MainButton>
      </div>
      <div className='w-screen bg-[#202025] flex justify-center py-[6px] border-b-[1px] border-solid border-[#2b2b2d]'>
        <div className='w-[1170px] flex flex-row justify-start items-start flex-wrap'>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>PHIM GÌ</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>THỂ LOẠI</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim lẻ</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim chiếu rạp</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim netflix</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim Bộ Mỹ</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim Bộ Hàn Quốc</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim Bộ Trung Quốc</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim Việt Nam</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>Phim hoạt hình</span>
          </MainButton>
          <MainButton className='px-[10px] py-[8px]' onClick={() => { }}>
            <span className='text-white text-[13px] font-[600]'>TV Show Hàn Quốc</span>
          </MainButton>
        </div>

      </div>
      <div className='w-[1170px] flex flex-row items-center justify-between bg-[#202025] border-b-[1px] border-solid border-[#2b2b2d] py-[10px] px-[16px]'>
        <span className='text-[#a5a5a5] text-[13px]'>PHIMGI.NET</span>
        <MainButton className='flex flex-row items-center' onClick={() => { setShowBoxFilter(!showBoxFilter) }}>
          <span className='text-white text-[13px] mr-[6px]'>Lọc phim</span>
          <ArrowBottom width={16} height={16} color='white' />
        </MainButton>
      </div>

      {
        showBoxFilter === true && <div className='w-[1170px] flex flex-row items-center py-[16px] px-[8px] '>
          <MainButton className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Sắp xếp</span>
            <ArrowBottom width={16} height={16} color='white' />
          </MainButton>
          <MainButton className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Định dạng</span>
            <ArrowBottom width={16} height={16} color='white' />
          </MainButton>
          <MainButton className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Tình trạng</span>
            <ArrowBottom width={16} height={16} color='white' />
          </MainButton>
          <MainButton className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Quốc gia</span>
            <ArrowBottom width={16} height={16} color='white' />
          </MainButton>
          <MainButton className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Năm</span>
            <ArrowBottom width={16} height={16} color='white' />
          </MainButton>
          <MainButton className='flex flex-row justify-between items-center bg-[#171d23] border-[1px] border-solid border-[#303032] rounded-[50px] px-[16px] w-[14%] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Thể loại</span>
            <ArrowBottom width={16} height={16} color='white' />
          </MainButton>
          <MainButton className='bg-[#bc5500] flex-auto border-[1px] border-solid border-[#f17009] rounded-[10px] px-[16px] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Lọc phim</span>
          </MainButton>
        </div>
      }

      {/* body */}
      <div className='w-[300px] sm:w-96 md:w-[1000px] flex flex-col items-start mt-[20px] sm:'>
        <span className='text-white text-[20px] ml-[16px]'>HÔM NAY XEM PHIM GÌ?</span>
        <div className='bg-[#202025] h-[4px] w-[100%]' />
      </div>

      <div className='relative mt-[16px]'>
        <Slider ref={(c) => (slider = c)} className='w-[1170px]' {...settings}>
          {[...Array(15)].map((_, index) => (
            <ItemPhim className='mx-[4px]' />
          ))}
        </Slider>
        <CustomArrowSlider arrowType={ArrowType.PREVIOUS} onClick={() => { slider && slider.slickPrev() }} />
        <CustomArrowSlider arrowType={ArrowType.NETX} onClick={() => { slider && slider.slickNext() }} />
      </div>
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    </main>
  )
}
