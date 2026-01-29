import { ReactNode } from 'react';
import { formatDateByTime } from '@/shared/lib/format/date';
import { TimeLink } from '@/shared/ui/time-link';

interface BaseSession {
  id: number;
  startTime: string;
}

interface SessionScheduleProps<T extends BaseSession> {
  data: Record<string, Record<string, T[]>>;
  renderTitle: (id: string) => ReactNode;
}

export const SessionSchedule = <T extends BaseSession>({
  data,
  renderTitle,
}: SessionScheduleProps<T>) => {
  return (
    <>
      {Object.entries(data).map(([dateLabel, subGroups]) => (
        <div key={dateLabel} className="mb-10 flex flex-col gap-6">
          <h3 className="border-b-2 px-4 py-2 text-xl">{dateLabel}</h3>
          {Object.entries(subGroups).map(([id, sessions]) => (
            <div key={id} className="flex items-center gap-6 px-4">
              <span className="text-2xl">{renderTitle(id)}</span>

              <ul className="ml-auto flex gap-6">
                {sessions.map((session) => (
                  <li key={`${formatDateByTime(session.startTime)}`}>
                    <TimeLink
                      time={formatDateByTime(session.startTime)}
                      href={`/session/${session.id}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
