DO $$
BEGIN
  IF (SELECT count(*) from fighter) = 0 THEN
    INSERT INTO fighter (name, date_of_birth, country_id, weight, height, biography, history, health, power, speed, luck) VALUES
    ('Raven Hawk', '1985-04-12', 1, 90.50, 1.85, 'A fighter known for his unmatched speed and agility.', 'Champion of numerous international tournaments.', 100, 80, 95, 0.75),
    ('Stone Breaker', '1990-07-21', 2, 120.30, 1.90, 'Famed for his incredible strength and resilience.', 'Survived the toughest fights in underground arenas.', 120, 95, 70, 0.60),
    ('Eagle Eye', '1988-05-14', 3, 85.25, 1.78, 'Master of precision strikes.', 'Never missed a target in all his bouts.', 90, 85, 90, 0.80),
    ('Shadow Phantom', '1992-11-03', 4, 80.00, 1.82, 'Moves silently and strikes without warning.', 'Rose from obscurity to fame overnight.', 85, 75, 100, 0.90),
    ('Titan Fury', '1983-01-16', 5, 115.75, 1.95, 'An unstoppable force in the ring.', 'Defeated multiple champions to claim his title.', 110, 90, 65, 0.65),
    ('Thunder Strike', '1987-09-09', 6, 88.40, 1.80, 'Known for his electrifying punches.', 'A bolt from the blue that topples giants.', 95, 88, 85, 0.70),
    ('Crimson Blade', '1991-03-25', 7, 83.00, 1.76, 'Swift as the wind, sharp as a razor.', 'His techniques are as beautiful as they are deadly.', 90, 80, 95, 0.85),
    ('Steel Vortex', '1986-08-12', 8, 92.50, 1.88, 'A whirlwind of steel and fury.', 'Ascended the ranks with his unique fighting style.', 100, 85, 80, 0.72),
    ('Venom Fang', '1993-02-17', 9, 77.50, 1.70, 'Strikes fear with his poisonous tactics.', 'Left a trail of defeated foes, wary of his bite.', 85, 70, 90, 0.82),
    ('Nighthawk', '1984-12-05', 10, 89.00, 1.83, 'Dominates the fight under the cover of darkness.', 'A mysterious figure with a flawless record.', 95, 82, 88, 0.78),
    ('Ironside', '1982-10-30', 11, 110.20, 1.92, 'An iron will encased in a body of steel.', 'Overcame all odds to stand at the pinnacle of power.', 105, 88, 75, 0.66),
    ('Blizzard Wolf', '1994-06-18', 12, 84.60, 1.79, 'Unleashes the ferocity of winter storms.', 'His presence chills the air and his opponents.', 88, 77, 83, 0.81),
    ('Solar Flare', '1989-08-22', 13, 86.70, 1.77, 'Brightens the ring with his radiant tactics.', 'A beacon of hope and a harbinger of doom for foes.', 92, 84, 87, 0.79),
    ('Mystic Sage', '1979-11-11', 14, 78.20, 1.74, 'Wields ancient techniques lost to time.', 'His wisdom and strength are unparalleled.', 90, 76, 92, 0.88),
    ('Thunder Roar', '1981-03-01', 15, 93.30, 1.86, 'His roar precedes a storm of punches.', 'Echoes of his victories resonate far and wide.', 98, 87, 82, 0.73),
    ('Cyclone Spear', '1995-07-28', 16, 81.00, 1.80, 'Pierces defenses with the speed of a cyclone.', 'A prodigy who rose rapidly through the ranks.', 89, 83, 91, 0.84),
    ('Pyroclast', '1987-04-17', 17, 91.20, 1.88, 'Engulfs the battleground in flames.', 'A fiery spirit that burns away all obstacles.', 94, 86, 77, 0.69),
    ('Glacier Guard', '1990-10-10', 18, 110.00, 1.93, 'Immovable as a glacier, protecting all who ally.', 'A wall against which waves of opponents crash and fall.', 108, 91, 68, 0.67),
    ('Lunar Shadow', '1985-01-20', 19, 87.50, 1.81, 'Strikes from the shadows under the moonlight.', 'A silent guardian whose true power is cloaked in mystery.', 93, 78, 89, 0.76),
    ('Wildfire Blaze', '1992-09-15', 20, 85.80, 1.75, 'Spreads chaos in the ring like a wildfire.', 'Unpredictable and untamable, his path to victory burns bright.', 92, 79, 94, 0.83);
  END IF;
END $$;
