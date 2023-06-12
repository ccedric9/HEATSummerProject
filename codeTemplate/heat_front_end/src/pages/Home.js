import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './custom-calendar-styles.css';
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  // const [events, setEvents] = useState([
  //   {
  //     title: 'Meeting',
  //     type: 'meeting',
  //     start: '2023-06-10',
  //   },
  //   {
  //     title: 'Assessment',
  //     type: 'assessment',
  //     start: '2023-06-15',
  //   },
  // ]);


  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  const loadCalendarEvents = async () => {
    const result = await axios.get("http://localhost:8080/calendarEvents");
    setEvents(result.data);
  };
  console.log(events);




  const handleDateClick = (arg) => {
    alert('Date clicked: ' + arg.dateStr);
  };

  const handleEventClick = (info) => {
    alert('Event clicked: ' + info.event.title);
  };

  const handleEventDrop = (info) => {
    alert(`${info.event.title} was dropped on ${info.event.startStr}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Calendar */}
        <div className="col-md-12 mb-5">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,customYearView',
            }}
            views={{
              customYearView: {
                type: 'dayGrid',
                duration: { months: 12 },
                buttonText: 'current year',
                visibleRange: function(currentDate) {
                  return {
                    start: currentDate.clone().startOf('year'),
                    end: currentDate.clone().endOf('year'),
                  };
                },
                monthMode: true,
              }
            }}
            events={events}
            eventColor="#378006"
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            editable={true}
            droppable={true}
            eventDrop={handleEventDrop}
          />
        </div>

        {/* Course Bars */}
        <div className="col-md-6">
          <div className="course-bar bg-primary text-white p-3 mb-3">
            Course 1
          </div>
        </div>
        <div className="col-md-6">
          <div className="course-bar bg-success text-white p-3 mb-3">
            Course 2
          </div>
        </div>
      </div>
    </div>
  );
}
