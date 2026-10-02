import { infos } from "@/Data/footer";

import logoNew from "@/imgs/site/img/logo-new.png";
import logoOctal from "@/imgs/site/img/logo-octal.png"; 

export const Footer = () => {
    return (
        <footer className="font-primary text-custom-gray text-xs mb-11 container pt-10 ">
            <div className="2xl:max-w-large mb-16 lg:mb-24 mx-auto" />
            <img
                loading="lazy"
                className="w-36 h-12 mx-auto mb-10"
                src={logoNew}
                alt="New Móveis Planejados"
            />

            {/* <div className="flex flex-col text-center gap-3 mb-8 lg:mb-10 opacity-[77%] ">
                <p>Siga-nos nas redes sociais:</p>
                <div className="flex gap-2 mx-auto">
                    {socialMedias.map((media, index) => (
                        <a
                            className="w-fit"
                            href={media.link}
                            target="_blank"
                            key={media.link}
                        >
                            <img
                                loading="lazy"
                                className="size-4"
                                src={media.icon}
                                alt="rede social"
                                aria-hidden="true"
                            />
                        </a>
                    ))}
                </div>
            </div> */}

            <div className="flex flex-col xl:flex-row xl:justify-between gap-10 xl:gap-0 opacity-[77%] 2xl:max-w-large mx-auto border-t pt-8 lg:pt-10 items-center">
                <div className="flex flex-wrap justify-between sm:justify-center gap-3 sm:gap-x-5 lg:flex-row 2xl:gap-11">
                    {infos.map((info, index) => (
                        <div key={index}>
                            <p>
                                {info.text}
                                <a
                                    className="underline hover:opacity-80"
                                    target={info.target}
                                    rel={info.target === "_blank" ? "noopener noreferrer" : undefined}
                                    href={info.link}
                                >
                                    {info.linkText}
                                </a>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mx-auto xl:mx-0">
                    <div className="flex items-center gap-2 truncate">
                        <p>Desenvolvido por: </p>

                        <a
                            target="_blank"
                            rel="noopener"
                            href="https://www.8poroito.com.br/"
                        >
                            <img
                                loading="lazy"
                                className="h-5"
                                src={logoOctal}
                                alt="Octal Web"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
