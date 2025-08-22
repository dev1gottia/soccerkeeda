/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";

export default function DateCarousel({
  date,
  league,
}: {
  date?: string;
  league?: string;
}) {
  // Use useMemo to prevent today from changing on every render
  const today = React.useMemo(() => DateTime.now(), []);

  const dates = React.useMemo(
    () =>
      Array.from({ length: 46 }).map((_, i) =>
        today.minus({ days: 15 }).plus({ days: i })
      ),
    [today]
  );

  const router = useRouter();

  const handleClick = (clickedDate: DateTime) => {
    const dateStr = clickedDate.toFormat("yyyyLLdd");

    if (league) {
      return router.push(`/league/${league}/schedule/${dateStr}`);
    }

    // Push new URL with date param
    router.push(`/schedule/${dateStr}`);
  };

  // Parse the date from URL params or use today as default
  const getInitialSelectedDate = React.useCallback((): DateTime => {
    if (date) {
      // Parse YYYYMMDD format
      const parsedDate = DateTime.fromFormat(date, "yyyyLLdd");
      // Check if the parsed date is valid
      if (parsedDate.isValid) {
        return parsedDate;
      }
    }
    return today;
  }, [date, today]);

  const [selectedDate, setSelectedDate] = React.useState<DateTime>(() =>
    getInitialSelectedDate()
  );

  // Update selected date when URL param changes
  React.useEffect(() => {
    const newSelectedDate = getInitialSelectedDate();
    // Only update if the date actually changed
    if (!newSelectedDate.hasSame(selectedDate, "day")) {
      setSelectedDate(newSelectedDate);
    }
  }, [date, getInitialSelectedDate, selectedDate]);

  // Find the start index for the carousel
  const getStartIndex = React.useCallback((): number => {
    const targetDate = selectedDate.isValid ? selectedDate : today;
    return dates.findIndex((d) => d.hasSame(targetDate, "day"));
  }, [selectedDate, today, dates]);

  return (
    <Card className="max-sm:px-2 max-md:px-14 px-14 py-4">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          startIndex: getStartIndex(),
        }}
        key={selectedDate.toISODate()} // Force re-render when selected date changes
      >
        <CarouselContent className="mx-1">
          {dates.map((dateItem, index) => {
            const isSelected = dateItem.hasSame(selectedDate, "day");

            return (
              <CarouselItem
                key={index}
                className="basis-1/4 sm:basis-1/5 md:basis-1/7 pl-2"
              >
                <Card
                  onClick={() => handleClick(dateItem)}
                  className={`cursor-pointer p-0 transition-colors duration-300 rounded-xl shadow-sm ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <CardContent className="flex flex-col items-center justify-center p-3 sm:p-2">
                    <span className="text-base sm:text-lg font-semibold">
                      {dateItem.day}
                    </span>
                    <span className="text-xs sm:text-sm">
                      {dateItem.toFormat("EEE")}
                    </span>

                    
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </Card>
  );
}
