/* eslint-disable @next/next/no-img-element */
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
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import MatchStatBar from "@/components/MatchStatBar";

import moment from "moment-timezone";

export default function MainContent({
  summaryData,
  leagueObj,
  paramsData,
}: {
  summaryData: any;
  leagueObj: any;
  paramsData: any;
}) {
  const activeTagClass =
    "bg-green-500 text-white hover:bg-green-500 max-sm:text-xs max-sm:px-2";
  const notActiveTagClass =
    "bg-transparent text-muted-foreground hover:bg-transparent shadow-none dark:hover:text-white hover:text-black max-sm:text-xs max-sm:px-2";

  const latestCommentary = summaryData.commentary
    ? [...summaryData.commentary].reverse().slice(0, 3)
    : [];

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

  const team1Stats =
    summaryData?.boxscore?.teams?.[0]?.statistics?.filter((stat: any) =>
      statNames?.some((item) => item?.name === stat?.name)
    ) || [];

  const team2Stats =
    summaryData?.boxscore?.teams?.[1]?.statistics?.filter((stat: any) =>
      statNames?.some((item) => item?.name === stat?.name)
    ) || [];
  // Convert filtered stats to maps for quick lookup
  const team1Map = Object.fromEntries(
    team1Stats.map((stat: any) => [stat.name, stat.displayValue])
  );
  const team2Map = Object.fromEntries(
    team2Stats.map((stat: any) => [stat.name, stat.displayValue])
  );

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
                src={leagueObj?.image || "/placeholder.png"}
                alt={leagueObj?.name || "League"}
                className="w-10 h-10"
              />

              <CardTitle>{leagueObj?.name || "Unknown League"}</CardTitle>
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-12 gap-4">
            {/* Team 1 (competitor[1]) */}
            <div className="col-span-4 flex flex-col items-center gap-3">
              <div>
                <img
                  src={
                    summaryData?.header?.competitions?.[0]?.competitors?.[1]
                      ?.team?.logos?.[0]?.href || "/placeholder.png"
                  }
                  alt={
                    summaryData?.header?.competitions?.[0]?.competitors?.[1]
                      ?.team?.displayName || "Team 1"
                  }
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <div>
                  {summaryData?.header?.competitions?.[0]?.competitors?.[1]
                    ?.team?.displayName || "Unknown Team"}
                </div>

                {summaryData?.header?.competitions?.[0]?.competitors?.[1]
                  ?.record?.[0]?.summary && (
                  <div className="text-muted-foreground text-sm text-center">
                    {summaryData?.header?.competitions?.[0]?.competitors?.[1]
                      ?.record?.[0]?.summary || "0"}{" "}
                    PTS
                  </div>
                )}
              </div>
            </div>

            {/* Match Info */}
            <div className="col-span-4 flex flex-col gap-2 justify-center items-center">
              {/* Pre-game */}

              {summaryData?.header?.competitions?.[0]?.status?.type?.state ===
                "in" && (
                <span className="font-bold text-4xl text-center">
                  {summaryData?.header?.competitions?.[0]?.competitors?.[1]
                    ?.score ?? "-"}{" "}
                  -{" "}
                  {summaryData?.header?.competitions?.[0]?.competitors?.[0]
                    ?.score ?? "-"}{" "}
                </span>
              )}

              {summaryData?.header?.competitions?.[0]?.status?.type?.state ===
                "pre" && (
                <span className="font-bold text-4xl text-center">
                  {moment(summaryData.header.competitions[0].date).format(
                    "HH:mm"
                  )}
                </span>
              )}

              {summaryData?.header?.competitions?.[0]?.status?.type?.state ===
                "postponed" && (
                <span className="text-orange-500 font-semibold">
                  Match Postponed
                </span>
              )}

              {summaryData?.header?.competitions?.[0]?.status?.type?.state ===
                "canceled" && (
                <span className="text-red-500 font-semibold">
                  Match Canceled
                </span>
              )}

              {!["post", "in", "pre", "postponed", "canceled"].includes(
                summaryData?.header?.competitions?.[0]?.status?.type?.state ||
                  ""
              ) && (
                <span className="text-neutral-500 dark:text-neutral-400">
                  Status unavailable
                </span>
              )}

              {/* Post-game */}
              {summaryData?.header?.competitions?.[0]?.status?.type?.state ===
                "post" &&
                summaryData?.header?.competitions?.[0]?.status?.type
                  ?.completed === true && (
                  <span className="font-bold text-4xl">
                    {summaryData?.header?.competitions?.[0]?.competitors?.[1]
                      ?.score ?? "-"}{" "}
                    -{" "}
                    {summaryData?.header?.competitions?.[0]?.competitors?.[0]
                      ?.score ?? "-"}
                  </span>
                )}

              <span className="text-muted-foreground">
                {summaryData?.header?.competitions?.[0]?.status?.type
                  ?.description || "No status"}
              </span>
            </div>

            {/* Team 2 (competitor[0]) */}
            <div className="col-span-4 flex flex-col items-center gap-3">
              <div>
                <img
                  src={
                    summaryData?.header?.competitions?.[0]?.competitors?.[0]
                      ?.team?.logos?.[0]?.href || "/placeholder.png"
                  }
                  alt={
                    summaryData?.header?.competitions?.[0]?.competitors?.[0]
                      ?.team?.displayName || "Team 2"
                  }
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <div>
                  {summaryData?.header?.competitions?.[0]?.competitors?.[0]
                    ?.team?.displayName || "Unknown Team"}
                </div>

                {summaryData?.header?.competitions?.[0]?.competitors?.[0]
                  ?.record?.[0]?.summary && (
                  <div className="text-muted-foreground text-sm text-center">
                    {summaryData?.header?.competitions?.[0]?.competitors?.[0]
                      ?.record?.[0]?.summary || "0"}{" "}
                    PTS
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 mt-6">
        <div className="flex w-full flex-col gap-3">
          {(() => {
            const status = summaryData?.header?.competitions?.[0]?.status?.type;
            const state = status?.state;
            const detail = status?.detail;

            // ✅ allow which states should show the nav buttons
            const showNav =
              state === "in" || // in-progress
              state === "pre" || // pre-match
              detail === "FT";
            if (!showNav) return null;

            return (
              <div className="flex">
                <Card className="flex flex-row py-0 gap-0 p-1">
                  <Button className={activeTagClass} size="sm">
                    Summary
                  </Button>

                  <Link
                    href={`/league/${paramsData.league}/event/${paramsData.eventSlug}/${paramsData.eventId}/commentary`}
                  >
                    <Button size="sm" className={notActiveTagClass}>
                      Commentary
                    </Button>
                  </Link>

                  <Link
                    href={`/league/${paramsData.league}/event/${paramsData.eventSlug}/${paramsData.eventId}/statistics`}
                  >
                    <Button size="sm" className={notActiveTagClass}>
                      Statistics
                    </Button>
                  </Link>

                  <Link
                    href={`/league/${paramsData.league}/event/${paramsData.eventSlug}/${paramsData.eventId}/lineups`}
                  >
                    <Button size="sm" className={notActiveTagClass}>
                      Lineups
                    </Button>
                  </Link>
                </Card>
              </div>
            );
          })()}

          {summaryData?.header?.competitions?.[0]?.status?.type?.state ===
            "in" ||
          summaryData?.header?.competitions?.[0]?.status?.type?.state ===
            "post" ? (
            <>
              {latestCommentary.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Match Commentary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {latestCommentary[0]?.time?.displayValue === ""
                              ? "-"
                              : latestCommentary[0]?.time?.displayValue}
                          </TableCell>
                          <TableCell className="whitespace-normal break-words max-w-xs">
                            {latestCommentary[0]?.text}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            {latestCommentary[1]?.time?.displayValue}
                          </TableCell>
                          <TableCell className="whitespace-normal break-words max-w-xs">
                            {latestCommentary[1]?.text}
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            {latestCommentary[2]?.time?.displayValue}
                          </TableCell>
                          <TableCell className="whitespace-normal break-words max-w-xs">
                            {latestCommentary[2]?.text}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Link
                      href={`/league/${paramsData.league}/event/${paramsData.eventSlug}/${paramsData.eventId}/commentary`}
                      className="text-center bg-red-500 text-green-500"
                    >
                      <p className="border-t pt-4 hover:underline">
                        Full Commentary
                      </p>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {team1Stats.length > 0 && (
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
              )}
            </>
          ) : (
            <Card data-slot="card" className=" border-dashed border-2 ">
              <div data-slot="card-content" className="p-12 text-center">
                <div className="text-6xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    className="w-15 h-15 mx-auto text-green-500"
                  >
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm242 112q26 0 51-4t49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4Zm-90-200h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {
                    summaryData?.header?.competitions?.[0]?.competitors?.[1]
                      ?.team?.displayName
                  }{" "}
                  vs{" "}
                  {
                    summaryData?.header?.competitions?.[0]?.competitors?.[0]
                      ?.team?.displayName
                  }
                </h3>
                <h4>
                  {leagueObj?.name || "Unknown League"} · Starts at{" "}
                  {moment(summaryData.header.competitions[0].date).format(
                    "HH:mm"
                  )}
                </h4>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Match updates, live score, and stats will appear here once the
                  game begins.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
