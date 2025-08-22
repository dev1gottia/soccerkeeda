/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import DateCarousel from "./DateCarousal";
import SearchFilter from "./Filters";
import ScheduleComponent from "./ScheduleComponent";
import moment from "moment-timezone";
import slugify from "@/lib/slugify";

export default function MainContent({
  schedules,
  date,
  leagueParam
}: {
  schedules: any;
  date?: any;
  leagueParam?: any;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const userTz = moment.tz.guess();

  let selectedDate;

  if (date) {
    selectedDate = moment.tz(date, userTz);
  } else {
    selectedDate = moment.tz(userTz);
  }

  let filteredSchedule;

  if (leagueParam) {
    filteredSchedule = schedules.filter((leagueObj: any) => slugify(leagueObj.league) === leagueParam)
  } else {
    filteredSchedule = schedules
  }



  const filteredSchedules = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    const selectedDateNew = selectedDate;

    return filteredSchedule
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
