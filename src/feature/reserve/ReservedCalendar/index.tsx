import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
type Props = {
  events: any;
};

export const ReservedCalendar = ({ events }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        locale="ja" // 日本語化
        selectable={true}
        selectMirror={true}
        selectOverlap={false}
        eventDurationEditable={true}
        events={events}
        eventClick={(clickInfo) => {
          const eventDate = clickInfo.event.start;
          setSelectedDate(eventDate);
        }}
      />
      {selectedDate ? (
        <p>{selectedDate.toString()}</p>
      ) : (
        <p>選択されていません</p>
      )}
    </>
  );
};
