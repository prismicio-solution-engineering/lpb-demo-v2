"use client";

import { useState } from "react";

type QueryParams = {
  company?: string;
  role?: string;
  instructions?: string;
};

type QueryParamsNoteProps = {
  query: QueryParams;
  embedded?: boolean;
};

const LABELS: Record<keyof QueryParams, string> = {
  company: "Company",
  role: "Role",
  instructions: "Instructions",
};

export default function QueryParamsNote({
  query,
  embedded = false,
}: QueryParamsNoteProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const entries = (Object.entries(query) as Array<[keyof QueryParams, string | undefined]>)
    .map(([key, value]) => [key, value?.trim()] as const)
    .filter(([, value]) => Boolean(value));

  if (entries.length === 0) {
    return null;
  }

  return (
    <div
      className={`${embedded ? "" : "fixed right-4 bottom-4 z-[1200]"} w-[min(95vw,28rem)] border border-[#9FD9FF] rounded-xl bg-[#EEF8FF] text-[#10375A] p-4`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold">Page Inputs</p>
          <p className="text-xs text-[#2B587F]">
            Inputs detected from URL query parameters.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed((value) => !value)}
          className="text-xs font-semibold underline cursor-pointer"
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      {!isCollapsed && (
        <ul className="mt-3 space-y-1 text-sm">
          {entries.map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold">{LABELS[key]}:</span> {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
