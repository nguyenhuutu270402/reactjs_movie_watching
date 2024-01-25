import ItemPhim from 'src/components/ItemPhim';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomArrowSlider, { ArrowType } from 'src/components/CustomArrowSlider/CustomArrowSlider';
import phimApi from 'src/services/phim.api';
import { useEffect, useState } from 'react';
import { Phim } from 'src/types/util.type';
import Loading from 'src/components/Loading';
import ItemPhimHot from 'src/components/ItemPhimHot';
import { useNavigate } from 'react-router-dom';
import path from 'src/utils/path';

export default function Home() {
  const [listPhim, setListPhim] = useState<Phim[] | undefined>(undefined);
  const [listTop10Phim, setListTop10Phim] = useState<Phim[] | undefined>(undefined);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchData = async () => {

    setIsLoading(true);
    const res1 = await phimApi.getAllPhim();
    const res2 = await phimApi.getTop10Phim();
    setListPhim(res1.data);
    setListTop10Phim(res2.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])

  let slider: Slider | null = null;
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const getNumberSlide = () => {
    if (screenWidth > 768 && screenWidth <= 1024) return 4;
    if (screenWidth > 640 && screenWidth <= 768) return 3;
    if (screenWidth <= 640) return 2;
    return 6;
  }

  const onClickItem = () => {
    navigate(path.login)
  }

  return (
    isLoading ? <Loading /> :
      <main className='items-center flex flex-col flex-1'>
        <div className='w-[1170px] flex flex-col items-start mt-[20px] '>
          <span className='text-white text-[20px] ml-[16px]'>HÔM NAY XEM PHIM GÌ?</span>
          <div className='bg-[#202025] h-[4px] w-[100%]' />
        </div>
        <div className='relative mt-[16px] sm:w-full md:w-[750px] lg:w-[970px] xl:w-[1170px] flex justify-center items-center'>
          <Slider ref={(c) => (slider = c)} slidesToShow={getNumberSlide()} className={`sm:w-full md:w-[750px] lg:w-[970px] xl:w-[1170px]`} {...settings}>
            {listTop10Phim?.map((item, index) => (
              <ItemPhim data={item} onSelect={() => { }} className='mx-[4px] md:w-[175px] md:h-[240px] lg:w-[151px] lg:h-[225px] xl:w-[186px] xl:h-[250px]' key={index} />
            ))}
          </Slider>
          <CustomArrowSlider arrowType={ArrowType.PREVIOUS} onClick={() => { slider && slider.slickPrev() }} />
          <CustomArrowSlider arrowType={ArrowType.NETX} onClick={() => { slider && slider.slickNext() }} />
        </div>

        <div className='w-[1170px] flex flex-col items-start'>
          <div className='bg-white h-[1px] w-[100%] my-[20px]' />
          <span className='text-white text-[20px] bg-[#202025] w-full py-[10px] rounded-[50px] text-center font-bold'>PHIM MỚI CẬP NHẬT</span>
          <div className='bg-white h-[1px] w-[100%] my-[20px]' />
        </div>

        <div className='flex flex-row w-[1170px]'>
          <div className='flex flex-col w-[770px]'>
            <div className='grid grid-cols-4 w-fit h-fit gap-[10px]'>
              {listPhim?.map((item, index) => (
                <ItemPhim data={item} onSelect={() => { }} className='' key={index} />
              ))}
            </div>
            <div className='bg-white h-[1px] w-[100%] mt-[48px] mb-[20px]' />
            <span className='text-[#898b81] text-[14px] mb-[8px]'>PHIMGI.NET xin giới thiệu đến người xem những thể loại phim hay và đặc sắc như :</span>
            {introduceList?.map((item, index) => (
              <div className='flex flex-row justify-start items-start ml-[20px]' key={index}>
                <div className='w-[4px] h-[4px] bg-[#898b81] rounded-full mr-[10px] mt-[8px]'></div>
                <span className='text-[#898b81] text-[14px] mb-[4px] w-full'>{item}</span>
              </div>
            ))}
            <div className='bg-white h-[1px] w-[100%] my-[20px]' />
          </div>

          <div className='flex flex-1 flex-col ml-[30px]'>
            <img className='w-full object-cover rounded-[5px]' src="https://s3t3d2y8.afcdn.net/library/867020/21a2865b55e658176bbac7bc9879eb792d067f37.webp" alt="" />
            <span className='text-white text-[20px] ml-[16px] mt-[16px]'>PHIM HOT</span>
            <div className='bg-[#202025] h-[4px] w-[100%]' />
            {listTop10Phim?.map((item, index) => (
              <ItemPhimHot data={item} onSelect={(i) => { }} className='my-[10px]' key={index} />
            ))}

          </div>
        </div>

      </main>
  )
}

const introduceList = [
  "Phim lẻ Âu Mỹ: nổi bật với các phim như Hobbit, Biệt Đội Siêu Anh Hùng, Thần Sấm, Người Sắt, Taken, John Wick, Fast and Furious, Immortals, Focus, Không Đơn Độc, Green Lantern, Run All Night, 50 Sắc Thái, Cướp biển vùng Caribbe…",
  "Phim lẻ Châu Á: được biết đến với các bộ phim như Tuổi Đôi Mươi, Bạo Phong Ngữ, Sát Phá Lang, Kiếm Rồng, Đại Thủy Chiến, Vô Gian Đạo, Xích Bích, Thập Diện Mai Phục, Chuyên Gia Bắt Ma, Sparrow…",
  "Phim lẻ Kinh Dị: có thể nhắc đến các bộ phim như Hồi Sinh, Quỷ Quyệt, Thứ Sáu Ngày 13, Dư Âm, Cuộc Gọi Lúc Nửa Đêm, Xác Sống, Bí Ẩn Kim Tự Tháp, Kỳ Án Truyện Tranh, Tế Xác, Chơi Ngải, Búp Bê Ma Ám, Điềm Gở…",
  "Phim lẻ Hoạt Hình: Big Hero 6, Hành Trình Trở Về, Vua Banh Bàn, Doraemon Đôi Bạn Thân, Asterix, Penguins of Madagascar, Pixar, Pokemon, Vua Banh Bàn, Frozen, Rio, Xì Trum, Hội Quái Hộp, Câu Chuyện Đồ Chơi…",
  "Phim lẻ Khoa Học Viễn Tưởng: Transformers, Avengers, Iron Man, Interstellar, Người Thừa Kế Vũ Trụ, Vân Đồ, Bộ Tứ Siêu Đẳng, Người Truyền Ký Ức, Kẻ Hủy Diệt, Man of Steel, The Dark Knight, Giải Mã Mê Cung, Lucy…",
  "Phim lẻ Tình Cảm: Vẫn Là Alice, Sắc Đẹp Vĩnh Cửu, Love Sick, All About Love, Khi Anh Đang Ngủ, Love Actually, Cinderella, 3 Ngày Để Yêu, Giấc Mơ Thay Đổi, Love Forecast, Cô Dâu Nổi Loạn, Lộ Thủy Hồng Nhan…",
  "Phim lẻ Hành Động Phiêu Lưu: The Departed, Mật Vụ Kingsman, Báo Thù, Vụ Cướp Thế Kỷ, Du Khách Bí Ẩn, American Sniper, Bạch Tuyết Và Gã Thợ Săn, Inglourious Basterds, Robin Hood, Django Unchained…",
  "Phim lẻ Hài Hước: Click, Đen Đủ Đường, Vùng Đất Thây Ma, Scary Movie, Tình Yêu Và Tình Dược, Chú Gấu Ted, The Interview, Ba Chàng Ngốc, Ninja Rùa, Gia Đình Tinh Võ, Let’s Be Cops, Hoa Điền Hỷ Sự…",
  "Phim lẻ Võ Thuật: Truy Tìm Tượng Phật, The Raid, Thiết Quyền, Chung Quỳ Phục Ma, Kungfu Jungle, Long Hổ Môn, Shanghai Knights, Tinh Võ Anh Hùng, Hoàng Phi Hồng, Hoắc Nguyên Giáp, Diệp Vấn, Flash Point…",
]