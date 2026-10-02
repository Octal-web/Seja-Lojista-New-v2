import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useRef, useMemo, useState } from "react";

import Lenis from "lenis";

import { CookieModal } from "@/Components/CookieModal";
import { Footer } from "@/Components/Footer";
import { MenuItem } from "@/Components/MenuItem";
import { LinkButton } from "@/Components/ui/LinkButton";
import { useVisitTracking } from "@/Hooks/useVisitTracking";

import { faqDoubts } from "@/Data/faqDoubts";
import logoNew from "@/imgs/site/img/logo-new.png";
import logoNewWhite from "@/imgs/site/img/logo-new-white.png";
import mainBg from "@/imgs/content/display/main-bg.jpg";

import icon from "@/imgs/favicon.ico";

const DefaultLayout = ({
    children,
    scrollToTop = false,
    title = "Seja Lojista | New Móveis",
    description = "As melhores soluções em móveis planejados para a sua casa ou apartamento. Cozinha, dormitório, closet, living, home-theater e mais.",
}) => {
    const { controller, notifyCookie, rejectCookie, lojas } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);

    useVisitTracking();

    const hasDarkHeader = ["Home"].includes(controller) && isAtTop;

    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        lenisRef.current = lenis;
        window.lenis = lenis;

        const handleScroll = ({ scroll }) => {
            setIsAtTop(scroll <= 10);
        };

        setIsAtTop(window.scrollY <= 10);

        lenis.on("scroll", handleScroll);

        if (scrollToTop) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            lenis.scrollTo(0, { immediate: true, force: true });
        }

        let animationFrameId;

        const raf = (time) => {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        };

        animationFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrameId);
            lenis.off("scroll", handleScroll);
            delete window.lenis;
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [scrollToTop]);

    const toggleMenu = () => {
        setIsMenuOpen((currentState) => !currentState);
    };

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        const hasCookie = (name) => {
            return document.cookie
                .split("; ")
                .some((cookie) => cookie.startsWith(`${name}=`));
        };

        const acceptedCookies = notifyCookie || hasCookie("notify-cookies");
        const rejectedCookies = rejectCookie || hasCookie("reject-cookies");

        if (!acceptedCookies || rejectedCookies) {
            return;
        }

        if (!document.getElementById("gtm-script")) {
            const script = document.createElement("script");

            script.id = "gtm-script";
            script.innerHTML = `
            (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TQ58ST6');
        `;

            document.head.appendChild(script);
        }

        if (!document.getElementById("gtm-noscript")) {
            const noscript = document.createElement("noscript");

            noscript.id = "gtm-noscript";
            noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TQ58ST6" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;

            document.body.appendChild(noscript);
        }
    }, [notifyCookie, rejectCookie, trackingEnabled]);

    const localBusinessSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "FurnitureStore"],
            name: "Seja Lojista | New Móveis",
            description,
            url: window.location.origin + "/sejalojista26'",
            logo: {
                "@type": "ImageObject",
                url: logoNew,
            },
            image: mainBg,
            email: "atendimento@newmoveis.com.br",
            priceRange: "$$",
            sameAs: lojas.flatMap((s) =>
                [s.instagram, s.whatsapp].filter(Boolean),
            ),
            address: lojas.map((s) => ({
                "@type": "PostalAddress",
                addressLocality: s.cidade,
                addressRegion: s.estado,
                addressCountry: "BR",
                streetAddress: s.endereco.replace("\n", ", "),
            })),
            contactPoint: lojas.map((s) => ({
                "@type": "ContactPoint",
                name: s.nome,
                instagram: s.instagram,
                whatsapp: s.whatsapp,
                telephone: s.telefone,
                contactType: "customer service",
                areaServed: s.cidade,
                availableLanguage: "Portuguese",
            })),
            openingHoursSpecification: [
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                    ],
                    opens: "09:00",
                    closes: "20:00",
                },
                {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: "Saturday",
                    opens: "09:00",
                    closes: "14:00",
                },
            ],
        }),
        [],
    );

    const faqSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqDoubts.map((item) => ({
                "@type": "Question",
                name: item.title,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.text,
                },
            })),
        }),
        [],
    );

    const organizationSchema = useMemo(
        () => ({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Seja Lojista | New Móveis",
            url: window.location.origin + "/sejalojista26'",
            logo: {
                "@type": "ImageObject",
                url: logoNew,
            },
            email: "atendimento@newmoveis.com.br",
            contactPoint: lojas.map((s) => ({
                "@type": "ContactPoint",
                name: s.nome,
                instagram: s.instagram,
                whatsapp: s.whatsapp,
                telephone: s.telefone,
                contactType: "customer service",
                areaServed: s.cidade,
                availableLanguage: "Portuguese",
                email: s.email || undefined,
            })),
            sameAs: lojas.flatMap((s) =>
                [s.instagram, s.whatsapp].filter(Boolean),
            ),
        }),
        [lojas],
    );

    const menuItems = [
        {
            name: "Por que New?",
            route: "Home.index",
            to: "#porque",
            external: false,
        },
        {
            name: "Loja própria autorizada",
            route: "Home.index",
            to: "#autorizada",
            external: false,
        },
        {
            name: "História de Sucesso",
            route: "Home.index",
            to: "#lojistas",
            external: false,
        },
        {
            name: "Grupo Unicasa",
            route: "Home.index",
            to: "#unicasa",
            external: false,
        },
    ];

    const menuIconColor = isMenuOpen || hasDarkHeader ? "bg-white" : "bg-black";

    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

    return (
        <>
            <Head>
                <title>{title}</title>
                
                <link rel="canonical" href={window.location.origin + window.location.pathname} />

                <meta name="description" content={description} />

                <meta property="og:url" content={currentPath} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta
                    property="og:image"
                    content="/content/pages/newmoveis.jpg"
                />

                <meta name="robots" content="index, follow" />
                <meta name="author" content="Octal Web" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || ""} />
                <meta
                    name="twitter:image"
                    content="/content/pages/newmoveis.jpg"
                />

                <link rel="icon" href={icon} type="image/x-icon" />

                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(localBusinessSchema)}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Head>

            <header
                className={`header fixed top-0 left-0 right-0 z-[20] translate-y-0 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-in-out ${
                    hasDarkHeader
                        ? "bg-black/30 shadow-none backdrop-blur-[2px]"
                        : "bg-white shadow-2xl shadow-black/10"
                }`}
            >
                <button
                    type="button"
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ease-out xl:hidden ${
                        isMenuOpen
                            ? "pointer-events-auto opacity-50"
                            : "pointer-events-none opacity-0"
                    }`}
                    aria-label="Fechar menu"
                    aria-hidden={!isMenuOpen}
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={() => {
                        setIsMenuOpen(false);
                    }}
                />

                <div className="container max-w-large">
                    <div className="flex items-center justify-between">
                        <div className="relative z-[1] my-6 flex w-full items-center justify-between 2xl:my-8">
                            <h1 className="flex items-center">
                                <Link
                                    href={route("Home.index")}
                                    className="flex items-center"
                                    aria-label="Ir para a página inicial"
                                >
                                    <img
                                        src={
                                            hasDarkHeader
                                                ? logoNewWhite
                                                : logoNew
                                        }
                                        alt="New Móveis Planejados"
                                        className="block max-w-24 transition-[filter] duration-300 md:max-w-30"
                                    />
                                </Link>
                            </h1>

                            <div
                                className={`fixed left-0 flex h-[calc(100vh_/6_*_5)] w-full flex-col items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-500 ease-out xl:relative xl:left-auto xl:top-auto xl:my-0.5 xl:h-auto xl:w-auto xl:flex-row xl:justify-end xl:bg-transparent xl:backdrop-blur-none 2xl:my-1.5 ${
                                    !isMenuOpen
                                        ? "-top-1 max-xl:-translate-y-full"
                                        : "top-0"
                                }`}
                            >
                                <nav
                                    className="relative"
                                    aria-label="Navegação principal"
                                >
                                    <ul className="relative flex flex-col items-center gap-6 xl:flex-row xl:justify-center xl:gap-2 2xl:gap-6">
                                        {menuItems.map((item, index) => (
                                            <MenuItem
                                                key={item.name}
                                                item={item}
                                                index={index}
                                                isMenuOpen={isMenuOpen}
                                                isAtTop={hasDarkHeader}
                                            />
                                        ))}

                                        <li
                                            className="max-xl:translate-y-[-20px] max-xl:opacity-0"
                                            style={
                                                typeof window !== "undefined" &&
                                                window.innerWidth < 1280
                                                    ? {
                                                          opacity: isMenuOpen
                                                              ? 1
                                                              : 0,
                                                          transform: isMenuOpen
                                                              ? "translateY(0)"
                                                              : "translateY(-20px)",
                                                          transition: `opacity 0.4s ease-out ${
                                                              menuItems.length *
                                                              0.1
                                                          }s, transform 0.4s ease-out ${
                                                              menuItems.length *
                                                              0.1
                                                          }s`,
                                                      }
                                                    : undefined
                                            }
                                        >
                                            <LinkButton
                                                href={`${route("Home.index")}#orcamento`}
                                                variant={
                                                    hasDarkHeader
                                                        ? "white"
                                                        : "primary"
                                                }
                                                className="flex gap-2 truncate xl:-my-2 xl:ml-2 xl:px-3 xl:text-base 2xl:px-6 2xl:text-lg"
                                            >
                                                <span>Quero ser lojista</span>
                                            </LinkButton>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <button
                                type="button"
                                className="relative z-[2] xl:hidden"
                                onClick={toggleMenu}
                                aria-label={
                                    isMenuOpen ? "Fechar menu" : "Abrir menu"
                                }
                                aria-expanded={isMenuOpen}
                            >
                                <span className="flex items-center">
                                    <span className="relative block h-[21px] w-7">
                                        <span
                                            className={`absolute top-0 block h-[2px] w-7 transition-all duration-300 ${menuIconColor} ${
                                                isMenuOpen
                                                    ? "!top-[10px] rotate-45"
                                                    : ""
                                            }`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "top, transform",
                                            }}
                                        />

                                        <span
                                            className={`absolute top-[9px] block h-[2px] w-7 transition-all duration-300 ${menuIconColor} ${
                                                isMenuOpen
                                                    ? "!top-[10px] scale-x-0"
                                                    : ""
                                            }`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "top, transform",
                                            }}
                                        />

                                        <span
                                            className={`absolute bottom-0 block h-[2px] w-7 transition-all duration-300 ${menuIconColor} ${
                                                isMenuOpen
                                                    ? "bottom-[9px] -rotate-45"
                                                    : ""
                                            }`}
                                            style={{
                                                transitionDelay: isMenuOpen
                                                    ? "0ms, 400ms"
                                                    : "0ms",
                                                transitionProperty:
                                                    "bottom, transform",
                                            }}
                                        />
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main
                className={`overflow-hidden ${["Home"].includes(controller) ? "" : "mt-[78px] lg:mt-[84px] xl:mt-[102px] 2xl:mt-[118px]"}`}
            >
                <h1 className="sr-only">{description}</h1>

                {children}
            </main>

            <Footer />

            {!notifyCookie || !rejectCookie ? (
                <CookieModal
                    acceptCookies={acceptCookies}
                    visible={!notifyCookie}
                />
            ) : null}
        </>
    );
};

export default DefaultLayout;
