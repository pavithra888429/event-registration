import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import RegistrationForm from '../components/RegistrationForm';
import SuccessMessage from '../components/SuccessMessage';
import { registerForEvent } from '../services/api';

const EVENT_DETAILS = {
  name: "TechNova Annual Hackathon 2026",
  category: "Hackathon",
  date: "April 15-16, 2026",
  time: "9:00 AM Onwards",
  venue: "Main Auditorium, Central Block",
  description: "Join us for the most awaited 36-hour hackathon of the year! Build innovative solutions, compete with the brightest minds, and win exciting prizes. Open to all departments."
};

const EventPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleRegistrationSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        eventId: "EVENT001" // Using the seeded event ID
      };

      const response = await registerForEvent(payload);

      if (response.message === "Registration successful") {
        setIsSuccess(true);
      } else {
        setError(response.message || "Registration failed.");
      }
      setIsSubmitting(false);

    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">College Event Portal</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Event Registration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
          <EventCard event={EVENT_DETAILS} />
        </div>

        <div className="lg:col-span-7 xl:col-span-8">
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {isSuccess ? (
            <SuccessMessage onReset={() => setIsSuccess(false)} />
          ) : (
            <RegistrationForm
              onSubmit={handleRegistrationSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
