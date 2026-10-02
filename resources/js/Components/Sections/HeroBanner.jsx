import { useEffect, useRef, useState } from "react";

import { StoreFirstForm } from "@/Components/Sections/StoreFirstForm";
import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bannerMobile from "@/imgs/content/display/main-bg-mobile.jpg";
import banner from "@/imgs/content/display/main-bg.jpg";
import bannerVideo from "@/video/site/banner-home.mp4";

gsap.registerPlugin(ScrollTrigger);

const titleLines = ["Seja um Lojista New"];

export const HeroBanner = () => {
    const sectionRef = useRef(null);
    const heroImageRef = useRef(null);
    const heroContentRef = useRef(null);
    const titleLineRefs = useRef([]);

    const [videoFailed, setVideoFailed] = useState(false);

    useEffect(() => {
        const video = heroImageRef.current;
        if (!video) return;

        const attemptPlay = () => {
            video.play().catch(() => setVideoFailed(true));
        };

        attemptPlay();

        const handleInteraction = () => {
            video.play().catch(() => {});
        };

        document.addEventListener("touchstart", handleInteraction, {
            once: true,
        });
        document.addEventListener("click", handleInteraction, {
            once: true,
        });

        return () => {
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("click", handleInteraction);
        };
    }, []);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            const titleElements = titleLineRefs.current.filter(Boolean);

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        heroImageRef.current,
                        heroContentRef.current,
                        ...titleElements,
                    ],
                    {
                        clearProps: "all",
                        opacity: 1,
                        y: 0,
                        yPercent: 0,
                    },
                );

                return;
            }

            gsap.fromTo(
                heroImageRef.current,
                { scale: 1.03, yPercent: 0 },
                {
                    scale: 1.1,
                    yPercent: -4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                },
            );

            gsap.fromTo(
                titleElements,
                { yPercent: 110 },
                {
                    yPercent: 0,
                    duration: 0.85,
                    ease: "power3.out",
                    stagger: 0.1,
                },
            );

            gsap.fromTo(
                heroContentRef.current,
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.45,
                    ease: "power2.out",
                },
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="hero-title"
            aria-describedby="hero-description"
            className="relative isolate min-h-[680px] z-[1] bg-primary"
        >
            <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
                {videoFailed && (
                    <picture className="absolute inset-0 -z-30 block h-full w-full">
                        <source media="(max-width: 639px)" srcSet={bannerMobile} />
                        <img
                            src={banner}
                            alt=""
                            width="1920"
                            height="1080"
                            loading="eager"
                            fetchpriority="high"
                            decoding="async"
                            aria-hidden="true"
                            className="h-full w-full object-cover object-left sm:object-[62%_center] lg:object-top"
                        />
                    </picture>
                )}

                <video
                    ref={heroImageRef}
                    className={`absolute inset-0 -z-30 h-full w-full object-cover object-left will-change-transform sm:object-[62%_center] lg:object-top ${videoFailed ? "invisible" : ""}`}
                    poster={banner}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                >
                    <source src={bannerVideo} type="video/mp4" />
                </video>
            </div>

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(0,0,0,.7)_20%,_transparent_45%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-black from-60% to-80% md:from-50% to-transparent md:to-60% opacity-40"
            />

            <div className="container relative max-w-large">
                <div className="flex min-h-[680px] flex-col justify-end gap-10 pb-12 pt-32 sm:min-h-[720px] sm:pb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-36 2xl:min-h-[calc(100svh-100px)]">
                    <div className="w-full max-w-[680px] lg:max-w-[520px] 2xl:max-w-[680px]">
                        <Title
                            id="hero-title"
                            as="h1"
                            variant="hero"
                            weight="normal"
                            aria-label="Abra uma loja New Móveis Planejados na sua cidade"
                            className="text-white"
                        >
                            {titleLines.map((line, index) => (
                                <span
                                    key={line}
                                    aria-hidden="true"
                                    className="block overflow-hidden pb-1"
                                >
                                    <span
                                        ref={(element) => {
                                            titleLineRefs.current[index] =
                                                element;
                                        }}
                                        className="block"
                                    >
                                        {line}
                                    </span>
                                </span>
                            ))}
                        </Title>

                        <div
                            ref={heroContentRef}
                            className="mt-4 max-w-[550px]"
                        >
                            <Text
                                id="hero-description"
                                variant="bodySmall"
                                weight="normal"
                                className="text-white"
                            >
                                Leve a New para a sua cidade e conte com a estrutura de uma marca nacional de móveis planejados para desenvolver seu negócio.
                            </Text>
                        </div>
                    </div>

                    <div className="w-full lg:max-w-[500px] lg:shrink-0 xl:max-w-[540px]">
                        <StoreFirstForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
