import { useForm } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

import { InputMask } from "@react-input/mask";

import { Text } from "../ui/Text";
import { Title } from "../ui/Title";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FormSelect } from "../ui/FormSelect";
import { useFormTracking } from "@/Hooks/useFormTracking";

gsap.registerPlugin(ScrollTrigger);

const investmentOptions = [
    { value: "2", label: "Entre R$ 500.000,00 a R$ 600.000,00" },
    { value: "3", label: "Entre R$ 600.000,00 a R$ 700.000,00" },
    { value: "4", label: "Entre R$ 700.000,00 a R$ 800.000,00" },
    { value: "5", label: "Entre R$ 800.000,00 a R$ 900.000,00" },
    { value: "6", label: "Entre R$ 900.000,00 a R$ 1.000.000,00" },
    { value: "7", label: "Acima de R$ 1.000.000,00" },
];

const partnerOptions = [
    { value: true, label: "Sim, terei um sócio investidor" },
    { value: false, label: "Não, irei investir sozinho" },
];

export const StoreForm = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const formWrapperRef = useRef(null);
    const termsRef = useRef(null);

    const [phoneMask, setPhoneMask] = useState("(__) ____-____");
    const [phoneConfirmMask, setPhoneConfirmMask] = useState(
        "(__) ____-____",
    );
    const [termsVisible, setTermsVisible] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        clearErrors,
        reset,
        recentlySuccessful,
    } = useForm({
        nome: "",
        telefone: "",
        telefone_confirmacao: "",
        email: "",
        cep: "",
        politica: false,
        expectativa_investimento: "",
        possui_socio: "",
        cargo: "",

        origem: "",
        campanha: "",
        grupo: "",
        anuncio: "",
        entrada: "",
        posicao_formulario: "Rodapé",
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const now = new Date();

        now.setHours(now.getHours() - 3);

        const entrada = now.toISOString().slice(0, 19).replace("T", " ");

        setData((currentData) => ({
            ...currentData,

            origem: params.get("origin") || params.get("utm_source") || "",

            campanha:
                params.get("campaign") || params.get("utm_campaign") || "",

            grupo:
                params.get("group") ||
                params.get("utm_group") ||
                params.get("utm_medium") ||
                "",

            anuncio: params.get("ad") || params.get("utm_content") || "",

            entrada,
        }));
    }, []);

    useFormTracking("rodape", data, [
        "nome",
        "telefone",
        "email",
        "cep",
        "cargo",
        "expectativa_investimento",
        "possui_socio",
        "politica",
    ]);

    useEffect(() => {
        const numbers = data.telefone.replace(/\D/g, "");

        setPhoneMask(
            numbers.length >= 10 ? "(__) _____-____" : "(__) ____-____",
        );
    }, [data.telefone]);

    useEffect(() => {
        const numbers = data.telefone_confirmacao.replace(/\D/g, "");

        setPhoneConfirmMask(
            numbers.length >= 10 ? "(__) _____-____" : "(__) ____-____",
        );
    }, [data.telefone_confirmacao]);

    useEffect(() => {
        const context = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            if (prefersReducedMotion) {
                gsap.set([contentRef.current, formWrapperRef.current], {
                    x: 0,
                    opacity: 1,
                });

                return;
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
            });

            timeline.fromTo(
                contentRef.current,
                {
                    x: -35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                },
            );

            timeline.fromTo(
                formWrapperRef.current,
                {
                    x: 35,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.55",
            );
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => context.revert();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setData(name, type === "checkbox" ? checked : value);

        clearErrors(name);
    };

    const handleSelectChange = (name, option) => {
        setData(name, option?.value ?? "");
        clearErrors(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route("Lojistas.enviar"), {
            preserveScroll: (page) =>
                Object.keys(page.props.errors ?? {}).length > 0,

            onSuccess: () => {
                reset(
                    "nome",
                    "telefone",
                    "telefone_confirmacao",
                    "email",
                    "cep",
                    "politica",
                    "expectativa_investimento",
                    "possui_socio",
                    "cargo",
                );

                setTermsVisible(false);
            },
        });
    };

    const inputClassName = `input-style`;

    const ErrorMessage = ({ field }) => {
        if (!errors[field]) return null;

        return (
            <Text
                as="p"
                variant="none"
                weight="normal"
                role="alert"
                className="mt-1.5 bg-red-900 px-3 py-1.5 text-xs leading-snug !text-white"
            >
                {errors[field]}
            </Text>
        );
    };

    return (
        <section
            ref={sectionRef}
            id="orcamento-rodape"
            aria-labelledby="lojista-rodape-lojista-form-title"
            className="py-16 xl:py-20 2xl:pt-24 2xl:pb-40 max-w-[1600px] mx-auto"
        >
            <div className="container max-w-large">
                <div className="flex flex-col justify-center gap-10 xl:gap-14">
                    <div ref={contentRef} className="text-center">
                        <Title
                            id="lojista-rodape-lojista-form-title"
                            as="h2"
                            variant="display"
                            weight="bold"
                            className=" text-primary" 
                        >
                            Está avaliando abrir uma loja?
                        </Title>

                        <Text
                            id="lojista-rodape-lojista-form-description"
                            as="p"
                            variant="subtitle"
                            weight="normal"
                            className="!text-black mt-2"
                        >
                            comece pelo cadastro
                        </Text>
                    </div>

                    <div ref={formWrapperRef}>
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            id="form_New_Sejalojista26'_rodape"
                            aria-labelledby="lojista-rodape-lojista-form-title"
                            aria-describedby="lojista-rodape-lojista-form-description"
                            aria-busy={processing}
                        >
                            <div className="flex flex-col gap-5">
                                <div className="grid md:grid-cols-8 gap-5 md:gap-6">
                                    <div className="w-full md:col-span-4">
                                        <label htmlFor="lojista-rodape-nome">Nome*</label>

                                        <input
                                            id="lojista-rodape-nome"
                                            type="text"
                                            name="nome"
                                            value={data.nome}
                                            onChange={handleChange}
                                            placeholder="Seu nome completo"
                                            autoComplete="name"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.nome)}
                                            aria-describedby={
                                                errors.nome
                                                    ? "lojista-rodape-nome-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-rodape-nome-error">
                                            <ErrorMessage field="nome" />
                                        </div>
                                    </div>

                                    <div className="w-full md:col-span-2">
                                        <label htmlFor="lojista-rodape-telefone">
                                            Telefone*
                                        </label>

                                        <InputMask
                                            id="lojista-rodape-telefone"
                                            type="tel"
                                            name="telefone"
                                            mask={phoneMask}
                                            replacement={{
                                                _: /\d/,
                                            }}
                                            value={data.telefone}
                                            onChange={handleChange}
                                            placeholder="Seu telefone + DDD"
                                            autoComplete="tel"
                                            aria-required="true"
                                            aria-invalid={Boolean(
                                                errors.telefone,
                                            )}
                                            aria-describedby={
                                                errors.telefone
                                                    ? "lojista-rodape-telefone-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-rodape-telefone-error">
                                            <ErrorMessage field="telefone" />
                                        </div>
                                    </div>
                                    

                                    <div className="w-full md:col-span-2">
                                        <label htmlFor="lojista-rodape-telefone_confirmacao">
                                            Confirme seu telefone*
                                        </label>

                                        <InputMask
                                            id="lojista-rodape-telefone_confirmacao"
                                            type="tel"
                                            name="telefone_confirmacao"
                                            mask={phoneConfirmMask}
                                            replacement={{
                                                _: /\d/,
                                            }}
                                            value={data.telefone_confirmacao}
                                            onChange={handleChange}
                                            placeholder="Confirme seu telefone"
                                            autoComplete="tel"
                                            aria-required="true"
                                            aria-invalid={Boolean(
                                                errors.telefone_confirmacao,
                                            )}
                                            aria-describedby={
                                                errors.telefone_confirmacao
                                                    ? "lojista-rodape-telefone-confirmacao-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-rodape-telefone-confirmacao-error">
                                            <ErrorMessage field="telefone_confirmacao" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-6 gap-5 md:gap-6">
                                    <div className="w-full md:col-span-3">
                                        <label htmlFor="lojista-rodape-cargo">
                                            Profissão*
                                        </label>

                                        <input
                                            id="lojista-rodape-cargo"
                                            type="text"
                                            name="cargo"
                                            value={data.cargo}
                                            onChange={handleChange}
                                            placeholder="Sua profissão"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.cargo)}
                                            aria-describedby={
                                                errors.cargo
                                                    ? "lojista-rodape-cargo-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-rodape-cargo-error">
                                            <ErrorMessage field="cargo" />
                                        </div>
                                    </div>

                                    <div className="w-full md:col-span-2">
                                        <label htmlFor="lojista-rodape-email">E-mail*</label>

                                        <input
                                            id="lojista-rodape-email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            placeholder="Seu e-mail"
                                            autoComplete="email"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={
                                                errors.email
                                                    ? "lojista-rodape-email-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-rodape-email-error">
                                            <ErrorMessage field="email" />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="lojista-rodape-cep">CEP*</label>

                                        <InputMask
                                            id="lojista-rodape-cep"
                                            type="text"
                                            name="cep"
                                            mask="_____-___"
                                            replacement={{
                                                _: /\d/,
                                            }}
                                            value={data.cep}
                                            onChange={handleChange}
                                            placeholder="Seu CEP"
                                            inputMode="numeric"
                                            autoComplete="postal-code"
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.cep)}
                                            aria-describedby={
                                                errors.cep
                                                    ? "lojista-rodape-cep-error"
                                                    : undefined
                                            }
                                            className={inputClassName}
                                        />

                                        <div id="lojista-rodape-cep-error">
                                            <ErrorMessage field="cep" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5 md:flex-row md:gap-6">
                                    <FormSelect
                                        id="lojista-rodape-expectativa_investimento"
                                        name="expectativa_investimento"
                                        label="Qual o seu orçamento disponível para investir?*"
                                        options={investmentOptions}
                                        value={data.expectativa_investimento}
                                        errors={errors}
                                        onChange={handleSelectChange}
                                    />
                                    <FormSelect
                                        id="lojista-rodape-possui_socio"
                                        name="possui_socio"
                                        label="Você terá um sócio investidor?*"
                                        options={partnerOptions}
                                        value={data.possui_socio}
                                        errors={errors}
                                        onChange={handleSelectChange}
                                    />
                                </div>
                            </div>

                            <input
                                type="hidden"
                                name="origem"
                                value={data.origem}
                            />

                            <input
                                type="hidden"
                                name="campanha"
                                value={data.campanha}
                            />

                            <input
                                type="hidden"
                                name="grupo"
                                value={data.grupo}
                            />

                            <input
                                type="hidden"
                                name="anuncio"
                                value={data.anuncio}
                            />

                            <input
                                type="hidden"
                                name="entrada"
                                value={data.entrada}
                            />

                            <input
                                type="hidden"
                                name="posicao_formulario"
                                value={data.posicao_formulario}
                            />

                            <div className="mt-6 xl:mt-14">
                                <div
                                    id="lojista-rodape-lojista-terms"
                                    ref={termsRef}
                                    aria-hidden={!termsVisible}
                                    className={[
                                        "overflow-hidden bg-neutral-100 text-[10px] leading-tight text-custom-gray transition-all duration-300",
                                        termsVisible ? "mb-3" : "mb-0",
                                    ].join(" ")}
                                    style={{
                                        maxHeight: termsVisible
                                            ? `${termsRef.current?.scrollHeight ?? 0}px`
                                            : "0px",
                                    }}
                                >
                                    <div className="px-5 py-3">
                                        <p>
                                            Ao enviar, você confirma a
                                            veracidade das informações prestadas
                                            neste formulário, bem como autoriza
                                            a UNICASA a verificar tais dados.
                                            Esteja ciente que o preenchimento de
                                            formulário não implica em nenhum
                                            compromisso para ambas as partes, em
                                            especial, não os obriga à assinatura
                                            de qualquer documento ou
                                            compromisso, sendo as informações
                                            aqui fornecidas meramente cadastrais
                                            e estritamente comerciais. Além
                                            disso, você concorda com a
                                            utilização dos seus dados pela
                                            fabricante e lojas autorizadas. A
                                            Unicasa se compromete a tratar seus
                                            dados pessoais dispostos no
                                            formulário em conformidade com a Lei
                                            Geral de Proteção de Dados, Lei nº
                                            13.709/2018, sendo eliminados de
                                            maneira segura após o tempo
                                            necessário. Para mais informações,
                                            consulte nossa Política de
                                            Privacidade, disponível no site.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center md:justify-center gap-3">
                                    <input
                                        id="lojista-rodape-politica"
                                        type="checkbox"
                                        name="politica"
                                        checked={data.politica}
                                        onChange={handleChange}
                                        aria-required="true"
                                        aria-labelledby="lojista-rodape-politica-label lojista-rodape-politica-termos-button lojista-rodape-politica-conjuncao lojista-rodape-politica-privacidade-link"
                                        aria-invalid={Boolean(errors.politica)}
                                        aria-describedby={
                                            errors.politica
                                                ? "lojista-rodape-politica-error"
                                                : undefined
                                        }
                                        className="
                                            relative mt-0.5 size-5 shrink-0
                                            cursor-pointer appearance-none
                                            border border-[#D3D3D3] bg-white
                                            after:absolute after:left-1/2
                                            after:top-1/2 after:size-1/2
                                            after:-translate-x-1/2
                                            after:-translate-y-1/2
                                            after:bg-transparent
                                            checked:bg-secondary
                                            checked:hover:bg-secondary
                                            checked:focus:bg-secondary
                                            checked:after:bg-primary
                                            focus:ring-0
                                            focus:ring-offset-0
                                        "
                                    />

                                    <div className="text-xs leading-snug sm:text-sm flex items-center gap-1.5 ">
                                        <label
                                            id="lojista-rodape-politica-label"
                                            htmlFor="lojista-rodape-politica"
                                            className="cursor-pointer !mb-0 font-normal"
                                        >
                                            Aceito os{" "}
                                        </label>

                                        <button
                                            id="lojista-rodape-politica-termos-button"
                                            type="button"
                                            aria-expanded={termsVisible}
                                            aria-controls="lojista-rodape-lojista-terms"
                                            onClick={() => {
                                                setTermsVisible(
                                                    (current) => !current,
                                                );
                                            }}
                                            className="font-normal underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Termos de Uso
                                        </button>

                                        <span id="lojista-rodape-politica-conjuncao">
                                            {" "}
                                            e a{" "}
                                        </span>

                                        <a
                                            id="lojista-rodape-politica-privacidade-link"
                                            href={route(
                                                "Politicas.privacidade",
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-normal underline underline-offset-2 transition-opacity hover:opacity-70"
                                        >
                                            Política de Privacidade
                                        </a>
                                    </div>
                                </div>

                                <div id="lojista-rodape-politica-error">
                                    <ErrorMessage field="politica" />
                                </div>
                            </div>

                            {recentlySuccessful && (
                                <Text
                                    as="p"
                                    variant="none"
                                    weight="medium"
                                    role="status"
                                    aria-live="polite"
                                    className="mt-5 text-xs md:text-sm leading-relaxed text-green-700"
                                >
                                    Seus dados foram enviados com sucesso. Nossa
                                    equipe entrará em contato.
                                </Text>
                            )}

                            <button
                                type="submit"
                                disabled={processing}
                                className="button-style max-sm:w-full px-3 md:px-16 mt-6 md:mt-14"
                            >
                                {processing ? (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className="absolute size-5 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
                                        />

                                        <span className="opacity-0">
                                            Quero falar com a equipe de expansão
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        Quero falar com a equipe de expansão
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
