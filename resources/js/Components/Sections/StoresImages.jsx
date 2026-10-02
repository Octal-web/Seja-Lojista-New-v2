import { useEffect, useRef } from "react";
import { StoresSlides } from "../StoresSlides";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const StoresImages = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            const textElement = textRef.current;
            const titleElement = titleRef.current;

            if (prefersReducedMotion) {
                gsap.set([textElement, titleElement], {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            timeline
                .from(titleElement, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(
                    textElement,
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
        <section ref={sectionRef} aria-labelledby="stores-images-title">
            <div className="pb-16 xl:pb-20 2xl:pb-24 text-center container max-w-large">
                <Title
                    ref={titleRef}
                    id="stores-images-title"
                    as="h2"
                    variant="section"
                    className="text-primary text-balance lg:max-w-[900px] mx-auto"
                >
                    A New segue ampliando sua presença em diferentes regiões do
                    país.
                </Title>
                <Text
                    ref={textRef}
                    variant="lead"
                    className="lg:max-w-[752px] mx-auto pt-3"
                >
                    Com a avaliação contínua de novas praças, a marca busca
                    empreendedores interessados em levar a experiência New para
                    mercados com potencial de desenvolvimento.
                </Text>
            </div>
            <StoresSlides />
        </section>
    );
};
