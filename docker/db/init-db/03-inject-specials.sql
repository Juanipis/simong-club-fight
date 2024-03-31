DO $$
BEGIN
  IF (SELECT count(*) from special) = 0 THEN
    INSERT INTO special (name, description) VALUES
    ('Iron Fist', 'Delivers a powerful punch that can break through defenses.'),
    ('Blade Kick', 'A swift kick that mimics the cut of a sharp blade.'),
    ('Shadow Step', 'Allows the fighter to move behind the opponent unseen.'),
    ('Earthquake Slam', 'Slams the ground, knocking nearby opponents off their feet.'),
    ('Fire Spin', 'Engulfs the fighter in flames, damaging all who come close.'),
    ('Thunder Clap', 'A clap that generates a shockwave, stunning nearby enemies.'),
    ('Wind Slicer', 'Creates a gust of wind so sharp it can cut through armor.'),
    ('Water Whip', 'Generates a whip made of water, capable of long-range attacks.'),
    ('Stone Skin', 'Temporarily hardens the skin to reduce incoming damage.'),
    ('Healing Chant', 'Recovers health over time through ancient chants.'),
    ('Energy Burst', 'Releases stored energy in a burst, pushing back opponents.'),
    ('Poison Touch', 'Infects the opponent with a toxin, dealing damage over time.'),
    ('Mind Control', 'Briefly confuses the opponent, making them vulnerable.'),
    ('Gravity Crush', 'Increases gravity for the opponent, slowing their movements.'),
    ('Lightning Dash', 'Increases the fighter''s speed to an unmatched level.'),
    ('Invisible Strike', 'Attacks while invisible, catching the opponent off guard.'),
    ('Frost Cage', 'Traps the opponent in ice, temporarily immobilizing them.'),
    ('Mystic Shield', 'Creates a magical shield that absorbs incoming attacks.'),
    ('Sonic Scream', 'Unleashes a powerful scream that can disorient opponents.'),
    ('Phoenix Rebirth', 'Upon defeat, the fighter can revive with partial health once per fight.');
  END IF;
END $$;

