// app/your-path/[league]/[date]/[eventSlug]/page.tsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TimeFormatter from "@/components/TimeFormatter";

export default async function LeftSidebar({
  data,
  date,
}: {
  data: any;
  date: string;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="border-b pb-5">Game Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-muted-foreground">{data.venue.fullName}</div>

          <div className="text-muted-foreground border-b pb-5">
            <TimeFormatter date={date} />
          </div>

          <div className="text-muted-foreground pt-5">
            {data.venue.address.city}, {data.venue.address.country}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
