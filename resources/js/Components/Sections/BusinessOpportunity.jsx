import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import businessOpportunityImage from "@/imgs/content/display/business-opportunity.jpg";

gsap.registerPlugin(ScrollTrigger);

export const BusinessOpportunity = () => {
    const sectionRef = useRef(null);
    const contentLeftRef = useRef([]);
    const contentRightRef = useRef(null);
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const leftItems = contentLeftRef.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([...leftItems, contentRightRef.current], {
                    x: 0,
                    y: 0,
                    opacity: 1,
                });

                gsap.set(imageRef.current, { objectPosition: "50% 50%" });

                return;
            }

            gsap.fromTo(
                imageRef.current,
                { objectPosition: "50% 0%" },
                {
                    objectPosition: "50% 100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: imageContainerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(leftItems, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            }).from(
                contentRightRef.current,
                {
                    x: 40,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                },
                "-=0.95",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="business-opportunity-title"
            className="bg-white"
        >
            <div className="container max-w-large">
                <div className="grid min-h-[355px] grid-cols-1 items-center gap-10 py-20 md:grid-cols-2 md:py-24 2xl:py-32 sm:px-5">
                    <div>
                        <Title
                            id="business-opportunity-title"
                            as="h2"
                            variant="subsection"
                            weight="normal"
                            className="lg:max-w-[650px]"
                        >
                            <span
                                ref={(element) => {
                                    contentLeftRef.current[0] = element;
                                }}
                                className=""
                            >
                                O mercado de móveis <br />planejados segue crescendo
                                no Brasil e{" "}
                            </span>

                            <span
                                ref={(element) => {
                                    contentLeftRef.current[1] = element;
                                }}
                                className="font-bold text-primary"
                            >
                                abrindo novas oportunidades para empreender
                            </span>
                        </Title>
                    </div>

                    <div
                        ref={contentRightRef}
                        className="lg:max-w-[520px] space-y-6 text-justify md:text-start"
                    >
                        <Text variant="bodySmall">
                            Movido pela atividade da construção civil, pela valorização dos imóveis e pela demanda por projetos personalizados, o setor moveleiro brasileiro continua entre os segmentos com maior potencial de desenvolvimento. Esse movimento abre espaço para a expansão de marcas consolidadas e para a entrada de novos investidores no mercado. 
                        </Text>

                        <Text variant="small">
                            Segundo a ABIMÓVEL, o setor moveleiro brasileiro movimentou mais de R$ 92,1 bilhões em 2025, reforçando a relevância econômica do segmento e seu potencial para novos negócios.
                        </Text>
                    </div>
                </div>
            </div>

            <div ref={imageContainerRef} className="w-full overflow-hidden">
                <img
                    ref={imageRef}
                    src={businessOpportunityImage}
                    alt="Ambiente de cozinha planejada New Móveis"
                    width="1920"
                    height="1080"
                    loading="lazy"
                    decoding="async"
                    className="block h-[73vh] min-h-[420px] max-h-[730px] w-full object-cover object-center motion-safe:will-change-[object-position] md:px-10 xl:px-30"
                />
            </div>
        </section>
    );
};
