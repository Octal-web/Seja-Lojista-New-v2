-- Tabela de tracking de visitantes (conexão "8poroito", mesma base da tabela `leads`).
-- Rode este SQL diretamente na base 8poroito (não há migration do Laravel para
-- este conjunto de tabelas, seguindo o mesmo padrão de `leads`).

CREATE TABLE `entradas` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    `ip` VARCHAR(45) NOT NULL,
    `session_id` VARCHAR(100) NULL,
    `user_agent` TEXT NULL,
    `dispositivo` VARCHAR(20) NULL,

    `origem` VARCHAR(2048) NULL,
    `campanha` VARCHAR(255) NULL,
    `grupo` VARCHAR(255) NULL,
    `anuncio` VARCHAR(255) NULL,

    `url_entrada` TEXT NULL,
    `url_atual` TEXT NULL,
    `referrer` TEXT NULL,

    `paginas_visitadas` INT UNSIGNED NOT NULL DEFAULT 0,
    `tempo_total_segundos` INT UNSIGNED NOT NULL DEFAULT 0,

    `scroll_maximo_percentual` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `secoes_visualizadas` JSON NULL,

    `formulario_topo_iniciado` TINYINT(1) NOT NULL DEFAULT 0,
    `formulario_topo_enviado` TINYINT(1) NOT NULL DEFAULT 0,
    `formulario_topo_dados` JSON NULL,
    `formulario_topo_atualizado_em` DATETIME NULL,

    `formulario_rodape_iniciado` TINYINT(1) NOT NULL DEFAULT 0,
    `formulario_rodape_enviado` TINYINT(1) NOT NULL DEFAULT 0,
    `formulario_rodape_dados` JSON NULL,
    `formulario_rodape_atualizado_em` DATETIME NULL,

    `lead_token` VARCHAR(64) NULL,

    `criado` DATETIME NOT NULL,
    `modificado` DATETIME NULL,

    PRIMARY KEY (`id`),
    KEY `entradas_ip_modificado_index` (`ip`, `modificado`),
    KEY `entradas_lead_token_index` (`lead_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
