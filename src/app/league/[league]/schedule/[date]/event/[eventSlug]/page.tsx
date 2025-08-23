// app/your-path/[league]/[date]/[eventSlug]/page.tsx

import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";
import { fetchEventSummary } from "@/lib/summaryFetch";
import { DateTime } from "luxon";
import slugify from "@/lib/slugify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TimeFormatter from "../../../../../../../components/TimeFormatter";

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
            <Card>
              <CardHeader>
                <CardTitle className="border-b pb-5">
                  Game Information
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-muted-foreground">
                  {summaryData.gameInfo.venue.fullName}
                </div>

                <div className="text-muted-foreground border-b pb-5">
                  <TimeFormatter
                    date={summaryData.header.competitions[0].date}
                  />
                </div>

                <div className="text-muted-foreground pt-5">
                  {summaryData.gameInfo.venue.address.city},{" "}
                  {summaryData.gameInfo.venue.address.country}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            {/* <DateCarousel /> */}
          </div>
          {/* Right Sidebar (only visible on xl screens) */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            {/* <RightSidebar data={BlogData} /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
