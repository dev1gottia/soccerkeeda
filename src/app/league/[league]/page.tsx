export const runtime = "edge";

import LeftSidebar from "../../partials/LeftSidebar";
import RightSidebar from "../../partials/RightSidebar";
import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";
import MainContent from "../../partials/MainContent";
import { DateTime } from "luxon";
import SportsData from "@/lib/leagueData";

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
  params: Promise<{ league: string }>;
}

export default async function Page({ params }: PageProps) {
  const { league } = await params;

  const yesterday = DateTime.utc().minus({ days: 1 }).toFormat("yyyyLLdd");
  const tomorrow = DateTime.utc().plus({ days: 1 }).toFormat("yyyyLLdd");

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

            <MainContent schedules={schedules} leagueParam={league} />
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
