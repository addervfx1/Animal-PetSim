# Animal PetSim
 An educational game that teaches you and tell if you're a good pet owner



RODAR NO BANCO AO INICIAR:

SELECT cron.schedule(
  'adjust_scores_every_5_minutes',  -- Nome da tarefa
  '*/5 * * * *',                   -- Agendamento no formato cron (a cada 5 minutos)
  $$UPDATE animals
  SET 
  "happinessScore" = GREATEST("happinessScore" - 5, 0),
  "hungerScore" = GREATEST("hungerScore" - 5, 0),
  "hygieneScore" = GREATEST("hygieneScore" - 5, 0)$$
);
