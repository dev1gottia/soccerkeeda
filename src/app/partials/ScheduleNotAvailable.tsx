/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import DateCarousel from "./DateCarousal";
import SearchFilter from "./Filters";
import ScheduleComponent from "./ScheduleComponent";
import moment from "moment-timezone";
import slugify from "@/lib/slugify";
import { Card } from "@/components/ui/card";

export default function ScheduleNotAvailable() {
  return (
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
          No matches scheduled
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400">
          There are no soccer matches scheduled for this date.
        </p>
      </div>
    </Card>
  );
}
