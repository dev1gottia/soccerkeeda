import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LeftSidebar from "./partials/LeftSidebar";

const SportsData = [
  {
    name: "English Premier League",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&transparent=true&w=24&h=24",
  },
  {
    name: "German Bundesliga",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/10.png&transparent=true&w=24&h=24",
  },
  {
    name: "English FA Cup",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/40.png&transparent=true&w=24&h=24",
  },
  {
    name: "Spanish LALIGA",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/15.png&transparent=true&w=24&h=24",
  },
  {
    name: "Italian Serie A",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/12.png&transparent=true&w=24&h=24",
  },
  {
    name: "French Ligue 1",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/9.png&transparent=true&w=24&h=24",
  },
  {
    name: "UEFA Champions League",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2.png&transparent=true&w=24&h=24",
  },
  {
    name: "UEFA Europa League",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/2310.png&transparent=true&w=30&h=30",
  },
  {
    name: "English League One",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/25.png&transparent=true&w=30&h=30",
  },
  {
    name: "Scottish Premier League",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/45.png&transparent=true&w=30&h=30",
  },
  {
    name: "Turkish Super Lig",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/18.png&transparent=true&w=30&h=30",
  },
  {
    name: "MLS",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/19.png&transparent=true&w=30&h=30",
  },
  {
    name: "FIFA World Cup",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/4.png&transparent=true&w=30&h=30",
  },
  {
    name: "English League Championship",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/24.png&transparent=true&w=30&h=30",
  },
];

export default function page() {
  return (
    <main>
      <div className="container  mx-auto mt-5">
        <h1 className="text-2xl font-bold">
          Live Football Scores, Fixtures & Results | SOCCERKEEDA
        </h1>

        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-2 ">
            <LeftSidebar data={SportsData} />
          </div>
          <div className="col-span-7 "></div>
          <div className="col-span-3 "></div>
        </div>
      </div>
    </main>
  );
}
