/* eslint-disable @next/next/no-img-element */
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import { type BlogDataType } from "../page";

export default function LeftSidebar({ data }: { data: BlogDataType[] }) {
  return (
    <Card className="bg-transparent">
      <CardHeader className="border-b !pb-3">
        <CardTitle className="flex items-center gap-3">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
            className="h-6 w-6 text-green-500"
          >
            <path d="M160-120q-33 0-56.5-23.5T80-200v-640l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v640q0 33-23.5 56.5T800-120H160Zm0-80h280v-240H160v240Zm360 0h280v-80H520v80Zm0-160h280v-80H520v80ZM160-520h640v-120H160v120Z" />
          </svg>
          <span>Latest News</span>
        </CardTitle>
      </CardHeader>
      <div className="space-y-4 mx-2 bg-card p-3 rounded-md shadow-sm">
        {data.map((item, index) => (
          <div
            key={index}
            className="group border-b pb-4 last:border-0 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div>
              <img src={item.image} alt={item.title} className="rounded" />
            </div>
            <div className="ms-0.5 mt-2">
              <p className="text-sm leading-tight group-hover:text-green-500 transition-all duration-300">
                {item.title}
              </p>
              <p className="text-xs leading-tight text-gray-400 transition-all duration-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
