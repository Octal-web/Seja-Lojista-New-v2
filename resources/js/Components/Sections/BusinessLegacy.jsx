import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Text } from "@/Components/ui/Text";
import { Title } from "@/Components/ui/Title";

import businessLegacy from "@/imgs/content/display/business-legacy.jpg";
import { LinkButton } from "../ui/LinkButton";
import { businessModels } from "@/Data/businessModels";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

export const BusinessLegacy = () => {
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
        <section
            ref={sectionRef}
            aria-labelledby="loja-propria-titulo"
            id="autorizada"
            className="bg-white scroll-mt-14 pt-14"
        >
            <div className="container max-w-large">

                <div className="">
                    <div className="text-balance text-center">
                        <Title
                            ref={(element) => {
                                titleRefs.current[1] = element;
                            }}
                            as="p"
                            variant="subsection"
                            weight="bold"
                            className="mt-6 uppercase !text-primary"
                        >Não é franquia. </Title>

                        <Title
                            ref={(element) => {
                                titleRefs.current[0] = element;
                            }}
                            id="loja-propria-titulo"
                            as="h2"
                            variant="subsection"
                            weight="normal"
                            className="!text-black"
                        >
                            É um modelo de loja autorizada com suporte de uma marca nacional.
                        </Title>
                    </div>

                    <div>
                        <div className="mt-8 space-y-5 text-center">
                            <Text
                                ref={(element) => {
                                    textRefs.current[0] = element;
                                }}
                                variant="normal"
                                className="mt-5 lg:max-w-[1230px] mx-auto !leading-[1.5]"
                            >
                                Na New, o lojista conduz uma operação própria,
                                com autonomia para gerir o negócio, sem taxa de
                                franquia e sem cobrança de royalties.
                            </Text>

                            <Text
                                ref={(element) => {
                                    textRefs.current[1] = element;
                                }}
                                variant="normal"
                                className="mt-5 lg:max-w-[1230px] mx-auto !leading-[1.5]"
                            >
                                Ao mesmo tempo, conta com o respaldo de uma
                                marca nacional, estrutura industrial
                                consolidada, orientação para implantação da loja
                                e suporte especializado para apoiar o
                                desenvolvimento da operação.
                            </Text>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-[1fr] gap-5 my-10 lg:my-14 max-w-[1230px] mx-auto">
                            {businessModels.map((model, index) => (
                                <article
                                    key={index}
                                    aria-labelledby={`modelo-negocio-${index}-titulo`}
                                    className={`p-4 lg:px-8 lg:py-5 w-full ${model.style}`}
                                >
                                    <div className="flex flex-col-reverse sm:flex-row justify-between sm:items-center mb-3">
                                        <Text
                                            id={`modelo-negocio-${index}-titulo`}
                                            weight="semibold"
                                            className="!text-inherit text-center sm:text-start"
                                            variant="lead"
                                            role="heading"
                                            aria-level="3"
                                        >
                                            {model.title}
                                        </Text>

                                        <FontAwesomeIcon
                                            icon={model.icon}
                                            className="size-9 mx-auto sm:mx-0"
                                        />
                                    </div>

                                    <ul>
                                        {model.text.map((text, index) => (
                                            <Text
                                                as="li"
                                                key={`text-` + index}
                                                className="!text-inherit mt-0.5 list-inside list-disc"
                                            >
                                                {text}
                                            </Text>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>

                        <LinkButton
                            href={`${route("Home.index")}#orcamento`}
                            className="!flex gap-2 truncate mx-auto justify-center"
                        >
                            Quero entender como funciona
                        </LinkButton>
                    </div>
                </div>
            </div>
        </section>
    );
};
