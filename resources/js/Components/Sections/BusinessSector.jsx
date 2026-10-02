import React, { useEffect, useRef } from "react";

import { Title } from "@/Components/ui/Title";
import { Text } from "@/Components/ui/Text";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import businessSector from "@/imgs/content/display/business-sector.jpg";

gsap.registerPlugin(ScrollTrigger);

export const BusinessSector = () => {
    const sectionRef = useRef(null);
    const titleRefs = useRef([]);
    const textRefs = useRef([]);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const titleElements = titleRefs.current.filter(Boolean);
            const textElements = textRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        ...titleElements,
                        ...textElements,
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
                    toggleActions: "play none none none",
                },
            });

            timeline
                .from(imageWrapperRef.current, {
                    x: -40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                })
                .from(
                    imageRef.current,
                    {
                        scale: 1.07,
                        duration: 1.2,
                        ease: "power2.out",
                    },
                    "<",
                )
                .from(
                    titleElements,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                    },
                    "-=0.85",
                )
                .from(
                    textElements,
                    {
                        y: 24,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: "power3.out",
                    },
                    "-=0.5",
                );
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section ref={sectionRef} aria-labelledby="marca-setor-titulo">
            <div className="relative grid max-lg:gap-10 grid-cols-1 lg:grid-cols-2">
                <div className="w-full lg:max-w-[51.98rem] pl-[5%] lg:pl-[10%] ml-auto h-full flex items-center container">
                    <div className="lg:max-w-[560px] lg:pl-5 mt-14 lg:mt-0">
                        <Title
                            ref={(element) => {
                                titleRefs.current[0] = element;
                            }}
                            id="loja-propria-titulo"
                            as="h2"
                            variant="subsection"
                            weight="normal"
                            className="lg:max-w-[470px] !text-black"
                        >
                            Experiência no setor é um diferencial.
                        </Title>

                        <Title
                            ref={(element) => {
                                titleRefs.current[1] = element;
                            }}
                            as="p"
                            variant="subsection"
                            weight="bold"
                            className="mt-6 uppercase !text-primary"
                        >
                            Não uma exigência.
                        </Title>

                        <div className="mt-8 space-y-5 text-justify md:text-start">
                            <Text
                                ref={(element) => {
                                    textRefs.current[0] = element;
                                }}
                                variant="normal"
                                className="mt-5 lg:max-w-[470px] !leading-[1.5]"
                            >
                                A New reúne lojistas com diferentes trajetórias profissionais. Alguns já atuavam nos segmentos de arquitetura e decoração; outros encontraram na marca uma oportunidade de empreender.
                            </Text>

                            <Text
                                ref={(element) => {
                                    textRefs.current[1] = element;
                                }}
                                variant="normal"
                                className="mt-5 lg:max-w-[470px] !leading-[1.5]"
                            >
                                Com suporte especializado em todas as etapas, oferecemos a estrutura necessária para que cada operação se desenvolva com consistência.
                            </Text>
                        </div>
                    </div>
                </div>

                <div
                    ref={imageWrapperRef}
                    className="relative min-h-[500px] overflow-hidden md:min-h-[620px] 2xl:min-h-[770px]"
                >
                    <img
                        ref={imageRef}
                        src={businessSector}
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
