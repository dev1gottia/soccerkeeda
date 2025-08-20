/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import DateCarousel from "./DateCarousal";
import SearchFilter from "./Filters";
import ScheduleComponent from "./ScheduleComponent";

export default function MainContent({ schedules }: { schedules: any }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter schedules based on search query
  const filteredSchedules = React.useMemo(() => {
    if (!searchQuery) return schedules; // no filter, show all

    const query = searchQuery.toLowerCase();

    // Only keep leagues with at least one matching event
    return schedules
      .map((league: any) => {
        const filteredEvents = league.events.filter((event: any) => {
          return (
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            league.league.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

        return { ...league, events: filteredEvents };
      })
      .filter((league: any) => league.events.length > 0); // remove empty leagues
  }, [searchQuery, schedules]);

  return (
    <div>
      <DateCarousel />

      <SearchFilter onSearchChange={setSearchQuery} />

      <div className="mt-6">
        <ScheduleComponent Events={filteredSchedules} />
      </div>
    </div>
  );
}
