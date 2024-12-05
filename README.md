# Animal PetSim
 An educational game that teaches you and tell if you're a good pet owner



RODAR NO BANCO AO INICIAR:

```SELECT cron.schedule(
  'adjust_scores_every_5_minutes',  -- Nome da tarefa
  '*/5 * * * *',                   -- Agendamento no formato cron (a cada 5 minutos)
  $$UPDATE animals
  SET 
  "happinessScore" = GREATEST("happinessScore" - 5, 0),
  "hungerScore" = GREATEST("hungerScore" - 5, 0),
  "hygieneScore" = GREATEST("hygieneScore" - 5, 0)$$
);
```

CREATE OR REPLACE FUNCTION update_user_score()
RETURNS TRIGGER AS $$
BEGIN
    -- Calcular a média dos três scores diretamente da tabela animals
    UPDATE "users"
    SET "score" = (
        SELECT (a."happinessScore" + a."hungerScore" + a."hygieneScore") / 3
        FROM "animals" a
        WHERE a."id" = NEW."id"
    )
    WHERE "users"."id" = NEW."userId";  
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_score_trigger
AFTER UPDATE ON animals
FOR EACH ROW
EXECUTE FUNCTION update_user_score();



