DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM invoice
        WHERE amount IS NOT NULL
          AND amount::numeric <> round(amount::numeric, 2)
    ) THEN
        RAISE EXCEPTION 'Invoice amount precision exceeds two decimal places. Correct the affected rows before migration.';
    END IF;
END $$;

ALTER TABLE invoice
    ALTER COLUMN amount TYPE numeric(19, 2)
    USING amount::numeric(19, 2);
