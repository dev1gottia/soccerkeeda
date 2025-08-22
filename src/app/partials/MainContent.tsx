/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import DateCarousel from "./DateCarousal";
import SearchFilter from "./Filters";
import ScheduleComponent from "./ScheduleComponent";
import moment from "moment-timezone";

export default function MainContent({
  schedules,
  date,
}: {
  schedules: any;
  date?: any;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const userTz = moment.tz.guess();

  let selectedDate;

  if (date) {
    selectedDate = moment.tz(date, userTz);
  } else {
    selectedDate = moment.tz(userTz);
  }

  const filteredSchedules = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    const selectedDateNew = selectedDate;

    return schedules
      .map((league: any) => {
        const filteredEvents = league.events.filter((event: any) => {
          const eventDate = moment.tz(event.date, userTz);

          // ✅ Date filter (compare in user timezone)
          const matchesDate = selectedDateNew
            ? eventDate.isSame(selectedDateNew, "day")
            : true;

          const matchesSearch = query
            ? event.name.toLowerCase().includes(query) ||
              league.league.toLowerCase().includes(query) ||
              event.status.type.detail.toLowerCase().includes(query)
            : true;

          return matchesDate && matchesSearch;
        });

        return { ...league, events: filteredEvents };
      })
      .filter((league: any) => league.events.length > 0);
  }, [searchQuery, schedules, userTz]);

  return (
    <div>
      <DateCarousel date={date} />
      <SearchFilter onSearchChange={setSearchQuery} />

      <div className="mt-6">
        <ScheduleComponent Events={filteredSchedules} />
      </div>
    </div>
  );
}
