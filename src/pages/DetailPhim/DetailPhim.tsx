import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemTap from 'src/components/ItemTap';
import MainButton from 'src/components/MainButton';
import phimApi from 'src/services/phim.api';
import { Phim } from 'src/types/util.type';
import IconAttention from '../../assets/ic_attention.png';


function DetailPhim() {
  const location = useLocation();
  const phimData = location.state.phimData as Phim;
  // const [isLoading, setIsLoading] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false)

  const [onePhim, setOnePhim] = useState<Phim | undefined>(undefined);


  const fetchData = async () => {

    // setIsLoading(true);
    const res = await phimApi.getOnePhim(phimData.id, 1);
    setOnePhim(res.data);
    // setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onFormatTinhTrang = (tinhtrang: number) => {
    if (tinhtrang && tinhtrang == 1) {
      return 'Đang chiếu';
    } else if (tinhtrang && tinhtrang == 2) {
      return 'Hoàn thành';
    } else if (tinhtrang && tinhtrang == 3) {
      return 'Ngừng chiếu';
    }
  }

  return (
    <main className='items-center flex flex-col flex-1'>
      <div className='flex flex-row w-[810px] bg-[#081118] mt-[10px]'>
        <div className='flex relative max-w-[300px] border-[2px] border-solid border-[#202025]'>
          <img className='w-full h-full object-cover' src={onePhim?.image} alt={onePhim?.tenphim} />
          <div className='absolute bottom-[10px] left-0 right-0 flex flex-row justify-around'>
            <MainButton onClick={() => { }} className='w-[110px] rounded-full bg-gradient-to-r from-[#158846] to-[#fab901]'>
              <div className='text-white text-[13px] p-[8px]'>Chọn tập</div>
            </MainButton>
            <MainButton onClick={() => { }} className='w-[110px] rounded-full bg-gradient-to-r from-[#fab901] to-[#e43703]'>
              <div className='text-white text-[13px] p-[8px]'>Xem phim</div>
            </MainButton>
          </div>
        </div>
        <div className='flex flex-col flex-1 justify-between'>
          <div className='flex flex-col flex-1 px-[16px] py-[8px]'>
            <span className='text-white text-[22px] font-bold leading-[26px]'>{onePhim?.tenkhac ? `${onePhim?.tenkhac} - ${onePhim?.tenphim}` : onePhim?.tenphim}</span>
            <span className='text-white text-[14px] mt-[8px]'>{onePhim?.tenphim}</span>
            <div className='w-[100%] h-[1px] bg-[#141b23] my-[8px]' />
            <div className='flex flex-row gap-[8px]'>
              <div className='text-[#f7a10e] text-[14px]'>Mới cập nhật:</div>
              <div className='flex flex-row flex-1 flex-wrap gap-[8px]'>
                {onePhim?.ds_tap?.map((item, index) => (
                  index < 3 &&
                  <ItemTap onSelect={() => { }} key={index} data={item} />
                ))}
              </div>
            </div>
            <div className='w-[100%] h-[1px] bg-[#141b23] my-[8px]' />
            <div className='flex flex-row gap-[8px]'>
              <div className='text-[#f7a10e] text-[14px]'>Tình trạng:</div>
              <div className='text-white text-[14px]'>{onFormatTinhTrang(onePhim?.trangthai ?? 0)}</div>
            </div>
            <div className='w-[100%] h-[1px] bg-[#141b23] my-[8px]' />
            <div className='flex flex-row gap-[8px]'>
              <div className='text-[#f7a10e] text-[14px]'>Năm:</div>
              <div className='text-white text-[14px]'>{onePhim?.namphathanh}</div>
            </div>
            <div className='w-[100%] h-[1px] bg-[#141b23] my-[8px]' />
            <div className='flex flex-row gap-[8px]'>
              <div className='text-[#f7a10e] text-[14px]'>Thể loại:</div>
              <div className='flex flex-row flex-1 flex-wrap'>
                {onePhim?.ds_theloai?.map((item, index) => (
                  <MainButton className='flex flex-row' onClick={() => { }} key={index}>
                    <div className='text-white text-[14px]'>{item.tentheloai}</div>
                    {
                      index < onePhim?.ds_theloai?.length - 1 && <div className='text-[#f7a10e] text-[14px] mr-[8px]'>{','}</div>
                    }
                  </MainButton>
                ))}
              </div>
            </div>
            <div className='w-[100%] h-[1px] bg-[#141b23] my-[8px]' />
            <div className='flex flex-row gap-[8px]'>
              <div className='text-[#f7a10e] text-[14px]'>Quốc gia:</div>
              <div className='flex flex-row flex-1 flex-wrap'>
                {onePhim?.ds_quocgia?.map((item, index) => (
                  <MainButton className='flex flex-row' onClick={() => { }} key={index}>
                    <div className='text-white text-[14px]'>{item.tenquocgia}</div>
                    {
                      index < onePhim?.ds_quocgia?.length - 1 && <div className='text-[#f7a10e] text-[14px] mr-[8px]'>{','}</div>
                    }
                  </MainButton>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-row items-baseline px-[6px]'>
            <div className='text-[#f7a10e] text-[30px] font-bold leading-[26px] mr-[8px]'>★</div>
            <div className='text-[#f7a10e] text-[22px] leading-[26px]'>4.28</div>
            <div className='text-[#f7a10e] text-[13px] leading-[26px]'>/5</div>
            <div className='text-[#7a8882] text-[13px] leading-[26px] ml-[6px]'>(84 đánh giá)</div>
          </div>
        </div>
      </div>

      <div className='flex flex-row w-[810px] mt-[24px] bg-[#1c1c1c] rounded-[12px] p-[24px]'>
        <img className='h-[48px] pr-[30px]' src={IconAttention} alt='ic_attention' />
        <div className='flex flex-col gap-[8px]'>
          <div className='flex flex-row flex-1'>
            <div className='w-[6px] h-[6px] bg-[#f17009] rounded-full mr-[8px] mt-[10px]' />
            <div className='text-[#f17009] text-[18px] font-bold leading-[26px]'>Cú pháp tìm kiếm phim nhanh nhất trên Google: [Tên phim + xemphimgii.net]</div>
          </div>
          <div className='flex flex-row flex-1'>
            <div className='w-[6px] h-[6px] bg-[#f17009] rounded-full mr-[8px] mt-[10px]' />
            <div className='text-[#f17009] text-[18px] font-bold leading-[26px]'>Các phim nào lỗi các bạn nhất F5 để load lại phim vài lần nha.</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-[810px] mt-[24px] border-solid border-[2px] border-[#1c1c1c] rounded-[12px] p-[24px]'>
        <span className='text-[#7a8882] text-[20px] font-[500] leading-[26px] mb-[16px]'>{onePhim?.tenkhac ? `${onePhim?.tenkhac} - ${onePhim?.tenphim}` : onePhim?.tenphim}</span>
        <span className={`text-[#7a8882] text-[14px] ${!isShowMore ? 'line-clamp-2' : ''}`}>{onePhim?.mota}</span>
        {
          isShowMore ?
            <div className='flex flex-col items-center'>
              <div className='w-[100%] h-[1px] bg-[#272729] mt-[32px]' />
              <MainButton onClick={() => { setIsShowMore(!isShowMore) }}>
                <div className='text-[#7a8882] w-fit text-[14px] border-solid border-x-[1px] border-b-[1px] border-[#f17009] px-[12px] py-[2px]'>Thu gọn</div>
              </MainButton>
            </div>
            :
            <div className='flex flex-col items-center'>
              <div className='w-[100%] h-[32px] bg-gradient-to-t from-[#ffffff29] to-[#ffffff00]' />
              <MainButton onClick={() => { setIsShowMore(!isShowMore) }}>
                <div className='text-[#7a8882] w-fit text-[14px] border-solid border-x-[1px] border-b-[1px] border-[#f17009] px-[12px] py-[2px]'>Mở rộng</div>
              </MainButton>
            </div>

        }
      </div>

    </main>
  )
}

export default DetailPhim