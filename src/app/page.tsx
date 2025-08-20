/* eslint-disable @next/next/no-img-element */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LeftSidebar from "./partials/LeftSidebar";
import RightSidebar from "./partials/RightSidebar";
import DateCarousel from "./partials/DateCarousal";
import ScheduleComponent from "./partials/ScheduleComponent";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type SportsDataType = {
  name: string;
  image: string;
};

export type BlogDataType = {
  image: string;
  title: string;
  description: string;
};

const SportsData: SportsDataType[] = [
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

const Events = [
  {
    name: "English Premier League",
    image:
      "https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/23.png&transparent=true&w=48&h=48",
    events: [
      {
        team1: "Manchester United",
        image1:
          "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/250px-Manchester_United_FC_crest.svg.png",
        score1: 2,

        team2: "Liverpool",
        image2:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/200px-Liverpool_FC.svg.png",
        score2: 3,

        venue: "Dignity Health Sports Park",
        status: "Live • 67'",
      },

      {
        team1: "Chelsea",
        image1:
          "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/215px-Chelsea_FC.svg.png",
        score1: 2,

        team2: "Arsenal",
        image2:
          "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/250px-Arsenal_FC.svg.png",
        score2: 3,

        venue: "Old Trafford",
        status: "Live • 67'",
      },
    ],
  },
];

export default function Page() {
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
            <DateCarousel />

            <div className="mt-6">
              <ScheduleComponent Events={Events} />
            </div>
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
