"use client";

import { useState, useTransition } from "react";
import { updateApplicationStatus } from "@/app/admin/actions";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/types/application";

export default function AdminStatusSelect({
  applicationId,
  initialStatus,
}: {
  applicationId: string;
  initialStatus: ApplicationStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: ApplicationStatus) => {
    const previous = status;
    setStatus(next);
    startTransition(async () => {
      try {
        await updateApplicationStatus(applicationId, next);
      } catch {
        setStatus(previous);
      }
    });
  };

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => handleChange(e.target.value as ApplicationStatus)}
      className="rounded-lg border border-slate-300 px-2 py-1 text-sm disabled:opacity-60"
    >
      {APPLICATION_STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
