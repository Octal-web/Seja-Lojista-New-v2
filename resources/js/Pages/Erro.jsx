import { Head, Link } from "@inertiajs/react";

import logo from '@/imgs/site/img/logo-new.png'
import favico from '@/imgs/favicon.ico'

const errors = {
    503: () => "Desculpe, estamos em manutenção. Volte em breve.",
    500: () => "Ops, algo deu errado em nossos servidores.",
    404: (url) =>
        `Desculpe, a página que você está procurando "<strong>${url}</strong>" não foi encontrada.`,
    403: (url) =>
        `Você não tem permissão para acessar esta página: <strong>${url}</strong>.`,
};

const Page = ({ status }) => {
    const handleRedirect = () => {
        const isManager = window.location.pathname.startsWith("/manager");

        if (isManager) return "Manager.Home.index";

        return "Home.index";
    };

    return (
        <>
            <Head>
                <title>Seja Lojista | Error</title>
                <link rel="icon" href={favico} type="image/x-icon" />
            </Head>

            <main className="min-h-screen flex items-center justify-center container max-w-large">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-secondary opacity-20 blur-[100px]"></div>
                </div>
                <div className="text-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto block max-w-40 mb-10"
                    />
                    <h1 className="text-9xl md:text-[300px] font-bold">
                        {status}
                    </h1>

                    <p
                        className="text-base md:text-xl mb-20 text-custom-gray"
                        dangerouslySetInnerHTML={{
                            __html: errors[status](window.location.pathname),
                        }}
                    />

                    <Link
                        href={route(handleRedirect())}
                        className="button-style px-10"
                    >
                        Voltar
                    </Link>
                </div>
            </main>
        </>
    );
};

export default Page;