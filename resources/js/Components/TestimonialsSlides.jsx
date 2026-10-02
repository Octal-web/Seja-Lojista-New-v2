import "swiper/swiper-bundle.css";

import { useState } from "react";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { SwiperButton } from "./SwiperButton";

export const TestimonialsSlides = ({
    testimonials,
    onSlideChange,
}) => {
    const [swiper, setSwiper] = useState(null);

    return (
        <div className="relative min-w-0 flex-1">
            <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={2}
                loop={testimonials.length > 1}
                onSwiper={(swiperInstance) => {
                    setSwiper(swiperInstance);
                    onSlideChange(swiperInstance.realIndex);
                }}
                onRealIndexChange={(swiperInstance) => {
                    onSlideChange(swiperInstance.realIndex);
                }}
                pagination={{
                    el: ".pagination",
                    clickable: true,
                }}
                role="region"
                aria-roledescription="carrossel"
                aria-label="Depoimentos de lojistas New"
            >
                {testimonials.map((item, index) => (
                    <SwiperSlide
                        key={`${item.name}-${index}`}
                        className="!w-full"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} de ${testimonials.length}`}
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            width="1091"
                            height="782"
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="h-[500px] md:h-[95dvh] w-full object-cover lg:max-h-[700px] 2xl:h-[782px]"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {testimonials.length > 1 ? (
                <div className="absolute right-5 bottom-5 z-10 space-x-5 lg:right-10 lg:bottom-11">
                    <SwiperButton
                        isPrev
                        aria-label="Depoimento anterior"
                        onClick={() => swiper?.slidePrev()}
                    />

                    <SwiperButton
                        aria-label="Próximo depoimento"
                        onClick={() => swiper?.slideNext()}
                    />
                </div>
            ) : null}
        </div>
    );
};