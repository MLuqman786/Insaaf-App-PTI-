import React, { useEffect, useState } from 'react'
import AxiosInstnace from '../../utils/Axios/Axiox'


function Events() {
const [events,setEvents] =useState([])

  const fetchEvents = async()=>{
    const response =await AxiosInstnace.get("/events/")
    setEvents(response.data)
  }
useEffect(()=>{fetchEvents()},[])
  return (
  
    <>
    <div className="flex flex-col items-center gap-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="max-w-md mx-auto mb-8 overflow-hidden rounded-lg shadow-lg bg-white"
        >
          {/* Event Image */}
          <img
            className="object-cover w-full h-48"
            src={event.eventPicture}
            alt="Event"
          />

          {/* Event Details */}
          <div className="p-4">
            {/* Profile Information */}
             
            {event.admin && (
            
            <div key={index} className="flex items-center mb-3">
              <img
                src={event.admin.picture}
                alt="Profile"
                className="rounded-full h-14 w-14 inline border-2 border-gray-200"
              />
              <div className="ml-3">
                <h1 className="font-bold text-lg md:text-xl">{event.admin.name}</h1>
                <h2 className="text-gray-500 text-xs md:text-sm">
                  {new Date(event.updatedAt).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </h2>
              </div>
            </div>
        )

        }
             {event.member && (
        
        <div key={index} className="flex items-center mb-3">
          <img
            src={event.member.picture}
            alt="Profile"
            className="rounded-full h-14 w-14 inline border-2 border-gray-200"
          />
          <div className="ml-3">
            <h1 className="font-bold text-lg md:text-xl">{event.member.name}</h1>
            <h2 className="text-gray-500 text-xs md:text-sm">
              {new Date(event.updatedAt).toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </h2>
          </div>
        </div>
    )

    }

            {/* Event Title */}
            <h2 className="text-xl font-bold mb-2">{event.eventTitle}</h2>

            {/* Event Date */}
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-bold mr-2">Event Date:</span>
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            {/* Event Description */}
            <p className="text-gray-600  ">{event.eventDescription}</p>
          </div>
        </div >
      ))}
    </div>
    </>
  )
}

export default Events