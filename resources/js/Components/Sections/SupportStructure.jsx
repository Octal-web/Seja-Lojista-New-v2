import { supportStructureData } from "@/Data/supportStructureData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { LinkButton } from "../ui/LinkButton";
import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

gsap.registerPlugin(ScrollTrigger);

export const SupportStructure = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(".content-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            }).from(
                ".cards",
                {
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.5",
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            id="suporte"
            aria-labelledby="suporte-estrutura-titulo"
            className="bg-zinc-100 py-20 sm:pt-24 xl:pt-20 2xl:pt-36 2xl:pb-30"
        >
            <div className="container max-w-large flex flex-col items-center text-center">
                 <Title
                    id="suporte-estrutura-titulo"
                    variant="none"
                    weight="thin"
                    className="mt-10 text-[30px] leading-[1.3] tracking-[-0.035em]  sm:text-[42px] 2xl:text-[45px] content-item"
                >
                    Suporte para estruturar sua loja New e desenvolver
                    <span className="ml-2 lg:ml-0 lg:block content-item text-primary">
                         a operação comercial
                    </span>
                </Title>

                <Text className="max-w-[1067px] pt-7 lg:pt-10 content-item text-justify md:text-center">
                    O acompanhamento envolve treinamentos, orientação comercial, apoio de marketing, diretrizes de posicionamento, materiais institucionais e suporte para fortalecer a presença da loja na região.
                </Text> 

                <ul className="grid sm:grid-cols-2 gap-4 mt-10 lg:mt-16 2xl:mt-24">
                    {supportStructureData.map((item) => (
                        <li
                            key={item.title}
                            className="bg-white text-start px-6 2xl:px-9 py-8 border border-[#D3D3D3] cards"
                        >
                            <img
                                className="size-8 xl:size-11 mb-4 xl:mb-8"
                                src={item.icon}
                                alt=""
                                aria-hidden="true"
                            />
                            <Text
                                variant="lead"
                                role="heading"
                                aria-level="3"
                                className="text-primary"
                            >
                                {item.title}
                            </Text>

                            <Text className="mt-2 text-justify md:text-start">{item.text}</Text>
                        </li>
                    ))}
                </ul>

                <LinkButton
                    href={`${route("Home.index")}#orcamento`}
                    variant="primary"
                    className="mt-10 xl:mt-24 2xl:mt-32"
                >
                    QUERO SER LOJISTA
                </LinkButton>
            </div>
        </section>
    );
};
