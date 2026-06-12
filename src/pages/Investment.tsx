import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuTrendingUp,
  LuCalendar,
  LuWallet,
  LuShieldCheck,
  LuActivity,
  LuInbox,
} from "react-icons/lu";

import { useGetDashboardDataQuery } from "../features/investment/investmentApiSlice";
import Sidebar from "../Component/sideNavbar/Sidebar";
import { useGetReferralDataQuery } from "../features/referrals/referralApiSlice";

const History = () => {
  const { data: userDetails, isLoading: isDetailsLoading } =
    useGetReferralDataQuery();
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboardDataQuery();

  if (isDashboardLoading || isDetailsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Loading History...
          </p>
        </div>
      </div>
    );
  }

  const investments = userDetails?.investments || [];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 font-sans selection:bg-blue-600 selection:text-white">
      <Sidebar />

      {/* Main Content: Added pb-24 for mobile bottom nav clearance */}
      <main className="flex-1 p-4 pb-24 md:p-10 md:pb-10 overflow-y-auto relative custom-scrollbar">
        {/* Background Responsive Glow */}
        <div className="absolute top-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-100/40 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Investment History
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                View and track all your active and completed staking
                allocations.
              </p>
            </div>
            <Link
              to={"/new_investment"}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3.5 rounded-xl transition-all shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 hover:-translate-y-0.5 active:scale-95 text-center"
            >
              + New Investment
            </Link>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 md:gap-5"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <LuWallet size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Total Invested
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                  $
                  {dashboardData?.totalInvestedAmount?.toLocaleString() ||
                    "0.00"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 md:gap-5"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <LuActivity size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Active Plans
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                  {dashboardData?.activeInvestmentsCount || 0}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 md:gap-5"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <LuTrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Total ROI Earned
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                  ${dashboardData?.totalRoiEarned?.toLocaleString() || "0.00"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden"
          >
            <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm md:text-base font-bold text-slate-800 flex items-center gap-2">
                <LuShieldCheck className="text-blue-500" size={18} /> All
                Allocations
              </h3>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-slate-200/60 text-[10px] md:text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                    <th className="py-3 px-4 md:py-4 md:px-6 whitespace-nowrap">
                      Date Started
                    </th>
                    <th className="py-3 px-4 md:py-4 md:px-6 whitespace-nowrap">
                      Staking Model
                    </th>
                    <th className="py-3 px-4 md:py-4 md:px-6 whitespace-nowrap">
                      Amount
                    </th>
                    <th className="py-3 px-4 md:py-4 md:px-6 whitespace-nowrap">
                      Daily Return
                    </th>
                    <th className="py-3 px-4 md:py-4 md:px-6 whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {investments.length > 0 ? (
                    investments.map((inv) => (
                      <tr
                        key={inv._id}
                        className="border-b border-slate-100/70 text-xs md:text-sm text-slate-600 hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-4 px-4 md:py-5 md:px-6 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 md:gap-2 text-slate-500">
                            <LuCalendar
                              size={14}
                              className="text-slate-400 shrink-0"
                            />
                            <span className="font-medium text-[11px] md:text-[13px]">
                              {new Date(inv.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 md:py-5 md:px-6 font-bold text-slate-800 whitespace-nowrap">
                          {inv.planDetails}
                        </td>
                        <td className="py-4 px-4 md:py-5 md:px-6 font-black text-slate-900 whitespace-nowrap">
                          ${inv.investmentAmount?.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 md:py-5 md:px-6 font-semibold text-blue-600 whitespace-nowrap">
                          {inv.dailyRoiPercentage}%
                        </td>
                        <td className="py-4 px-4 md:py-5 md:px-6 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1.5 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${
                              inv.investmentStatus === "Active"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}
                          >
                            {inv.investmentStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-16 md:py-20 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                            <LuInbox
                              size={24}
                              className="text-slate-300 md:text-[28px]"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs md:text-sm font-bold text-slate-700 mb-1">
                              No Investments Found
                            </h4>
                            <p className="text-[11px] md:text-xs text-slate-400 font-medium max-w-[200px] md:max-w-none mx-auto">
                              You haven't made any staking allocations yet.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default History;
