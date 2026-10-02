import { storesSlides } from "@/Data/storesSlides";

import { useEffect, useRef, useState } from "react";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

import { SwiperButton } from "./SwiperButton";
import { LinkButton } from "./ui/LinkButton";

export const StoresSlides = () => {
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    const swiperRef = useRef(null);
    const containerRef = useRef(null);

    const [activeSlide, setActiveSlide] = useState(0);
    const [swiper, setSwiper] = useState(null);

    useEffect(() => {
        if (!swiper || swiper.destroyed) return;

        const section = containerRef.current.closest("section") ?? containerRef.current;
        const restoreDelay = () => {
            swiper.params.autoplay.delay = 8000;
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || swiper.destroyed) return;

            swiper.params.autoplay.delay = 3000;
            swiper.once("autoplay", restoreDelay);
            swiper.autoplay.start();
            observer.disconnect();
        });

        observer.observe(section);

        return () => {
            observer.disconnect();
            swiper.off("autoplay", restoreDelay);
            if (!swiper.destroyed) swiper.autoplay.stop();
        };
    }, [swiper]);

    return (
        <div ref={containerRef} className="relative overflow pb-20 md:pb-28 xl:pb-36">
            <div className="relative z-[1]">
                <Swiper
                    centeredSlides
                    loop
                    grabCursor
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        enabled: false,
                        delay: 6000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    slidesPerView={1.7}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.3,
                        },
                        640: {
                            slidesPerView: 1.4,
                        },
                        1024: {
                            slidesPerView: 1.5,
                        },
                        1440: {
                            slidesPerView: 1.7,
                        },
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setSwiper(swiper);
                        setActiveSlide(swiper.realIndex);
                    }}
                    onRealIndexChange={(swiper) => {
                        setActiveSlide(swiper.realIndex);
                    }}
                    className="!overflow-visible"
                    role="region"
                    aria-roledescription="carrossel"
                    aria-label="Lojas New Móveis Planejados"
                >
                    {storesSlides.map((slide, index) => {
                        const isActive = activeSlide === index;

                        return (
                            <SwiperSlide
                                key={index}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${index + 1} de ${storesSlides.length}`}
                            >
                                <div
                                    className={`aspect-square md:aspect-[5/3] overflow-hidden transition-[transform,opacity] duration-500 ease-out ${
                                        isActive
                                            ? "scale-100 opacity-100"
                                            : "scale-[0.85] opacity-70"
                                    }`}
                                >
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        width="1110"
                                        height="660"
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <div className="absolute left-1/2 top-[40%] z-[10] hidden w-[72%] -translate-x-1/2 -translate-y-[40%] justify-between sm:flex lg:w-[68%] xl:w-[70.5%] 2xl:w-[61.5%] pointer-events-none">
                    <SwiperButton
                        ref={prevButtonRef}
                        isPrev
                        aria-label="Loja anterior"
                        onClick={() => {
                            swiperRef.current?.slidePrev();
                        }}
                        className="border border-[#909090] pointer-events-auto"
                    />

                    <SwiperButton
                        ref={nextButtonRef}
                        aria-label="Próxima loja"
                        onClick={() => {
                            swiperRef.current?.slideNext();
                        }}
                        className="border border-[#909090] pointer-events-auto"
                    />
                </div>

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    variant="primary"
                    className="uppercase relative left-1/2 -translate-x-1/2 mt-20"
                >
                    Quero ser lojista New
                </LinkButton>
            </div>

            <div
                aria-hidden="true"
                className="absolute bottom-0 h-[70%] w-full bg-zinc-100"
            />
        </div>
    );
};
