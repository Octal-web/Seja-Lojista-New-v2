import { timeline } from "@/Data/timeline";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";
import { LinkButton } from "../ui/LinkButton";

gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardRefs = useRef([]);
    const imageRefs = useRef([]);
    useEffect(() => {
        const context = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);
            const images = imageRefs.current.filter(Boolean);

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([headingRef.current, ...cards], {
                    y: 0,
                    opacity: 1,
                });

                gsap.set(images, {
                    scale: 1,
                });

                return;
            }

            const timelineAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 78%",
                    toggleActions: "play none none none",
                },
            });

            timelineAnimation
                .fromTo(
                    headingRef.current,
                    {
                        y: 25,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: "power2.out",
                    },
                )
                .fromTo(
                    cards,
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=0.35",
                )
                .fromTo(
                    images,
                    {
                        scale: 1.08,
                    },
                    {
                        scale: 1,
                        duration: 1.1,
                        stagger: 0.12,
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
            id="porque"
            aria-labelledby="timeline-title"
            className="relative scroll-mt-14 overflow-hidden py-20 md:py-24 lg:py-28 md:mt-20 2xl:mt-44"
        >
            <div className="absolute inset-0 bottom-auto h-[75%] -z-10 bg-secondary" />
            <div className="container max-w-large">
                <div className="flex flex-col lg:flex-row gap-5 items-center lg:justify-between mb-4">
                    <Title
                        ref={headingRef}
                        id="timeline-title"
                        as="h2"
                        variant="display"
                        weight="normal"
                        className="!text-white"
                    >
                        Por que abrir uma loja New Móveis Planejados?
                    </Title>

                    <LinkButton
                        href={`${route("Home.index")}#orcamento`}
                        className="truncate"
                    >
                        Quero abrir minha loja New
                    </LinkButton>
                </div>

                <div className="mb-10">
                    <Text>Ser lojista New é ter uma das maiores marcas de móveis planejados do Brasil.</Text>
                </div>

                <div className="relative">
                    <div
                        className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-[30px]"
                        role="list"
                        aria-label="Motivos para abrir uma loja New Móveis Planejados"
                    >
                        {timeline.map((item, index) => (
                            <div
                                key={`${item.title}-${index}`}
                                className="min-w-0"
                                role="listitem"
                                aria-labelledby={`timeline-card-${index}-title`}
                            >
                                <article
                                    ref={(element) => {
                                        cardRefs.current[index] = element;
                                    }}
                                    className="relative flex aspect-[10/11] flex-col justify-end overflow-hidden"
                                >
                                    <img
                                        ref={(element) => {
                                            imageRefs.current[index] = element;
                                        }}
                                        src={item.image}
                                        alt={item.imageAlt}
                                        width="720"
                                        height="910"
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 h-full w-full object-cover will-change-transform"
                                    />

                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_28%,rgba(0,0,0,.12)_48%,rgba(0,0,0,.9)_100%)]"
                                    />

                                    <span
                                        aria-label={`Item ${index + 1}`}
                                        className="absolute left-8 top-8 flex size-10 items-center justify-center bg-white font-secondary text-base text-black"
                                    >
                                        {index + 1}
                                    </span>

                                    <div className="relative px-6 pb-7 pt-24 xl:px-8 xl:pb-9">
                                        <Title
                                            id={`timeline-card-${index}-title`}
                                            as="h3"
                                            variant="none"
                                            weight="bold"
                                            className="max-w-[290px] text-[24px] leading-[1.12] !text-white"
                                        >
                                            {item.title}

                                            {item.title2 ? (
                                                <span className="block">
                                                    {item.title2}
                                                </span>
                                            ) : null}
                                        </Title>

                                        <Text
                                            variant="base"
                                            weight="normal"
                                            className="mt-5 !text-sm max-w-[290px] !leading-[1.65] !text-white text-justify md:text-start"
                                        >
                                            {item.text}
                                        </Text>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
