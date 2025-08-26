/* eslint-disable @typescript-eslint/no-explicit-any */
// app/your-path/[league]/[date]/[eventSlug]/page.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import MatchStatBar from "@/components/MatchStatBar";

import moment from "moment-timezone";

export default function MainContent({
  summaryData,
  leagueObj,
  params,
  paramsArry,
  paramsData,
}: {
  summaryData: any;
  leagueObj: any;
  params: string;
  paramsArry: string[];
  paramsData: any;
}) {
  const tabsClass =
    "data-[state=active]:!bg-green-500 data-[state=active]:text-white dark:data-[state=active]:text-foreground";

  const latestCommentary = [...summaryData.commentary].reverse();
  const latestKeyevents = [...summaryData.keyEvents].reverse();

  const activeClass = "bg-green-500 text-white hover:bg-green-500";
  const notActiveTagClass =
    "bg-transparent text-muted-foreground hover:bg-transparent shadow-none dark:hover:text-white hover:text-black";

  const team1 = {
    name: summaryData.boxscore.teams[1].team.name,
    color: "#" + summaryData.boxscore.teams[1].team.color,
  };

  const team2 = {
    name: summaryData.boxscore.teams[0].team.name,
    color: "#" + summaryData.boxscore.teams[0].team.color,
  };

  const statNames = [
    { name: "shotsOnTarget", label: "Shots on Target" },
    { name: "totalShots", label: "Shots off Target" },
    { name: "blockedShots", label: "Blocked Shots" },
    { name: "possessionPct", label: "Possession" },
    { name: "wonCorners", label: "Corner Kicks" },
    { name: "offsides", label: "Offsides" },
    { name: "foulsCommitted", label: "Fouls" },
    { name: "yellowCards", label: "Yellow Cards" },
    { name: "accurateCrosses", label: "Accurate Crosses" },
    { name: "saves", label: "Saves" },
    { name: "effectiveTackles", label: "Effective Tackles" },
    { name: "redCards", label: "Red Cards" },
  ];

  const team1Stats = summaryData.boxscore.teams[0].statistics.filter(
    (stat: any) => statNames.find((item) => item.name === stat.name)
  );

  const team2Stats = summaryData.boxscore.teams[1].statistics.filter(
    (stat: any) => statNames.find((item) => item.name === stat.name)
  );

  // Convert filtered stats to maps for quick lookup
  const team1Map = Object.fromEntries(
    team1Stats.map((stat: any) => [stat.name, stat.displayValue])
  );
  const team2Map = Object.fromEntries(
    team2Stats.map((stat: any) => [stat.name, stat.displayValue])
  );
  const stats = statNames.map(({ name, label }) => ({
    label,
    team1Value: parseFloat(team1Map[name]) || 0,
    team2Value: parseFloat(team2Map[name]) || 0,
  }));

  return (
    <div className="grid grid-cols-12">
      <div className=" col-span-12">
        <Card>
          <CardHeader className="border-b !pb-2">
            <CardDescription className="flex items-center gap-2">
              <img
                src={leagueObj.image}
                alt={leagueObj.name}
                className="w-10 h-10"
              />

              <CardTitle>{leagueObj.name}</CardTitle>
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
                <div>
                  {
                    summaryData.header.competitions[0].competitors[1].team
                      .displayName
                  }
                </div>

                <div className="text-muted-foreground text-sm text-center">
                  {" "}
                  {
                    summaryData.header.competitions[0].competitors[1].record[0]
                      .summary
                  }{" "}
                  PTS
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-2 justify-center items-center">
              {summaryData.header.competitions[0].status.type.state ===
                "pre" && (
                <span className="font-bold text-4xl">
                  {moment(summaryData.header.competitions[0].date).format(
                    "HH:mm"
                  )}
                </span>
              )}

              {summaryData.header.competitions[0].status.type.state ===
                "post" &&
                summaryData.header.competitions[0].status.type.completed ===
                  true && (
                  <span className="font-bold text-4xl">
                    {summaryData.header.competitions[0].competitors[1].score} -{" "}
                    {summaryData.header.competitions[0].competitors[0].score}
                  </span>
                )}

              {/* <span className="font-bold text-4xl">
                      {summaryData.header.competitions[0].competitors[1].score}{" "}
                      -{" "}
                      {summaryData.header.competitions[0].competitors[0].score}
                    </span> */}

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
                <div>
                  {
                    summaryData.header.competitions[0].competitors[0].team
                      .displayName
                  }
                </div>

                <div className="text-muted-foreground text-sm text-center">
                  {" "}
                  {
                    summaryData.header.competitions[0].competitors[0].record[0]
                      .summary
                  }{" "}
                  PTS
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 mt-6">
        <div className="flex w-full flex-col gap-3">
          <div className="flex">
            <Card className="flex flex-row py-0 gap-0 p-1">
              <Link
                href={`/league/${paramsData.league}/event/${paramsData.eventSlug}/${paramsData.eventId}`}
              >
                <Button size="sm" className={notActiveTagClass}>
                  Summary
                </Button>
              </Link>

              {paramsArry.map((paramItem) => {
                const isActive = params === paramItem;
                const activeTagClass = isActive
                  ? activeClass
                  : notActiveTagClass;

                return (
                  <Link
                    href={`/league/${paramsData.league}/event/${paramsData.eventSlug}/${paramsData.eventId}/${paramItem}`}
                    key={paramItem}
                  >
                    <Button size="sm" className={activeTagClass}>
                      {paramItem.charAt(0).toUpperCase() + paramItem.slice(1)}{" "}
                      {/* Capitalize the first letter */}
                    </Button>
                  </Link>
                );
              })}
            </Card>
          </div>

          {params === "commentary" && (
            <Card>
              <CardHeader>
                <CardTitle>Match Commentary</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="commentary">
                  <TabsList className="mb-5 border bg-card">
                    <TabsTrigger value="commentary" className={tabsClass}>
                      Commentary
                    </TabsTrigger>
                    <TabsTrigger value="keyevents" className={tabsClass}>
                      Keyevents
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="commentary">
                    <Table>
                      <TableBody>
                        {latestCommentary.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {item.time.displayValue === ""
                                ? "-"
                                : item.time.displayValue}
                            </TableCell>
                            <TableCell className="whitespace-normal break-words max-w-xs">
                              {item.text}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="keyevents">
                    <Table>
                      <TableBody>
                        {latestKeyevents.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {item.clock.displayValue === ""
                                ? "-"
                                : item.clock.displayValue}
                            </TableCell>
                            <TableCell>{item.type.text}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {params === "statistics" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Match Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.map((stat: any) => (
                    <MatchStatBar
                      key={stat.label}
                      label={stat.label}
                      team1Label={team1.name}
                      team2Label={team2.name}
                      team1Value={stat.team1Value}
                      team2Value={stat.team2Value}
                      team1Color={team1.color}
                      team2Color={team2.color}
                    />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Head To Head Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Team 1</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Team 2</TableHead>
                        <TableHead>League</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summaryData.headToHeadGames[0].events.map(
                        (event: any, index: number) => (
                          <TableRow
                            key={index}
                            className="text-muted-foreground"
                          >
                            <TableCell>
                              {summaryData.headToHeadGames[0].team.displayName}
                            </TableCell>
                            <TableCell>
                              {event.awayTeamScore} - {event.homeTeamScore}
                            </TableCell>
                            <TableCell>{event.opponent.displayName}</TableCell>
                            <TableCell>{event.leagueName}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {summaryData.boxscore.form.map((team: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{team.team.displayName} Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Result</TableHead>
                          <TableHead>Team 1</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Team 2</TableHead>
                          <TableHead>League</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {team.events.map((event: any, index: number) => (
                          <TableRow
                            key={index}
                            className="text-muted-foreground"
                          >
                            <TableCell
                              className={
                                event.gameResult === "W"
                                  ? "text-green-500"
                                  : event.gameResult === "L"
                                  ? "text-red-500"
                                  : event.gameResult === "D"
                                  ? "text-muted-foreground"
                                  : ""
                              }
                            >
                              {event.gameResult}
                            </TableCell>
                            <TableCell>
                              {summaryData.headToHeadGames[0].team.displayName}
                            </TableCell>
                            <TableCell>
                              {summaryData.headToHeadGames[0].team.displayName}
                            </TableCell>
                            <TableCell>
                              {event.awayTeamScore} - {event.homeTeamScore}
                            </TableCell>
                            <TableCell>{event.opponent.displayName}</TableCell>
                            <TableCell>{event.leagueName}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
