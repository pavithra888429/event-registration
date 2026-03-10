import React from 'react';
import { User, Hash, School, GraduationCap, Mail, Phone, Calendar, Flag, ChevronRight, Clock } from 'lucide-react';

const StudentTable = ({ registrations }) => {
    if (!registrations || registrations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white/40 rounded-[2.5rem] border-4 border-dashed border-slate-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-50/20 blur-[100px] pointer-events-none group-hover:bg-indigo-100/30 transition-colors duration-700"></div>
                <div className="bg-white p-6 rounded-[2rem] shadow-2xl shadow-indigo-100/50 mb-8 ring-8 ring-indigo-50/60 relative z-10 transition-transform duration-500 hover:scale-110">
                    <User className="w-12 h-12 text-indigo-200" />
                </div>
                <p className="text-2xl font-black text-slate-900 font-display relative z-10 mb-2 tracking-tight">Zero Registry</p>
                <p className="text-slate-500 font-medium text-base leading-relaxed text-center max-w-sm relative z-10 italic">
                    No records detected in the event orchestration database. Synchronize to re-check.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto scroll-smooth custom-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                    <tr className="bg-slate-50/40 backdrop-blur-3xl sticky top-0 z-20">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display">
                            <div className="flex items-center gap-2">
                                <User className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Student Identity</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display">
                            <div className="flex items-center gap-2">
                                <Hash className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Roll Context</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display">
                            <div className="flex items-center gap-2">
                                <School className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Academic Unit</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display text-center">
                            <div className="flex items-center justify-center gap-2">
                                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Year</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display">
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Contact Vector</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display">
                            <div className="flex items-center gap-2">
                                <Flag className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Event Allocation</span>
                            </div>
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] border-b border-indigo-50/50 font-display text-right">
                            <div className="flex items-center justify-end gap-2">
                                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Timestamp</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-indigo-50/40">
                    {registrations.map((reg, index) => (
                        <tr key={reg._id || index} className="group hover:bg-white transition-all duration-300 relative">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300 ring-4 ring-indigo-50/30">
                                        {reg.studentName?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-base font-bold text-slate-900 leading-tight tracking-tight font-display group-hover:text-indigo-600 transition-colors uppercase">{reg.studentName}</div>
                                        <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.1em] flex items-center gap-1 opacity-80">
                                            ID: {reg._id?.slice(-6).toUpperCase() || 'EXTERNAL'}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-[12px] font-black text-slate-800 font-mono tracking-tighter bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-indigo-100 transition-all duration-300">
                                    {reg.rollNumber}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-[14px] font-bold text-slate-700 tracking-tight">{reg.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                                    Year {reg.year}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer underline decoration-indigo-100 underline-offset-2">
                                        <Mail className="w-3 h-3 text-slate-500" />
                                        <span>{reg.email.toLowerCase()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 tracking-tight">
                                        <Phone className="w-3 h-3 text-slate-400" />
                                        <span>{reg.phone}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="inline-flex items-center px-4 py-1.5 rounded-lg text-[11px] font-black bg-slate-900 text-white shadow-xl shadow-slate-200">
                                    <Flag className="w-2.5 h-2.5 mr-2 text-indigo-400" />
                                    {reg.eventId}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="text-[14px] font-extrabold text-slate-900 font-display tracking-tight">
                                    {new Date(reg.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.1em] mt-0.5 flex items-center justify-end gap-1.5">
                                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                                    {new Date(reg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
