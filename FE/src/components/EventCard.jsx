import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden shadow-slate-200/50 border border-slate-100">
      <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
            {event.category || 'Technology'}
          </span>
          <h1 className="text-3xl font-bold text-white mt-3 drop-shadow-md">{event.name}</h1>
        </div>
      </div>
      
      <div className="p-8">
        <p className="text-slate-600 mb-6 leading-relaxed">
          {event.description}
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <Calendar className="w-5 h-5 mr-4 text-indigo-500" />
            <span className="font-medium">{event.date}</span>
          </div>
          <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <Clock className="w-5 h-5 mr-4 text-indigo-500" />
            <span className="font-medium">{event.time}</span>
          </div>
          <div className="flex items-center text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <MapPin className="w-5 h-5 mr-4 text-indigo-500" />
            <span className="font-medium">{event.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
