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
  const tabsClass =
    "data-[state=active]:!bg-green-500 data-[state=active]:text-white dark:data-[state=active]:text-foreground";

  const latestCommentary = [...summaryData.commentary].reverse();

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

      <div className="col-span-12 mt-4">
        <div className="flex w-full flex-col gap-6">
          <Tabs defaultValue="commentary">
            <TabsList>
              <TabsTrigger value="summary" className={tabsClass}>
                Summary
              </TabsTrigger>
              <TabsTrigger value="commentary" className={tabsClass}>
                Commentary
              </TabsTrigger>
              <TabsTrigger value="statistics" className={tabsClass}>
                Statistics
              </TabsTrigger>
              <TabsTrigger value="lineups" className={tabsClass}>
                LineUps
              </TabsTrigger>
            </TabsList>

            <TabsContent value="commentary">
              <Card>
                <CardHeader>
                  <CardTitle>Match Commentary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      {latestCommentary.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.time.displayValue === "" ? "-" : item.time.displayValue}</TableCell>
                          <TableCell className="whitespace-normal break-words max-w-xs">
                            {item.text}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
