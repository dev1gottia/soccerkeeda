/* eslint-disable @typescript-eslint/no-explicit-any */
// app/your-path/[league]/[date]/[eventSlug]/page.tsx
"use client";

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
}: {
  summaryData: any;
  leagueObj: any;
}) {
  const tabsClass = "data-[state=active]:!bg-green-500 text-white ";
  const activeTagClass = "bg-green-500 text-white hover:bg-green-500";
  const notActiveTagClass =
    "bg-transparent text-muted-foreground hover:bg-transparent";

  const latestCommentary = [...summaryData.commentary].reverse().slice(0, 3);

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
  const handleTabClick = (e: any, tabName: any) => {
    e.preventDefault(); // Optionally prevent default action if needed
    console.log(`Tab clicked: ${tabName}`);
    // Additional logic like tracking analytics or triggering actions can be added here
  };

  // Final merged stats array
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
              <Button className={activeTagClass} size="sm">
                Summary
              </Button>

              <Link href="/">
                <Button size="sm" className={notActiveTagClass}>
                  Commentary
                </Button>
              </Link>
              <Button size="sm" className={notActiveTagClass}>
                Statistics
              </Button>
              <Button size="sm" className={notActiveTagClass}>
                Lineups
              </Button>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Match Commentary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {latestCommentary[0].time.displayValue.replaceAll(
                        "",
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words max-w-xs">
                      {latestCommentary[0].text}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {latestCommentary[1].time.displayValue}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words max-w-xs">
                      {latestCommentary[1].text}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {latestCommentary[2].time.displayValue}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words max-w-xs">
                      {latestCommentary[2].text}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Link
                href="commentary"
                className="text-center bg-red-500 text-green-500"
              >
                <p className="border-t pt-4 hover:underline">Full Commentary</p>
              </Link>
            </CardContent>
          </Card>

          <Card className="mt-4">
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
        </div>
      </div>
    </div>
  );
}
