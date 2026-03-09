import React, { useState } from 'react';
import VoiceButton from './VoiceButton';
import { parseVoiceInput } from '../utils/parseVoiceInput';
import { Send, AlertCircle } from 'lucide-react';

const RegistrationForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    year: '',
    email: '',
    phone: ''
  });
  
  const [voiceError, setVoiceError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVoiceTranscript = (transcript) => {
    setVoiceError('');
    const parsedData = parseVoiceInput(transcript);
    setFormData(prev => ({ ...prev, ...parsedData }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Student Registration</h2>
        <p className="text-slate-500">Register manually or use our voice assistant to autofill the form.</p>
      </div>

      <div className="mb-8">
        <VoiceButton 
          onTranscript={handleVoiceTranscript}
          onError={(err) => setVoiceError(err)}
        />
        {voiceError && (
          <div className="mt-3 text-sm text-rose-500 flex items-center gap-2 bg-rose-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span>{voiceError}</span>
          </div>
        )}
      </div>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">Or fill manually</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Student Name</label>
            <input 
              type="text" required name="name"
              value={formData.name} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Roll Number</label>
            <input 
              type="text" required name="rollNumber"
              value={formData.rollNumber} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase"
              placeholder="e.g. 21CS101"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Department</label>
            <select 
              required name="department"
              value={formData.department} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="EEE">Electrical & Electronics</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
              <option value="BCA">BCA</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Year of Study</label>
            <select 
              required name="year"
              value={formData.year} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">College Email</label>
            <input 
              type="email" required name="email"
              value={formData.email} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="jane@college.edu"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input 
              type="tel" required name="phone" pattern="[0-9]{10}"
              value={formData.phone} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="10-digit number"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-200 mt-6"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            <>
              <span>Confirm Registration</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
