CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS country (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    emoji VARCHAR(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS app_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    country_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    roles text[] DEFAULT ARRAY['user'],
    FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE IF NOT EXISTS special (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT
);


CREATE TABLE IF NOT EXISTS fighter (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    country_id INT NOT NULL,
    weight DECIMAL(5, 2) NOT NULL,
    height DECIMAL(5, 2) NOT NULL,
    
    biography TEXT,
    history TEXT,
    is_active BOOLEAN DEFAULT TRUE,

    health INT NOT NULL CHECK (health > 0),
    power INT NOT NULL CHECK (power > 0),
    speed INT NOT NULL CHECK (speed > 0),
    luck DECIMAL(2, 2) NOT NULL CHECK (luck >= 0 AND luck <= 1),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES country(id)
);


CREATE TABLE IF NOT EXISTS fighterxspecial (
    fighter_id UUID NOT NULL,
    special_id UUID NOT NULL,
    PRIMARY KEY (fighter_id, special_id),
    FOREIGN KEY (fighter_id) REFERENCES fighter(id),
    FOREIGN KEY (special_id) REFERENCES special(id)
);


CREATE TABLE IF NOT EXISTS fight (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fighter1_id UUID NOT NULL,
    fighter2_id UUID NOT NULL,
    winner_id UUID,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fighter1_id) REFERENCES fighter(id),
    FOREIGN KEY (fighter2_id) REFERENCES fighter(id),
    FOREIGN KEY (winner_id) REFERENCES fighter(id),
    FOREIGN KEY (user_id) REFERENCES app_user(id)
);

CREATE OR REPLACE FUNCTION check_winner()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.winner_id <> NEW.fighter1_id AND NEW.winner_id <> NEW.fighter2_id THEN
        RAISE EXCEPTION 'Winner must be either Fighter 1 or Fighter 2';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_winner_before_insert_or_update
BEFORE INSERT OR UPDATE OF winner_id ON fight
FOR EACH ROW EXECUTE PROCEDURE check_winner();