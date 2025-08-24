export type SportsDataType = {
  name: string;
  image: string;
  slug: string;
};

const SportsData: SportsDataType[] = [
  {
    name: "English Premier League",
    slug: "eng.1", // ✅ confirmed
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&transparent=true&w=500&h=500",
  },
  {
    name: "German Bundesliga",
    slug: "ger.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&transparent=true&w=500&h=500",
  },
  {
    name: "English FA Cup",
    slug: "eng.fa", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/40.png&transparent=true&w=500&h=500",
  },
  {
    name: "Spanish LALIGA",
    slug: "esp.1", // inferred (sometimes shown as es.1/laliga)
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png&transparent=true&w=500&h=500",
  },
  {
    name: "Italian Serie A",
    slug: "ita.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&transparent=true&w=500&h=500",
  },
  {
    name: "French Ligue 1",
    slug: "fra.1", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/9.png&transparent=true&w=500&h=500",
  },
  {
    name: "UEFA Champions League",
    slug: "uefa.champions", // ✅ confirmed
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2.png&transparent=true&w=500&h=500",
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
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=30&h=30",
  },
  {
    name: "UEFA Conference League Qualifying",
    slug: "uefa.europa.conf_qual",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/default-team-logo-500.png&w=30&h=30",
  },
];

export default SportsData;
