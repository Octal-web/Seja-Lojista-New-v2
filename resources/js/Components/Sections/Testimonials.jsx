import { testimonials } from "@/Data/testimonials.jsx";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { TestimonialsSlides } from "../TestimonialsSlides";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const titleRef = useRef(null);
    const sliderRef = useRef(null);
    const cardRef = useRef(null);

    const activeTestimonial = testimonials[activeIndex] ?? testimonials[0];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        textRef.current,
                        titleRef.current,
                        sliderRef.current,
                        cardRef.current,
                    ],
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                    },
                );

                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(titleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
            })
                .from(
                    textRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.45",
                )
                .from(
                    sliderRef.current,
                    {
                        x: 60,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    "-=0.45",
                )
                .from(
                    cardRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.35",
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="testimonials-title"
            id="lojistas"
            className="py-16 sm:py-24 xl:py-40 2xl:pb-[175px] 2xl:pt-52"
        >
            <div className="container max-w-large">
                <div className="relative flex flex-col lg:flex-row">
                    <div className="relative z-[2] lg:min-w-[430px] xl:min-w-[470px] 2xl:min-w-[520px]">
                        <div className="pb-12 text-center lg:pb-0 lg:pt-10 lg:text-start xl:pt-14 2xl:pt-[73px]">
                            <Title
                                ref={titleRef}
                                id="testimonials-title"
                                as="h2"
                                variant="none"
                                weight="light"
                                className="mx-auto max-w-[430px] text-[32px] leading-[1.08] !text-primary sm:text-[36px] lg:mx-0 lg:max-w-[390px] lg:text-[34px] xl:max-w-[430px] xl:text-[39px] 2xl:text-[42px]"
                            >
                                História de Sucesso
                            </Title>

                            <Text
                                ref={textRef}
                                variant="none"
                                className="mx-auto mt-3 max-w-[420px] text-balance text-[21px] leading-[1.25] sm:text-2xl md:text-[25px] lg:mx-0 lg:max-w-[360px] xl:max-w-[390px] xl:text-[27px]"
                            >
                                <span style={{ fontSize: 'smaller' }}>Lojistas New transformam a presença da marca em{" "}</span>
                                experiência, relacionamento e oportunidades no
                                mercado local.
                            </Text>
                        </div>
                    </div>

                    <div className="min-w-0 flex-1" ref={sliderRef}>
                        <TestimonialsSlides
                            testimonials={testimonials}
                            onSlideChange={setActiveIndex}
                        />
                    </div>

                    <div
                        key={activeIndex}
                        ref={cardRef}
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className="relative z-10 mx-4 -mt-40 border-2 border-white bg-secondary/90 px-6 py-5 sm:mx-auto sm:-mt-24 sm:w-[500px] sm:px-10 md:bg-secondary lg:absolute lg:bottom-8 lg:left-0 lg:mx-0 lg:mt-0 lg:w-[520px] lg:px-12 lg:py-7 xl:bottom-14 xl:w-[561px] xl:pl-16 2xl:bottom-16 2xl:py-10 2xl:pl-20"
                    >
                        <Title
                            weight="bold"
                            as="h3"
                            variant="name"
                            className="!text-white"
                        >
                            {activeTestimonial.name}
                        </Title>

                        <Text
                            variant="subtitle"
                            className="pt-1 !text-[#585957] text-balance"
                        >
                            {activeTestimonial.text}
                        </Text>
                    </div>
                </div>
            </div>
        </section>
    );
};
