/* eslint-disable @next/next/no-img-element */
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type SidebarContent = {
  name: string;
  image: string;
};

export default function LeftSidebar({ data }: { data: SidebarContent[] }) {
  return (
    <Card className="bg-transparent">
      <CardHeader className="border-b !pb-3">
        <CardTitle className="flex items-center gap-3">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trophy h-6 w-6 text-green-500"
            aria-hidden="true"
          >
            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
            <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
            <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
          </svg>{" "}
          <span>Top Leagues</span>
        </CardTitle>
      </CardHeader>
      <div className="space-y-1 mx-2">
        {data.map((item, index) => (
          <div
            className="flex items-center gap-4 bg-card p-1 border rounded-md shadow-sm cursor-pointer hover:border-green-500 transition-all duration-300 ease-in-out"
            key={index}
          >
            <div className="rounded-full p-1 bg-white">
              <img src={item.image} alt={item.name} className="w-6 h-6" />
            </div>
            <div className="text-xs">{item.name}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
