/* eslint-disable @typescript-eslint/no-explicit-any */
type SportsDataType = {
  name: string;
  image: string;
  slug: string;
};

const SportsData: SportsDataType[] = [
  {
    name: "English Premier League",
    slug: "eng.1", // ✅ confirmed
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&transparent=true&w=24&h=24",
  },
  {
    name: "German Bundesliga",
    slug: "ger.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&transparent=true&w=24&h=24",
  },
  {
    name: "English FA Cup",
    slug: "eng.fa", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/40.png&transparent=true&w=24&h=24",
  },
  {
    name: "Spanish LALIGA",
    slug: "esp.1", // inferred (sometimes shown as es.1/laliga)
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png&transparent=true&w=24&h=24",
  },
  {
    name: "Italian Serie A",
    slug: "ita.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&transparent=true&w=24&h=24",
  },
  {
    name: "French Ligue 1",
    slug: "fra.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/9.png&transparent=true&w=24&h=24",
  },
  {
    name: "UEFA Champions League",
    slug: "uefa.champions", // ✅ confirmed
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2.png&transparent=true&w=24&h=24",
  },
  {
    name: "UEFA Europa League",
    slug: "uefa.europa", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2310.png&transparent=true&w=30&h=30",
  },
  {
    name: "English League One",
    slug: "eng.3", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/25.png&transparent=true&w=30&h=30",
  },
  {
    name: "Scottish Premier League",
    slug: "sco.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/45.png&transparent=true&w=30&h=30",
  },
  {
    name: "Turkish Super Lig",
    slug: "tur.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/18.png&transparent=true&w=30&h=30",
  },
  {
    name: "MLS",
    slug: "usa.1", // ✅ confirmed
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/19.png&transparent=true&w=30&h=30",
  },
  {
    name: "FIFA World Cup",
    slug: "fifa.world", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/4.png&transparent=true&w=30&h=30",
  },
  {
    name: "English League Championship",
    slug: "eng.2", // inferred (sometimes eng.champ)
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/24.png&transparent=true&w=30&h=30",
  },
  {
    name: "UEFA Europa League Qualifying",
    slug: "uefa.europa_qual",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/24.png&transparent=true&w=30&h=30",
  },
  {
    name: "UEFA Conference League Qualifying",
    slug: "uefa.europa.conf_qual",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/24.png&transparent=true&w=30&h=30",
  },
];

type Event = {
  id: string;
  name: string;
  date: string;
  status: { type: { state: string } };
  competitions: any[];
  [key: string]: any;
};

export type LeagueSchedule = {
  league: string;
  events: Event[];
  url: string;
};

// Simple in-memory cache
const cache: Record<string, { timestamp: number; data: Event[] }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchLeague(
  slug: string,
  startDate?: string, // format: YYYYMMDD
  endDate?: string // format: YYYYMMDD
): Promise<Event[]> {
  const now = Date.now();
  const cacheKey = `${slug}-${startDate || ""}-${endDate || ""}`;

  // Return cached data if available and not expired
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  try {
    // Build URL with optional date range
    let url = `http://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/scoreboard`;
    if (startDate && endDate) {
      url += `?dates=${startDate}-${endDate}`;
    } else if (startDate) {
      url += `?dates=${startDate}`; // single day
    }

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${slug}: ${res.status}`);
      return [];
    }

    const data = await res.json();
    const events = data.events || [];

    // Save in cache
    cache[cacheKey] = { timestamp: now, data: events };
    return events;
  } catch (err) {
    console.error(`Error fetching ${slug}:`, err);
    return [];
  }
}

/**
 * Exported function to get all leagues schedules.
 */
export async function getAllLeagueSchedules(
  startDate?: string,
  endDate?: string
): Promise<LeagueSchedule[]> {
  const results = await Promise.all(
    SportsData.map(async (league) => {
      const events = await fetchLeague(league.slug, startDate, endDate);
      const url = `http://site.api.espn.com/apis/site/v2/sports/soccer/${
        league.slug
      }/scoreboard${
        startDate ? `?dates=${startDate}${endDate ? `-${endDate}` : ""}` : ""
      }`;

      return { league: league.name, events, url, image: league.image };
    })
  );

  return results.filter((league) => league.events.length > 0);
}
