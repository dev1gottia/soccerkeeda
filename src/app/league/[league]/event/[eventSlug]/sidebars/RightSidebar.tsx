/* eslint-disable @typescript-eslint/no-explicit-any */
// app/your-path/[league]/[date]/[eventSlug]/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function RightSidebar({
  data,
  team1,
  team2,
}: {
  data: any;
  team1: string;
  team2: string;
}) {
  return (
    <>
      {data?.standings?.entries ? (
        <Card>
          <CardHeader>
            <CardTitle>{data?.header}</CardTitle>
          </CardHeader>

          <CardContent className="px-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>GP</TableHead>
                  <TableHead>W</TableHead>
                  <TableHead>D</TableHead>
                  <TableHead>L</TableHead>
                  <TableHead>GD</TableHead>
                  <TableHead>P</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.standings?.entries.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    className={`${
                      item.id === team1 || item.id === team2
                        ? ""
                        : "text-muted-foreground"
                    }`}
                  >
                    <TableCell>{item.team}</TableCell>
                    <TableCell>{item.stats[0].displayValue}</TableCell>
                    <TableCell>{item.stats[5].displayValue}</TableCell>
                    <TableCell>{item.stats[4].displayValue}</TableCell>
                    <TableCell>{item.stats[1].displayValue}</TableCell>
                    <TableCell>{item.stats[2].displayValue}</TableCell>
                    <TableCell>{item.stats[3].displayValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Standings</CardTitle>
          </CardHeader>

          <CardContent>
            <h3 className="text-md font-semibold text-neutral-900 dark:text-white mb-2">
              Standings Unavailable
            </h3>

            <p className="text-neutral-500 dark:text-neutral-400">
              The standings are not available right now. Please check back
              later.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
