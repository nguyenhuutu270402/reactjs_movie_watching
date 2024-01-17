import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from 'src/appStore'
import { AppContext } from 'src/contexts/app.context'
import { ArrowBottom, SearchICon } from 'src/icons'
import { clearLS } from 'src/utils/auth'
import path from 'src/utils/path'
import MainButton from '../MainButton'
import FarvoriteIcon from 'src/icons/FarvoriteIcon'
import ItemFilter from '../ItemFilter'
import ItemDropFilter from '../ItemDropFilter'
import logo from '../../assets/logo_movie.png';


export default function Sidebar() {
  const { setIsAuthenticated } = useAppStore()
  const navigate = useNavigate()
  const [showBoxFilter, setShowBoxFilter] = useState(false);


  return (
    <div className='items-center flex flex-col'>
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
      <div className='w-full bg-[#202025] flex justify-center py-[6px] border-b-[1px] border-solid border-[#2b2b2d]'>
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
          <ItemFilter value='Sắp xếp' >
            <ItemDropFilter value='Sắp xếp' onClick={() => { }} />
            <ItemDropFilter value='Mới nhất' onClick={() => { }} />
            <ItemDropFilter value='Xem nhiều' onClick={() => { }} />
            <ItemDropFilter value='Mới câp nhật' onClick={() => { }} />
          </ItemFilter>

          <ItemFilter value='Định dạng' >
            <ItemDropFilter value='Định dạng' onClick={() => { }} />
            <ItemDropFilter value='Phim lẻ' onClick={() => { }} />
            <ItemDropFilter value='Phim bộ' onClick={() => { }} />
          </ItemFilter>

          <ItemFilter value='Tình trạng' >
            <ItemDropFilter value='Tình trạng' onClick={() => { }} />
            <ItemDropFilter value='Trailer' onClick={() => { }} />
            <ItemDropFilter value='Đang phát' onClick={() => { }} />
            <ItemDropFilter value='Hoàn thành' onClick={() => { }} />
          </ItemFilter>

          <ItemFilter value='Quốc gia' >
            <ItemDropFilter value='Quốc gia' onClick={() => { }} />
            <ItemDropFilter value='Mỹ' onClick={() => { }} />
            <ItemDropFilter value='Hàn Quốc' onClick={() => { }} />
            <ItemDropFilter value='Nhật Bản' onClick={() => { }} />
          </ItemFilter>

          <ItemFilter value='Năm' >
            <ItemDropFilter value='Năm' onClick={() => { }} />
            <ItemDropFilter value='2020' onClick={() => { }} />
            <ItemDropFilter value='2021' onClick={() => { }} />
            <ItemDropFilter value='2022' onClick={() => { }} />
            <ItemDropFilter value='2023' onClick={() => { }} />
            <ItemDropFilter value='2024' onClick={() => { }} />
            <ItemDropFilter value='2025' onClick={() => { }} />
            <ItemDropFilter value='2026' onClick={() => { }} />
          </ItemFilter>
          
          <ItemFilter value='Thể loại' >
            <ItemDropFilter value='Thể loại' onClick={() => { }} />
            <ItemDropFilter value='Hành động' onClick={() => { }} />
            <ItemDropFilter value='Tình cảm' onClick={() => { }} />
            <ItemDropFilter value='Phiêu lưu' onClick={() => { }} />
          </ItemFilter>
          <MainButton className='bg-[#bc5500] flex-auto border-[1px] border-solid border-[#f17009] rounded-[10px] px-[16px] h-[40px] mx-[4px]' onClick={() => { }}>
            <span className='text-white text-[13px] mr-[6px]'>Lọc phim</span>
          </MainButton>
        </div>
      }
    </div>
  )
}
