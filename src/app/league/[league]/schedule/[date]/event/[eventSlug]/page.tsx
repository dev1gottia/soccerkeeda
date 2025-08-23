import { getAllLeagueSchedules } from "@/lib/getLeagueSchedules";
import { DateTime } from "luxon";
import SportsData from "@/lib/leagueData";
import slugify from "@/lib/slugify";


interface PageProps {
    params: Promise<{ league: string, date: string, eventSlug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { league, date, eventSlug } = await params;

    const dt = DateTime.fromFormat(date, "yyyyLLdd");
    const yesterday = dt.minus({ days: 1 }).toFormat("yyyyLLdd");
    const tomorrow = dt.plus({ days: 1 }).toFormat("yyyyLLdd");
    const schedules = await getAllLeagueSchedules(yesterday, tomorrow);


    const leagueObj = schedules.find((item) => slugify(item.league) === league);

    // Step 2: If the league object exists, find the event inside it
    let eventObj;
    if (leagueObj) {
        eventObj = leagueObj.events.find((event) => slugify(event.name) === eventSlug);
    }

    // Step 3: Get the ID if event exists
    const filterLeague = eventObj ? eventObj.id : null;

    console.log(leagueObj);


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
