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

export default function DateCarousel() {
  const today = DateTime.now();
  const dates = Array.from({ length: 46 }).map((_, i) =>
    today.minus({ days: 15 }).plus({ days: i })
  );

  return (
    <Card className="max-md:px-2 px-14 py-4 bg-transparent">
      <Carousel
        className="w-full"
        opts={{
          align: "center",
          startIndex: dates.findIndex((d) => d.hasSame(today, "day")),
        }}
      >
        <CarouselContent className="mx-1">
          {dates.map((date, index) => {
            const isToday = date.hasSame(today, "day");

            return (
              <CarouselItem
                key={index}
                className="
                  basis-1/4 sm:basis-1/5 md:basis-1/7 
                  pl-2
                "
              >
                <Card
                  className={`transition-colors duration-300 rounded-xl shadow-sm ${
                    isToday
                      ? "bg-green-500 text-white"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <CardContent className="flex flex-col items-center justify-center p-3 sm:p-2">
                    <span className="text-base sm:text-lg font-semibold">
                      {date.day}
                    </span>
                    <span className="text-xs sm:text-sm">
                      {date.toFormat("EEE")}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Controls styled for mobile */}
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </Card>
  );
}
