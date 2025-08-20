"use client";

import * as React from "react";

type SearchFilterProps = {
  onSearchChange: (query: string) => void;
};

export default function SearchFilter({ onSearchChange }: SearchFilterProps) {
  const [query, setQuery] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search matches, teams..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
