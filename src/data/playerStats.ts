/**
 * Bollington Town FC — Player Statistics (FA Full-Time data)
 *
 * Source URLs per season:
 *  20/21  https://fulltime.thefa.com/displayTeam.html?divisionseason=320897402&teamID=961018307
 *  21/22  https://fulltime.thefa.com/displayTeam.html?divisionseason=685266626&teamID=224590072
 *  22/23  https://fulltime.thefa.com/displayTeam.html?divisionseason=344783300&teamID=312011849
 *  23/24  https://fulltime.thefa.com/displayTeam.html?divisionseason=875724253&teamID=312011849
 *  24/25  https://fulltime.thefa.com/displayTeam.html?divisionseason=80570566&teamID=312011849
 *  25/26  https://fulltime.thefa.com/displayTeam.html?divisionseason=793240729&teamID=312011849
 *
 * Last updated: February 2026 (25/26 season in progress)
 * Names normalised to "Firstname Surname" format throughout.
 */

export interface PlayerSeasonStat {
  name: string;
  apps: number;
  goals: number;
}

export const seasonPlayerStats: Record<string, PlayerSeasonStat[]> = {
  "2020-21": [
    { name: "Sam Ashton", apps: 6, goals: 0 },
    { name: "Ethan Barker", apps: 10, goals: 4 },
    { name: "Conor Beaden", apps: 14, goals: 14 },
    { name: "Jack Booth", apps: 2, goals: 0 },
    { name: "Joshua Brown", apps: 1, goals: 1 },
    { name: "Allen Bunyan", apps: 11, goals: 0 },
    { name: "Will Chadwick", apps: 5, goals: 0 },
    { name: "Connor Dabbs", apps: 3, goals: 2 },
    { name: "Tyler Donnelly", apps: 11, goals: 0 },
    { name: "Alfie Earith", apps: 12, goals: 0 },
    { name: "Jake Eastham", apps: 14, goals: 0 },
    { name: "Nathan Edwards", apps: 14, goals: 9 },
    { name: "Jordan Foulkes", apps: 5, goals: 0 },
    { name: "Joses Galvez Santos", apps: 6, goals: 0 },
    { name: "Beau Gatward", apps: 11, goals: 7 },
    { name: "Zach Gatward", apps: 11, goals: 6 },
    { name: "Sam Glover", apps: 8, goals: 0 },
    { name: "Declan Hanks", apps: 13, goals: 3 },
    { name: "Will Johnson", apps: 4, goals: 0 },
    { name: "Will Jones", apps: 4, goals: 0 },
    { name: "Matthew Joyce", apps: 15, goals: 0 },
    { name: "Jack Naylor", apps: 13, goals: 14 },
    { name: "Harry O'Neil", apps: 5, goals: 0 },
    { name: "Zak Sandhu", apps: 6, goals: 0 },
    { name: "Ron Thornton", apps: 0, goals: 0 },
    { name: "Joe Wakeford", apps: 5, goals: 0 },
    { name: "Ben Walton", apps: 7, goals: 0 },
    { name: "Sam Watkins", apps: 10, goals: 0 },
    { name: "James Whitehead", apps: 5, goals: 0 },
    { name: "Ashley Wright", apps: 1, goals: 0 },
  ],

  "2021-22": [
    { name: "Sam Ashton", apps: 2, goals: 0 },
    { name: "Callum Atkin", apps: 6, goals: 0 },
    { name: "Ethan Barker", apps: 11, goals: 5 },
    { name: "Conor Beaden", apps: 11, goals: 8 },
    { name: "Allen Bunyan", apps: 1, goals: 1 },
    { name: "Niza Chilufya", apps: 1, goals: 1 },
    { name: "Joshua Connolly", apps: 3, goals: 2 },
    { name: "Jonty Coombes", apps: 3, goals: 0 },
    { name: "Connor Dabbs", apps: 8, goals: 6 },
    { name: "Tyler Donnelly", apps: 3, goals: 0 },
    { name: "Alfie Earith", apps: 11, goals: 1 },
    { name: "Jake Eastham", apps: 13, goals: 2 },
    { name: "Nathan Edwards", apps: 14, goals: 4 },
    { name: "Aki Ekhaletruo", apps: 1, goals: 1 },
    { name: "Jordan Foulkes", apps: 3, goals: 0 },
    { name: "Joses Galvez Santos", apps: 5, goals: 0 },
    { name: "Beau Gatward", apps: 10, goals: 9 },
    { name: "Zach Gatward", apps: 9, goals: 1 },
    { name: "Sam Glover", apps: 11, goals: 2 },
    { name: "Declan Hanks", apps: 13, goals: 0 },
    { name: "Jack Heppell", apps: 8, goals: 5 },
    { name: "Charlie Hodson", apps: 2, goals: 0 },
    { name: "Alexander Howarth", apps: 13, goals: 2 },
    { name: "Nathan Jackson", apps: 13, goals: 7 },
    { name: "Will Jones", apps: 1, goals: 0 },
    { name: "Matthew Joyce", apps: 15, goals: 0 },
    { name: "Finn Manning", apps: 10, goals: 0 },
    { name: "Jack Naylor", apps: 3, goals: 2 },
    { name: "Harry O'Neill", apps: 2, goals: 0 },
    { name: "Jack Ronnie", apps: 1, goals: 0 },
    { name: "Zak Sandhu", apps: 3, goals: 1 },
    { name: "Joe Wakeford", apps: 1, goals: 0 },
    { name: "Ben Walton", apps: 6, goals: 0 },
    { name: "Sam Watkins", apps: 8, goals: 0 },
    { name: "James Whitehead", apps: 9, goals: 1 },
  ],

  "2022-23": [
    { name: "Callum Atkin", apps: 7, goals: 0 },
    { name: "Callum Atkinson", apps: 17, goals: 3 },
    { name: "Ethan Barker", apps: 1, goals: 0 },
    { name: "Conor Beaden", apps: 15, goals: 8 },
    { name: "Spencer Bell", apps: 3, goals: 0 },
    { name: "Jack Booth", apps: 3, goals: 0 },
    { name: "Joe Brennan", apps: 5, goals: 0 },
    { name: "Harry Burgess-Hayde", apps: 7, goals: 0 },
    { name: "Will Chadwick", apps: 1, goals: 0 },
    { name: "Niza Chilufya", apps: 7, goals: 2 },
    { name: "Joshua Connolly", apps: 12, goals: 11 },
    { name: "Tom Cooksey", apps: 10, goals: 0 },
    { name: "Jonty Coombes", apps: 0, goals: 0 },
    { name: "Tyler Donnelly", apps: 1, goals: 0 },
    { name: "Alfie Earith", apps: 26, goals: 1 },
    { name: "Jake Eastham", apps: 22, goals: 3 },
    { name: "Joses Galvez Santos", apps: 2, goals: 0 },
    { name: "Beau Gatward", apps: 12, goals: 2 },
    { name: "Zach Gatward", apps: 5, goals: 0 },
    { name: "Sam Glover", apps: 13, goals: 0 },
    { name: "Joseph Gomez", apps: 6, goals: 2 },
    { name: "Declan Hanks", apps: 25, goals: 1 },
    { name: "Jack Heppell", apps: 18, goals: 4 },
    { name: "Joshua Hewitt", apps: 8, goals: 0 },
    { name: "Ryan Hibbert", apps: 21, goals: 6 },
    { name: "Charlie Hodson", apps: 2, goals: 0 },
    { name: "Alexander Howarth", apps: 20, goals: 1 },
    { name: "Nathan Jackson", apps: 23, goals: 11 },
    { name: "Will Jones", apps: 0, goals: 0 },
    { name: "Matthew Joyce", apps: 26, goals: 0 },
    { name: "Finn Manning", apps: 14, goals: 1 },
    { name: "Charley McKeown", apps: 1, goals: 0 },
    { name: "Kyle McLellan", apps: 1, goals: 0 },
    { name: "Remy Miller", apps: 2, goals: 0 },
    { name: "Jack Naylor", apps: 11, goals: 11 },
    { name: "Matthew Nelson", apps: 23, goals: 2 },
    { name: "Josh Pilley", apps: 3, goals: 0 },
    { name: "Samuel Prince", apps: 1, goals: 0 },
    { name: "Jacek Ratajewski", apps: 6, goals: 0 },
    { name: "Zak Sandhu", apps: 6, goals: 0 },
    { name: "Tom Stott", apps: 5, goals: 1 },
    { name: "Mateusz Szymborski", apps: 12, goals: 1 },
    { name: "Conor Varney", apps: 0, goals: 0 },
    { name: "Ben Walton", apps: 13, goals: 1 },
    { name: "Sam Watkins", apps: 7, goals: 0 },
  ],

  "2023-24": [
    { name: "Conor Beaden", apps: 5, goals: 0 },
    { name: "Daniel Bishop", apps: 12, goals: 2 },
    { name: "Joe Brennan", apps: 6, goals: 0 },
    { name: "Harry Burgess-Hayde", apps: 27, goals: 0 },
    { name: "Joshua Connolly", apps: 31, goals: 20 },
    { name: "Thomas Devonport", apps: 6, goals: 1 },
    { name: "Alfie Earith", apps: 27, goals: 1 },
    { name: "Luke Earl", apps: 3, goals: 0 },
    { name: "Jake Eastham", apps: 31, goals: 0 },
    { name: "Thomas Farrington", apps: 7, goals: 3 },
    { name: "Alex Ferguson", apps: 11, goals: 0 },
    { name: "Beau Gatward", apps: 26, goals: 9 },
    { name: "Zach Gatward", apps: 5, goals: 1 },
    { name: "Sam Glover", apps: 16, goals: 1 },
    { name: "Joseph Gomez", apps: 3, goals: 0 },
    { name: "Declan Hanks", apps: 30, goals: 5 },
    { name: "Jack Heppell", apps: 32, goals: 15 },
    { name: "Joshua Hewitt", apps: 8, goals: 1 },
    { name: "Ryan Hibbert", apps: 32, goals: 7 },
    { name: "Alexander Howarth", apps: 17, goals: 1 },
    { name: "Nathan Jackson", apps: 5, goals: 1 },
    { name: "Matthew Joyce", apps: 34, goals: 1 },
    { name: "Finn Manning", apps: 32, goals: 1 },
    { name: "Zak James Mousa", apps: 21, goals: 8 },
    { name: "Jack Naylor", apps: 7, goals: 0 },
    { name: "Tobias Pearson", apps: 6, goals: 0 },
    { name: "Jacek Ratajewski", apps: 6, goals: 0 },
    { name: "Marcus Richards", apps: 9, goals: 0 },
    { name: "George Richardson", apps: 29, goals: 3 },
    { name: "David Short", apps: 2, goals: 0 },
    { name: "Mateusz Szymborski", apps: 3, goals: 0 },
    { name: "Rome Taylor", apps: 0, goals: 0 },
    { name: "Ally Harrison-Virani", apps: 12, goals: 2 },
    { name: "Daniel Williams", apps: 25, goals: 3 },
  ],

  "2024-25": [
    { name: "Ewan Allabush", apps: 1, goals: 0 },
    { name: "Daniel Bishop", apps: 14, goals: 4 },
    { name: "Thomas Boyd", apps: 5, goals: 0 },
    { name: "Edward Browne", apps: 1, goals: 0 },
    { name: "Harry Burgess-Hayde", apps: 10, goals: 0 },
    { name: "Charles Chilufya", apps: 2, goals: 0 },
    { name: "Joshua Connolly", apps: 22, goals: 15 },
    { name: "Joseph Coombs", apps: 7, goals: 3 },
    { name: "Connor Dabbs", apps: 6, goals: 1 },
    { name: "Thomas Devonport", apps: 4, goals: 0 },
    { name: "Alfie Earith", apps: 25, goals: 5 },
    { name: "Luke Earl", apps: 3, goals: 0 },
    { name: "Jake Eastham", apps: 31, goals: 3 },
    { name: "Thomas Farrington", apps: 2, goals: 0 },
    { name: "Alex Ferguson", apps: 7, goals: 0 },
    { name: "Harry Freedman", apps: 1, goals: 0 },
    { name: "Beau Gatward", apps: 20, goals: 1 },
    { name: "Zach Gatward", apps: 28, goals: 3 },
    { name: "Sam Glover", apps: 7, goals: 0 },
    { name: "Declan Hanks", apps: 24, goals: 4 },
    { name: "Ally Harrison-Virani", apps: 30, goals: 21 },
    { name: "Jack Heppell", apps: 15, goals: 5 },
    { name: "Ryan Hibbert", apps: 21, goals: 4 },
    { name: "Alexander Howarth", apps: 14, goals: 2 },
    { name: "Matthew Joyce", apps: 32, goals: 0 },
    { name: "Kevin Lopez-O'Neill", apps: 2, goals: 0 },
    { name: "Finn Manning", apps: 25, goals: 0 },
    { name: "Zak James Mousa", apps: 26, goals: 10 },
    { name: "Matthew Nelson", apps: 25, goals: 12 },
    { name: "Nial O'Neill", apps: 5, goals: 3 },
    { name: "Ted Palmer-Atkins", apps: 16, goals: 1 },
    { name: "Ryan Pardner", apps: 1, goals: 0 },
    { name: "Michael Rattle", apps: 1, goals: 0 },
    { name: "Ziyan Raza", apps: 1, goals: 0 },
    { name: "George Richardson", apps: 30, goals: 2 },
    { name: "Keenan Short", apps: 1, goals: 0 },
    { name: "Tom Stott", apps: 8, goals: 0 },
    { name: "Rome Taylor", apps: 2, goals: 0 },
    { name: "Daniel Williams", apps: 11, goals: 4 },
  ],

  // In progress — last updated 28 April 2026
  "2025-26": [
    { name: "Ewan Allabush", apps: 1, goals: 1 },
    { name: "Callum Atkinson", apps: 5, goals: 2 },
    { name: "Conor Beaden", apps: 6, goals: 0 },
    { name: "Daniel Bishop", apps: 3, goals: 0 },
    { name: "Maxwell Berkeley", apps: 3, goals: 0 },
    { name: "Edward Browne", apps: 2, goals: 0 },
    { name: "Joshua Connolly", apps: 20, goals: 11 },
    { name: "Joseph Coombs", apps: 18, goals: 1 },
    { name: "Thomas Devonport", apps: 1, goals: 0 },
    { name: "Jack Dillon", apps: 1, goals: 0 },
    { name: "Alfie Earith", apps: 26, goals: 11 },
    { name: "Luke Earl", apps: 3, goals: 1 },
    { name: "Jake Eastham", apps: 26, goals: 0 },
    { name: "Callum Evans", apps: 14, goals: 1 },
    { name: "Joe Eyre", apps: 1, goals: 1 },
    { name: "Beau Gatward", apps: 23, goals: 1 },
    { name: "Zach Gatward", apps: 8, goals: 0 },
    { name: "Sam Glover", apps: 13, goals: 1 },
    { name: "Declan Hanks", apps: 17, goals: 0 },
    { name: "Ally Harrison-Virani", apps: 20, goals: 3 },
    { name: "Jack Heppell", apps: 8, goals: 3 },
    { name: "Ryan Hibbert", apps: 11, goals: 0 },
    { name: "Alexander Howarth", apps: 3, goals: 0 },
    { name: "Matthew Joyce", apps: 25, goals: 0 },
    { name: "Finn Manning", apps: 18, goals: 1 },
    { name: "Philip Milsom", apps: 22, goals: 4 },
    { name: "Zak James Mousa", apps: 19, goals: 6 },
    { name: "Matthew Nelson", apps: 1, goals: 0 },
    { name: "Ted Palmer-Atkins", apps: 5, goals: 0 },
    { name: "George Richardson", apps: 22, goals: 4 },
    { name: "Harris Rollaston", apps: 1, goals: 0 },
    { name: "Arjun Takiar", apps: 4, goals: 0 },
    { name: "James Whitehead", apps: 1, goals: 0 },
    { name: "Daniel Williams", apps: 21, goals: 4 },
  ],
};

// ─── Computed all-time totals ─────────────────────────────────────────────────

interface PlayerTotal {
  name: string;
  apps: number;
  goals: number;
}

function computeAllTime() {
  const map = new Map<string, PlayerTotal>();

  for (const players of Object.values(seasonPlayerStats)) {
    for (const p of players) {
      const key = p.name.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.apps += p.apps;
        existing.goals += p.goals;
      } else {
        map.set(key, { name: p.name, apps: p.apps, goals: p.goals });
      }
    }
  }

  const all = Array.from(map.values());
  const byApps = [...all].filter((p) => p.apps > 0).sort((a, b) => b.apps - a.apps);
  const byGoals = [...all].filter((p) => p.goals > 0).sort((a, b) => b.goals - a.goals);

  return { byApps, byGoals };
}

export const allTimeStats = computeAllTime();
