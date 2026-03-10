import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Users, Download, Filter, GraduationCap, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import StudentTable from '../components/StudentTable';
import { fetchRegistrations } from '../services/api';

const RegisteredStudents = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [lastRefreshed, setLastRefreshed] = useState(new Date());

    const getRegistrations = async () => {
        try {
            setLoading(true);
            const data = await fetchRegistrations();
            setRegistrations(Array.isArray(data) ? data : []);
            setError(null);
            setLastRefreshed(new Date());
            setLoading(false);
        } catch (err) {
            console.error('Error fetching registrations:', err);
            setError('Failed to load registered students. Please check your connection.');
            setLoading(false);
        }
    };

    useEffect(() => {
        getRegistrations();
    }, []);

    const filteredRegistrations = registrations.filter(reg =>
        reg.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.eventId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50/70 p-4 md:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <div className="max-w-[1500px] mx-auto space-y-6">

                {/* Superior Top Bar - SCALED DOWN */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 glass-morphism p-6 md:p-8 rounded-[1.8rem] border border-white shadow-xl shadow-indigo-100/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-indigo-50/40 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="space-y-3 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 ring-2 ring-indigo-50">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display flex items-center gap-2">
                                    Student Registry <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-black uppercase tracking-widest shadow-sm">Live</span>
                                </h1>
                                <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-lg">
                                    Centralized command for <span className="text-slate-900 font-bold decoration-indigo-200 underline-offset-2 underline">TechNova 2026</span> attendee verification.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 relative z-10">
                        <div className="flex items-center gap-4 bg-white/60 p-3 px-5 rounded-2xl border border-white shadow-sm">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Active Registry</span>
                                <span className="text-xl font-black text-slate-900 leading-tight font-display mt-0.5">
                                    {loading ? '---' : registrations.length}
                                </span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Users className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>

                        <button
                            onClick={getRegistrations}
                            className="group bg-slate-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all hover:translate-y-[-1px] active:translate-y-[0px] hover:shadow-lg hover:shadow-indigo-100/50"
                        >
                            <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                            Sync Pipeline
                        </button>
                    </div>
                </div>

                {/* Major Dashboard Layout */}
                <div className="glass-morphism rounded-[1.8rem] shadow-xl shadow-indigo-200/5 border border-white overflow-hidden flex flex-col min-h-[500px]">

                    {/* Context Controls - SCALED DOWN */}
                    <div className="p-5 lg:p-6 border-b border-indigo-50/50 flex flex-col md:flex-row gap-5 justify-between items-center bg-white/40 backdrop-blur-sm">
                        <div className="flex items-center gap-3 w-full md:w-[400px]">
                            <div className="relative flex-1 group">
                                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search records..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-5 py-3 rounded-xl border border-slate-100 bg-white focus:ring-4 focus:ring-indigo-100/30 focus:border-indigo-600 outline-none transition-all text-sm font-semibold text-slate-700 shadow-sm"
                                />
                            </div>
                            <button className="bg-white p-3 rounded-xl border border-slate-100 text-slate-500 hover:text-indigo-600 hover:border-indigo-600 hover:bg-slate-50 transition-all shadow-sm">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-indigo-50/80 text-indigo-700 px-4 py-2 rounded-full border border-indigo-100 text-[9px] font-black tracking-[0.1em]">
                                <Clock className="w-3 h-3" />
                                Refresh: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all px-2 group">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Table Container with Premium Scroll and States */}
                    <div className="flex-1 relative">
                        {loading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-white/80 backdrop-blur-xl z-10 transition-opacity duration-500">
                                <div className="relative">
                                    <div className="w-24 h-24 border-8 border-slate-50 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <GraduationCap className="w-10 h-10 text-indigo-600 opacity-10" />
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-2xl font-black text-slate-900 font-display">Authorizing Data Stream</p>
                                    <p className="text-slate-400 font-medium animate-pulse tracking-wide italic">Authenticating and retrieving student metadata...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center p-24 text-center">
                                <div className="max-w-xl flex flex-col items-center bg-white p-14 rounded-[3.5rem] border border-rose-100 shadow-[0_32px_64px_-16px_rgba(244,63,94,0.15)] relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-b from-rose-50/30 to-transparent pointer-events-none"></div>
                                    <div className="bg-rose-50 p-6 rounded-[2.5rem] shadow-sm mb-10 ring-8 ring-rose-50/60 relative z-10">
                                        <ShieldCheck className="w-14 h-14 text-rose-600" />
                                    </div>
                                    <p className="text-3xl font-black text-slate-900 mb-4 font-display relative z-10">Handshake Failed</p>
                                    <p className="text-slate-400 font-medium mb-12 leading-relaxed text-lg max-w-sm relative z-10">
                                        We encountered a disruptive event while connecting to the database infrastructure.
                                    </p>
                                    <button
                                        onClick={getRegistrations}
                                        className="w-full py-6 bg-rose-600 text-white rounded-[1.8rem] hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 font-black text-xl active:scale-[0.98] group relative z-10"
                                    >
                                        Restart Engine
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <StudentTable registrations={filteredRegistrations} />
                        )}
                    </div>

                    {/* Superior Bottom Dashboard Indicator */}
                    <div className="p-8 bg-white/60 border-t border-indigo-50/50 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] gap-6">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3 overflow-hidden">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-4 ring-white bg-slate-100 border border-slate-200 flex items-center justify-center text-[8px] text-slate-400 font-black">
                                        ST
                                    </div>
                                ))}
                            </div>
                            <span className="ml-3 italic text-xs normal-case tracking-normal">Proprietary Monitoring Software</span>
                        </div>
                        <div className="flex items-center gap-10">
                            <span className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse"></span>
                                Node-Server Responsive
                            </span>
                            <span className="flex items-center gap-2 group cursor-help">
                                Build 03.10.26
                                <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisteredStudents;
