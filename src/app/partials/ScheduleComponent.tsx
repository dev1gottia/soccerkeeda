/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

type EventsDataType = {
  team1: string;
  image1: string;
  score1: number;

  team2: string;
  image2: string;
  score2: number;

  venue: string;
  status: string;
};

type EventsType = {
  name: string;
  image: string;
  events: EventsDataType[];
};

type Props = {
  Events: any;
};

export default function ScheduleComponent({ Events }: Props) {
  return (
    <>
      {Events.map((league, index) => (
        <Card className="mt-6 py-4" key={index}>
          {/* League Header */}
          <CardHeader className="border-b !pb-2">
            <CardTitle className="flex items-center gap-3">
              <div className="rounded-full p-1 bg-white shadow-md">
                <img
                  src={league.image}
                  alt={league.league}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="font-semibold text-lg">{league.league}</span>
            </CardTitle>
          </CardHeader>

          {/* Events List */}
          <CardContent className="mt-3 space-y-3 ">
            <div className="grid grid-cols-12 gap-4 max-md:grid-cols-1 ">
              {league.events.map((event, indexEvent) => (
                <div className="col-span-6 grid " key={indexEvent}>
                  <Card className="pt-3 hover:border-green-500 transition-all duration-300 ease-in-out">
                    <CardHeader className="border-b !pb-2">
                      <CardDescription className="flex items-center  gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="currentColor"
                          className="text-green-500 -mt-1"
                        >
                          <path d="M120-680v-160l160 80-160 80Zm600 0v-160l160 80-160 80Zm-280-40v-160l160 80-160 80Zm0 640q-76-2-141.5-12.5t-114-26.5Q136-135 108-156t-28-44v-360q0-25 31.5-46.5t85.5-38q54-16.5 127-26t156-9.5q83 0 156 9.5t127 26q54 16.5 85.5 38T880-560v360q0 23-28 44t-76.5 37q-48.5 16-114 26.5T520-80v-160h-80v160Zm40-440q97 0 167.5-11.5T760-558q0-5-76-23.5T480-600q-128 0-204 18.5T200-558q42 15 112.5 26.5T480-520ZM360-166v-154h240v154q80-8 131-23.5t69-27.5v-271q-55 22-138 35t-182 13q-99 0-182-13t-138-35v271q18 12 69 27.5T360-166Zm120-161Z" />
                        </svg>
                        {event.venue.displayName}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grid grid-cols-12 gap-4">
                      <div className="col-span-4 flex flex-col  items-center gap-3">
                        <div>
                          <img
                            src={event.competitions[0].competitors[0].team.logo}
                            alt={
                              event.competitions[0].competitors[0].team
                                .displayName
                            }
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div>
                          {
                            event.competitions[0].competitors[0].team
                              .displayName
                          }
                        </div>
                      </div>
                      <div className="col-span-4 flex flex-col gap-2 justify-center items-center">
                        <span className="text-muted-foreground font-semibold">
                          VS
                        </span>

                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border bg-green-500/10 text-green-500 border-green-500/40">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="size-3.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="tracking-wide">05:00</span>
                        </div>
                      </div>
                      <div className="col-span-4 flex flex-col  items-center gap-3">
                        <div>
                          <img
                            src={event.competitions[0].competitors[1].team.logo}
                            alt={
                              event.competitions[0].competitors[1].team
                                .displayName
                            }
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div>
                          {
                            event.competitions[0].competitors[1].team
                              .displayName
                          }
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
