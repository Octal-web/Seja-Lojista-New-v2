import React, { useEffect, useRef } from "react";

import { Title } from "@/Components/ui/Title";
import { Text } from "@/Components/ui/Text";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import businessExperience from "@/imgs/content/display/business-experience.jpg";

gsap.registerPlugin(ScrollTrigger);

export const BusinessExperience = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        contentRef.current,
                        imageWrapperRef.current,
                        imageRef.current,
                    ],
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                    },
                );

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            timeline.fromTo(
                contentRef.current,
                {
                    x: -45,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                imageWrapperRef.current,
                {
                    x: 45,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.85,
                    ease: "power2.out",
                },
                "-=0.6",
            );

            timeline.fromTo(
                imageRef.current,
                {
                    scale: 1.08,
                },
                {
                    scale: 1,
                    duration: 1.15,
                    ease: "power2.out",
                },
                "<",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="marca-nacional-titulo"
            className="pt-20 md:pt-36 2xl:pt-52"
        >
            
            <div className="relative grid max-lg:gap-10 grid-cols-1 lg:grid-cols-2">
                <div
                    ref={contentRef}
                    className="w-full lg:max-w-[51.98rem] pl-[5%] lg:pl-[10%] ml-auto h-full flex items-center container"
                >
                    <div className="lg:max-w-[560px] lg:pl-5">
                        <Title
                            id="marca-nacional-titulo"
                            as="h2"
                            variant="none"
                            weight="normal"
                            className="mb-8"
                        >
                            <span className="md:block text-[28px] sm:text-[34px] 2xl:text-[36px]">
                                Uma marca nacional para quem
                            </span>

                            <span className="ml-2 md:ml-0 md:block text-[32px] font-bold leading-[1.1] !text-primary sm:text-[40px] 2xl:text-[45px]">
                                acredita na liberdade de projetar novos caminhos
                            </span>
                        </Title>

                        <Text
                            as="p"
                            variant="base"
                            weight="normal"
                            className="lg:max-w-[500px] !leading-[1.5] text-justify md:text-start"
                        >
                            Com soluções para ambientes residenciais, comerciais e corporativos, a New atende diferentes perfis de consumidores e amplia as possibilidades de atuação do lojista.
                        </Text>

                        <Text
                            as="p"
                            variant="base"
                            weight="normal"
                            className="mt-5 lg:max-w-[500px] !leading-[1.5] text-justify md:text-start"
                        >
                            Ao investir na marca, você passa a fazer parte de um mercado conectado a decisões importantes sobre moradia, trabalho, reforma, decoração e valorização dos espaços, contando com o reconhecimento e a estrutura de uma operação nacional.
                        </Text>
                    </div>
                </div>

                <div
                    ref={imageWrapperRef}
                    className="relative min-h-[500px] overflow-hidden md:min-h-[620px] 2xl:min-h-[770px]"
                >
                    <img
                        ref={imageRef}
                        src={businessExperience}
                        alt="Cozinha planejada New Móveis com acabamento amadeirado"
                        width="1200"
                        height="1200"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
                    />
                </div>
            </div>
        </section>
    );
};