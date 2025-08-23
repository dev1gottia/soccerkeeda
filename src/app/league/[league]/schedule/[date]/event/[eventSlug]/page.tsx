import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";
import { DateTime } from "luxon";
import SportsData from "@/lib/leagueData";


export default async function Page() {
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
