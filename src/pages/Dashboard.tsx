import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuNetwork,
  LuWallet,
  LuTrendingUp,
  LuUsers,
  LuBadgeDollarSign,
  LuCopy,
  LuCheck,
  LuCalendarDays,
  LuHistory,
} from "react-icons/lu";
import { useGetDashboardDataQuery } from "../features/investment/investmentApiSlice";
import Sidebar from "../Component/sideNavbar/Sidebar";
import TreeNode from "./TreeNode";
import { useGetReferralDataQuery } from "../features/referrals/referralApiSlice";

const Dashboard = () => {
  const [copied, setCopied] = useState(false);

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboardDataQuery();
  const { data: userDetails, isLoading: isDetailsLoading } =
    useGetReferralDataQuery();

  const handleCopyCode = () => {
    if (dashboardData?.referralCode) {
      navigator.clipboard.writeText(dashboardData.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isDashboardLoading || isDetailsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const investments = userDetails?.investments || [];
  const referralIncomes = userDetails?.referralIncomes || [];
  const roiHistories = userDetails?.roiHistories || [];
  const referralTree = userDetails?.referralTree || [];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 font-sans selection:bg-blue-600 selection:text-white">
      <Sidebar />

      {/* Main Content: Added pb-24 for mobile bottom nav clearance */}
      <main className="flex-1 p-4 pb-24 md:p-10 md:pb-10 overflow-y-auto relative custom-scrollbar">
        {/* Background Glow */}
        <div className="absolute top-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-100/40 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -z-10"></div>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Welcome back to your secure investment portal.
            </p>
          </div>

          <div className="hidden md:block md:flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Referral Code Box - Now visible and responsive on mobile */}
            <div className="flex justify-between items-center bg-white border border-slate-200/80 rounded-xl p-1.5 shadow-sm w-full sm:w-auto">
              <div className="flex items-center">
                <span className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                  Ref Code:
                </span>
                <span className="font-black text-slate-800 tracking-widest px-1 sm:px-2 text-sm sm:text-base">
                  {dashboardData?.referralCode || "------"}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className={`flex items-center justify-center p-2 rounded-lg transition-all ml-2 ${
                  copied
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                }`}
                title="Copy Referral Code"
              >
                {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
              </button>
            </div>

            <Link
              to={"/new_investment"}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3.5 rounded-xl transition-all shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 hover:-translate-y-0.5 active:scale-95 text-center"
            >
              + New Investment
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="bg-white/80 border border-white/60 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Wallet Balance
              </span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <LuWallet size={18} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              ${dashboardData?.walletBalance?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div className="bg-white/80 border border-white/60 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Active Staked
              </span>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <LuTrendingUp size={18} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              ${dashboardData?.totalInvestedAmount?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div className="bg-white/80 border border-white/60 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Total ROI
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <LuBadgeDollarSign size={18} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              ${dashboardData?.totalRoiEarned?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div className="bg-white/80 border border-white/60 rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-md hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                Level Income
              </span>
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <LuUsers size={18} />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              ${dashboardData?.totalLevelIncomeEarned?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Left Side: Tables */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8" id="history">
            {/* Investments Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden">
              <div className="p-4 md:p-5 border-b border-slate-100 bg-white">
                <h3 className="text-sm md:text-base font-bold text-slate-800">
                  Active & Past Investments
                </h3>
              </div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-slate-200/60 text-[10px] md:text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Plan
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Amount & ROI
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Duration (Start - End)
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
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
                          <td className="py-3 px-4 md:py-4 md:px-5 font-semibold text-slate-800 whitespace-nowrap">
                            {inv.planDetails}
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                            <div className="font-bold text-slate-900">
                              ${inv.investmentAmount?.toLocaleString()}
                            </div>
                            <div className="text-[10px] md:text-[11px] text-emerald-600 font-semibold mt-0.5">
                              {inv.dailyRoiPercentage}% Daily
                            </div>
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <LuCalendarDays size={13} />
                              {new Date(
                                inv.startDate || inv.createdAt,
                              ).toLocaleDateString()}{" "}
                              - {new Date(inv.endDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                            <span
                              className={`px-2 md:px-2.5 py-1 rounded-md text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
                                inv.investmentStatus === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                  : "bg-slate-100 text-slate-500 border border-slate-200/60"
                              }`}
                            >
                              {inv.investmentStatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-10 text-center text-slate-400 text-xs md:text-sm font-medium"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <LuTrendingUp
                              size={24}
                              className="text-slate-300"
                            />
                            <p>No investment active setup yet.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily ROI Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden">
              <div className="p-4 md:p-5 border-b border-slate-100 bg-white">
                <h3 className="text-sm md:text-base font-bold text-slate-800">
                  Daily ROI History
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[250px] md:max-h-[300px] custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[400px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-slate-200/60 text-[10px] md:text-[11px] uppercase tracking-widest text-slate-400 font-bold sticky top-0 z-10">
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Date
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Plan Detail
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Earned Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roiHistories.length > 0 ? (
                      roiHistories.map((roi) => (
                        <tr
                          key={roi._id}
                          className="border-b border-slate-100/70 text-xs md:text-sm text-slate-600 hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-3 px-4 md:py-4 md:px-5 text-slate-500 whitespace-nowrap">
                            {new Date(
                              roi.date || roi.createdAt,
                            ).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 font-medium text-slate-800 whitespace-nowrap">
                            {roi.planName ||
                              roi.planDetails ||
                              "Staking Reward"}
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 font-bold text-emerald-600 whitespace-nowrap">
                            +${(roi.roiAmount || roi.amount || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-10 text-center text-slate-400 text-xs md:text-sm font-medium"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <LuHistory size={24} className="text-slate-300" />
                            <p>No ROI credited yet.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Referral Income Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden">
              <div className="p-4 md:p-5 border-b border-slate-100 bg-white">
                <h3 className="text-sm md:text-base font-bold text-slate-800">
                  Referral Income History
                </h3>
              </div>
              <div className="overflow-x-auto max-h-[250px] md:max-h-[300px] custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-slate-200/60 text-[10px] md:text-[11px] uppercase tracking-widest text-slate-400 font-bold sticky top-0 z-10">
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Date
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        From User
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Level
                      </th>
                      <th className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralIncomes.length > 0 ? (
                      referralIncomes.map((inc) => (
                        <tr
                          key={inc._id}
                          className="border-b border-slate-100/70 text-xs md:text-sm text-slate-600 hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-3 px-4 md:py-4 md:px-5 text-slate-400 whitespace-nowrap">
                            {new Date(inc.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 font-semibold text-slate-800 whitespace-nowrap">
                            {inc.generator?.fullName || "Anonymous Node"}
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 whitespace-nowrap">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                              Lvl {inc.level}
                            </span>
                          </td>
                          <td className="py-3 px-4 md:py-4 md:px-5 font-bold text-emerald-600 whitespace-nowrap">
                            +${(inc.amount || 0).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-10 text-center text-slate-400 text-xs md:text-sm font-medium"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            <LuUsers size={24} className="text-slate-300" />
                            <p>No matrix tier commissions recorded.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side: Network Tree */}
          <div className="xl:col-span-1" id="network">
            <div className="relative bg-white rounded-[2rem] border border-slate-100/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] overflow-hidden xl:sticky xl:top-8 group">
              <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl rounded-full pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"></div>

              <div className="relative z-10 px-5 md:px-7 py-5 md:py-6 border-b border-slate-100/60 bg-white/40 backdrop-blur-md">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-white shadow-[0_2px_10px_rgba(37,99,235,0.1)] shrink-0">
                    <LuNetwork
                      size={20}
                      className="text-blue-600 drop-shadow-sm"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm md:text-[17px] font-black text-slate-900 tracking-tight">
                      Referral Network
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                      <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                      </span>
                      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Live Matrix Tracking
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 p-5 md:p-7">
                {referralTree.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="bg-[#F8FAFC]/60 rounded-xl md:rounded-2xl p-4 md:p-5 border border-slate-100 shadow-sm backdrop-blur-sm mb-4 md:mb-5 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-12 bg-gradient-to-t from-[#F8FAFC] to-transparent z-20"></div>

                      <div className="relative z-10 max-h-[200px] md:max-h-[250px] overflow-hidden">
                        <TreeNode data={referralTree.slice(0, 2)} />
                      </div>
                    </div>

                    <Link
                      to="/referrals"
                      className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 text-xs md:text-sm font-bold py-3 md:py-3.5 rounded-xl border border-slate-200 hover:border-blue-200 transition-all group/btn shadow-sm"
                    >
                      View Full Structure
                      <span className="transition-transform group-hover/btn:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-8 md:py-10 mt-2 md:mt-4">
                    <div className="relative w-20 h-20 md:w-28 md:h-28 mb-4 md:mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-[20px] md:blur-[24px] animate-pulse"></div>

                      <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-xl md:rounded-2xl flex items-center justify-center -rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-110 cursor-pointer">
                        <LuNetwork
                          size={24}
                          className="text-slate-300 md:text-[28px]"
                        />
                      </div>
                    </div>

                    <h4 className="text-base md:text-lg font-black text-slate-800 mb-1.5 md:mb-2 tracking-tight">
                      No Nodes Connected
                    </h4>
                    <p className="text-[11px] md:text-xs font-medium text-slate-400 max-w-[200px] md:max-w-[220px] leading-relaxed">
                      Your network tree is empty. Share your code to see your
                      downline expand in real-time.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
