DO $$
DECLARE
    luchador_id UUID;
BEGIN
    IF (SELECT count(*) FROM fighterxspecial) = 0 THEN
        FOR luchador_id IN SELECT id FROM fighter LOOP
            INSERT INTO fighterxspecial (fighter_id, special_id)
            SELECT luchador_id, id FROM special
            ORDER BY RANDOM()
            LIMIT 1;
        END LOOP;
    END IF;
END $$;
