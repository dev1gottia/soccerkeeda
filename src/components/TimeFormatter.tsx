"use client";

import moment from "moment-timezone";
export default function TimeFormatter({ date }: { date: string }) {
  return <>{moment(date).format("hh:mm A, MMMM D, YYYY")}</>;
}
