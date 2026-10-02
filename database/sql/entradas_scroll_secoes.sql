-- Rode isto SOMENTE se a tabela `entradas` já foi criada antes de este arquivo
-- existir (adiciona o tracking de scroll depth e visibilidade por seção/dobra).
-- Se ainda não criou a tabela, ignore este arquivo: basta usar `entradas.sql`,
-- que já inclui estas colunas.

ALTER TABLE `entradas`
    ADD COLUMN `scroll_maximo_percentual` TINYINT UNSIGNED NOT NULL DEFAULT 0 AFTER `tempo_total_segundos`,
    ADD COLUMN `secoes_visualizadas` JSON NULL AFTER `scroll_maximo_percentual`;
