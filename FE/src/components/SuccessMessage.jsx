import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SuccessMessage = ({ onReset }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-3">Registration Successful!</h2>
      <p className="text-slate-600 mb-8 max-w-sm mx-auto">
        Your details have been successfully saved. We have sent a confirmation to your college email.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200"
      >
        <span>Register Another</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SuccessMessage;
