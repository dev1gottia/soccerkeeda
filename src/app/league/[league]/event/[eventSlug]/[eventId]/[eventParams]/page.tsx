// app/your-path/[league]/[date]/[eventSlug]/page.tsx

import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";
import { fetchEventSummary } from "@/lib/summaryFetch";
import { DateTime } from "luxon";
import slugify from "@/lib/slugify";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import SportsData from "@/lib/leagueData";

import LeftSidebar from "../../sidebars/LeftSidebar";
import RightSidebar from "../../sidebars/RightSidebar";
import CommentaryContent from "./commentaryContent/MainContent";

interface PageProps {
  params: Promise<{
    league: string;
    eventId: string;
    eventSlug: string;
    eventParams: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { league, eventId, eventSlug, eventParams } = await params;

  const leagueObj = SportsData.find((item) => slugify(item.name) === league);

  if (!leagueObj) {
    return <p>League not found.</p>;
  }

  const summaryData = await fetchEventSummary(leagueObj.slug, eventId);

  const paramsArry: string[] = [
    "commentary",
    "statistics",
    "lineups",
  ];

  if (paramsArry.includes(eventParams) === false) {
    return <p>Params not found.</p>;
  }

  const paramsData = {
    league,
    eventId,
    eventSlug,
    eventParams,
  };

  return (
    <main>
      <div className="container mx-auto my-5 px-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          Live Football Scores, Fixtures & Results | SOCCERKEEDA
        </h1>
        <div className="grid grid-cols-12 mt-10 gap-6">
          {/* Left Sidebar */}
          <div className="hidden xl:block xl:col-span-3">
            <LeftSidebar
              data={summaryData.gameInfo}
              date={summaryData.header.competitions[0].date}
            />
          </div>
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 xl:col-span-6">
            <CommentaryContent
              summaryData={summaryData}
              leagueObj={leagueObj}
              params={eventParams}
              paramsArry={paramsArry}
              paramsData={paramsData}
            />
          </div>
          {/* Right Sidebar (only visible on xl screens) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <RightSidebar
              data={summaryData.standings.groups[0]}
              team1={summaryData.header.competitions[0].competitors[0].id}
              team2={summaryData.header.competitions[0].competitors[1].id}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
