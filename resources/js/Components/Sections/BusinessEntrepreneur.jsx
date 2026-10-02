import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { LinkButton } from "@/Components/ui/LinkButton";
import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import businessEntrepreneur from "@/imgs/content/display/business-entrepreneur.jpg";

gsap.registerPlugin(ScrollTrigger);

export const BusinessEntrepreneur = () => {
    const sectionRef = useRef(null);
    const titleRefs = useRef([]);
    const textRefs = useRef([]);
    const imageWrapperRef = useRef(null);
    const imageRef = useRef(null);
    const buttonWrapperRef = useRef(null);

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
                        buttonWrapperRef.current,
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
                )
                .from(
                    buttonWrapperRef.current,
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.35",
                );
        }, sectionRef);

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="business-entrepreneur-title"
            className="bg-white"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div
                    ref={imageWrapperRef}
                    className="relative min-h-[500px] overflow-hidden md:min-h-[620px] 2xl:min-h-[770px]"
                >
                    <img
                        ref={imageRef}
                        src={businessEntrepreneur}
                        alt="Living planejado New Móveis com painel de televisão e poltronas"
                        width="1200"
                        height="1200"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
                    />
                </div>

                <div className="flex min-h-[520px] items-center py-20 md:pl-12 md:pr-5 container lg:min-h-[655px]">
                    <div className="lg:max-w-[500px]">
                        <Title
                            ref={(element) => {
                                titleRefs.current[0] = element;
                            }}
                            id="business-entrepreneur-title"
                            as="h2"
                            variant="subsection"
                            weight="normal"
                            className="lg:max-w-[450px] !leading-[1.12] !text-black text-balance"
                        >
                            Para quem deseja empreender em um
                            <span className="ml-2 lg:ml-0 lg:block !text-primary">
                                mercado conectado a projetos e pessoas
                            </span>
                        </Title>

                        <div className="mt-8 space-y-5 text-justify md:text-start">
                            <Text
                                ref={(element) => {
                                    textRefs.current[0] = element;
                                }}
                                variant="body"
                                weight="light"
                                className="lg:max-w-[470px] !leading-[1.5]"
                            >
                                A New é uma oportunidade para empreendedores que
                                buscam atuar em um segmento consultivo, no qual
                                cada venda envolve escuta, planejamento,
                                relacionamento e construção de soluções para
                                diferentes ambientes.
                            </Text>

                            <Text
                                ref={(element) => {
                                    textRefs.current[1] = element;
                                }}
                                variant="body"
                                weight="light"
                                className="lg:max-w-[470px] !leading-[1.5]"
                            >
                                O modelo se conecta com quem valoriza experiência
                                de compra, atendimento personalizado, visão de
                                negócio e percebe o potencial dos móveis
                                planejados em projetos residenciais, comerciais e
                                corporativos.
                            </Text>

                            <Text
                                ref={(element) => {
                                    textRefs.current[2] = element;
                                }}
                                variant="bodySmall"
                                weight="light"
                                className="lg:max-w-[470px] !leading-[1.5]"
                            >
                                Não é preciso ter uma trajetória única no setor,
                                mas é importante ter interesse em desenvolver uma
                                loja em um mercado que conversa com arquitetura,
                                design, decoração, construção e estilo de vida.
                            </Text>
                        </div>

                        <div ref={buttonWrapperRef} className="mt-10">
                            <LinkButton
                                href={`${route("Home.index")}#orcamento`}
                                variant="primary"
                                className="uppercase"
                            >
                                Quero ser lojista New
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};