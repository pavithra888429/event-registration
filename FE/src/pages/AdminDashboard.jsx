import React, { useState, useEffect } from 'react';
import { Users, Search, Download, ShieldCheck } from 'lucide-react';
// import api from '../services/api'; // Commented out until BE is ready

// Dummy Data for UI Development
const MOCK_REGISTRATIONS = [
  { id: 1, name: "Rahul Kumar", rollNumber: "21CS101", department: "CSE", year: "3", email: "rahul@college.edu", phone: "9876543210", date: "2026-04-01T10:00:00Z" },
  { id: 2, name: "Priya Sharma", rollNumber: "22IT045", department: "IT", year: "2", email: "priya.s@college.edu", phone: "8765432109", date: "2026-04-01T10:15:22Z" },
  { id: 3, name: "Arun Patel", rollNumber: "20ME012", department: "MECH", year: "4", email: "arun.p@college.edu", phone: "7654321098", date: "2026-04-01T11:05:10Z" },
  { id: 4, name: "Pavithra K", rollNumber: "22BCA099", department: "BCA", year: "2", email: "pavithra@college.edu", phone: "9988776655", date: "2026-04-02T09:30:00Z" },
  { id: 5, name: "Nitin Reddy", rollNumber: "23EC201", department: "ECE", year: "1", email: "nitin.r@college.edu", phone: "8877665544", date: "2026-04-02T14:20:45Z" },
];

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    setTimeout(() => {
      setRegistrations(MOCK_REGISTRATIONS);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredData = registrations.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <p className="text-slate-500">Manage and view all registered students for TechNova 2026.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-3 flex items-center gap-3">
            <Users className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Registrations</p>
              <p className="text-xl font-bold text-slate-800">{registrations.length}</p>
            </div>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200 h-full">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Registration Data</h2>
          
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, roll number, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Roll No.</th>
                <th className="px-6 py-4 font-medium">Dept / Year</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Registration Date</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                      <p>Loading registrations...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                    No registrations found matching your search.
                  </td>
                </tr>
              ) : (
                filteredData.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{student.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-sm font-medium border border-slate-200">
                        {student.rollNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800 font-medium">{student.department}</div>
                      <div className="text-slate-500 text-sm">Year {student.year}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-800 text-sm">{student.email}</div>
                      <div className="text-slate-500 text-sm">{student.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        {new Date(student.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(student.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Static for UI) */}
        {!isLoading && filteredData.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
            <div>Showing {filteredData.length} of {registrations.length} total registrations</div>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">Previous</button>
              <button disabled className="px-3 py-1 rounded-md border border-slate-200 text-slate-400 cursor-not-allowed">Next</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
