/* eslint-disable @next/next/no-img-element */
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LeftSidebar from "../partials/LeftSidebar";
import RightSidebar from "../partials/RightSidebar";
import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";
import MainContent from "../partials/MainContent";
import { DateTime } from "luxon";

export type SportsDataType = {
  name: string;
  image: string;
  slug: string;
};

export type BlogDataType = {
  image: string;
  title: string;
  description: string;
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
    slug: "eng.leagueone", // inferred
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
    slug: "fifa.worldcup", // inferred
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/4.png&transparent=true&w=30&h=30",
  },
  {
    name: "English League Championship",
    slug: "eng.2", // inferred (sometimes eng.champ)
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/24.png&transparent=true&w=30&h=30",
  },
];

const BlogData: BlogDataType[] = [
  {
    image:
      "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0105%2Fr1434683_1296x729_16%2D9.jpg&w=272&h=153&scale=crop&cquality=80&location=origin",
    title:
      "Calendar 2025: World Championships, Cricket World Cups, Hockey Asia Cup and more",
    description:
      "Here's the 2025 sporting calendar to keep track of big tournaments and ESPN India's coverage.",
  },

  {
    image:
      "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F1212%2Fr1427074_608x342_16%2D9.jpg&w=272&h=153&scale=crop&cquality=80&location=origin",
    title: "ESPN India Awards 2024: Full list of winners",
    description:
      "From D Gukesh to Manu Bhaker, from Avani Lekhara to Harvinder Singh, we profile Indian sports' best in 2024.",
  },

  {
    image:
      "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0722%2Fr1361574_1296x729_16%2D9.jpg&w=272&h=153&scale=crop&cquality=80&location=origin",
    title:
      "India at the Olympics: Latest news, features, schedule, videos and analysis from Paris 2024",
    description:
      "Your one-stop shop for the latest news and features on Indians competing at the Olympic Games Paris 2024.",
  },
];

interface PageProps {
  params: Promise<{ date: string }>;
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;

  const dt = DateTime.fromFormat(date, "yyyyLLdd");
  const yesterday = dt.minus({ days: 1 }).toFormat("yyyyLLdd");
  const tomorrow = dt.plus({ days: 1 }).toFormat("yyyyLLdd");
  const schedules = await getAllLeagueSchedules(yesterday, tomorrow);
  

  return (
    <main>
      <div className="container mx-auto my-5 px-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          Live Football Scores, Fixtures & Results | SOCCERKEEDA
        </h1>

        <div className="grid grid-cols-12 mt-10 gap-6">
          {/* Left Sidebar */}
          <div className="hidden xl:block xl:col-span-2">
            <LeftSidebar data={SportsData} />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            {/* <DateCarousel /> */}

            <MainContent schedules={schedules} date={date} />
          </div>

          {/* Right Sidebar (only visible on xl screens) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <RightSidebar data={BlogData} />
          </div>
        </div>
      </div>
    </main>
  );
}
