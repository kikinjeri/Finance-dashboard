import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Carousel() {
  return (
    <Swiper>
      <SwiperSlide>One</SwiperSlide>
      <SwiperSlide>Two</SwiperSlide>
    </Swiper>
  );
}
