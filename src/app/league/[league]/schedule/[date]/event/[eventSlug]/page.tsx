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

import LeftSidebar from "./sidebars/LeftSidebar";
import RightSidebar from "./sidebars/RightSidebar";

interface PageProps {
  params: Promise<{ league: string; date: string; eventSlug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { league, date, eventSlug } = await params;

  const dt = DateTime.fromFormat(date, "yyyyLLdd");

  if (!dt.isValid) {
    return <p>Invalid date format.</p>;
  }

  const yesterday = dt.minus({ days: 1 }).toFormat("yyyyLLdd");
  const tomorrow = dt.plus({ days: 1 }).toFormat("yyyyLLdd");

  const schedules = await getAllLeagueSchedules(yesterday, tomorrow);
  const leagueObj = schedules.find((item) => slugify(item.league) === league);

  if (!leagueObj) {
    return <p>League not found.</p>;
  }

  const eventObj = leagueObj.events.find(
    (event) => slugify(event.name) === eventSlug
  );

  if (!eventObj) {
    return <p>Event not found.</p>;
  }

  const summaryData = await fetchEventSummary(leagueObj.slug, eventObj.id);

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
          <div className="col-span-12 lg:col-span-9 xl:col-span-6 grid grid-cols-12">
            <div className=" col-span-12">
              <Card>
                <CardHeader className="border-b !pb-2">
                  <CardDescription className="flex items-center gap-2">
                    <img
                      src={leagueObj.image}
                      alt={leagueObj.league}
                      className="w-10 h-10"
                    />

                    <CardTitle>{leagueObj.league}</CardTitle>
                  </CardDescription>
                </CardHeader>

                <CardContent className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 flex flex-col items-center gap-3">
                    <div>
                      <img
                        src={
                          summaryData.header.competitions[0].competitors[1].team
                            .logos[0].href || null
                        }
                        alt={
                          summaryData.header.competitions[0].competitors[1].team
                            .displayName
                        }
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div>
                      {
                        summaryData.header.competitions[0].competitors[1].team
                          .displayName
                      }
                    </div>
                    <div className="text-muted-foreground">
                      test
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col gap-2 justify-center items-center">
                    <span className="font-bold text-4xl">
                      {summaryData.header.competitions[0].competitors[1].score}{" "}
                      -{" "}
                      {summaryData.header.competitions[0].competitors[0].score}
                    </span>

                    <span className="text-muted-foreground">
                     {summaryData.header.competitions[0].status.type.description}
                    </span>
                  </div>
                  <div className="col-span-4 flex flex-col items-center gap-3">
                    <div>
                      <img
                        src={
                          summaryData.header.competitions[0].competitors[0].team
                            .logos[0].href || null
                        }
                        alt={
                          summaryData.header.competitions[0].competitors[0].team
                            .displayName
                        }
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div>
                      {
                        summaryData.header.competitions[0].competitors[0].team
                          .displayName
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
