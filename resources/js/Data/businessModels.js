import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export const businessModels = [
    {
        title: "Modelo New",
        text: [
            "Loja própria autorizada",
            "Sem taxa de franquia",
            "Sem royalties",
            "Suporte de marca nacional",
            "Mais autonomia para o lojista",
        ],
        icon: faCircleCheck,
        style: 'bg-primary text-white'
    },
    {
        title: "Modelo tradicional de franquia",
        text: [
            "Pode envolver taxa de franquia",
            "Pode ter cobrança de royalties",
            "Regras operacionais mais rígidas",
            "Menor autonomia de gestão",
            "Contrato com prazo e multas rígidas",
        ],
        icon: faCircleXmark,
        style: 'border-2 border-primary text-primary'
    },
];