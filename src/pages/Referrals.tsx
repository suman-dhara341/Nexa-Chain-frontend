import { useState } from "react";
import { motion } from "framer-motion";
import { LuCopy, LuCheck, LuUsers, LuNetwork, LuShare2 } from "react-icons/lu";

import Sidebar from "../Component/sideNavbar/Sidebar";
import TreeNode from "./TreeNode";

import {
  useGetReferralDataQuery,
  type ReferralTreeNode,
} from "../features/referrals/referralApiSlice";
import { useGetDashboardDataQuery } from "../features/investment/investmentApiSlice";

const Referrals = () => {
  const [copied, setCopied] = useState(false);

  const { data: referralData, isLoading: isReferralLoading } =
    useGetReferralDataQuery();
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboardDataQuery();

  const userReferralCode =
    dashboardData?.referralCode || referralData?.referralCode;

  const handleCopyCode = () => {
    if (userReferralCode) {
      navigator.clipboard.writeText(userReferralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateTotalDownline = (
    nodes: ReferralTreeNode[] | undefined,
  ): number => {
    if (!nodes || nodes.length === 0) return 0;

    return nodes.reduce((total: number, node: ReferralTreeNode) => {
      return total + 1 + calculateTotalDownline(node.downline);
    }, 0);
  };

  const totalDownline = calculateTotalDownline(referralData?.referralTree);

  if (isReferralLoading || isDashboardLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Loading Network...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 font-sans selection:bg-blue-600 selection:text-white">
      <Sidebar />

      {/* Main Content: Added pb-24 for mobile bottom nav clearance */}
      <main className="flex-1 p-4 pb-24 md:p-10 md:pb-10 overflow-y-auto relative">
        {/* Responsive Background Glow */}
        <div className="absolute top-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-100/30 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Referral Hub
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
              Share your unique code to build your network and earn passive ROI
              commissions.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Referral Code Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-5 md:p-8 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <LuShare2 className="text-blue-500" size={18} />
                <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-800">
                  Your Referral Code
                </h2>
              </div>

              <p className="text-slate-500 text-xs md:text-sm mb-4 md:mb-5">
                Earnings from your downline structure flow up the chain
                automatically on every ROI day.
              </p>

              <div className="flex flex-row items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-1.5 md:p-2 max-w-md transition-colors hover:border-slate-300">
                <span className="text-lg md:text-2xl font-black tracking-widest text-slate-900 pl-3 md:pl-4 py-1 truncate">
                  {userReferralCode || "------"}
                </span>

                <button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-bold text-[11px] md:text-xs transition-all duration-200 shrink-0 ${
                    copied
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-white text-slate-700 border border-slate-200 shadow-sm hover:shadow hover:bg-slate-50"
                  }`}
                >
                  {copied ? (
                    <>
                      <LuCheck size={14} className="text-emerald-600" /> Copied
                    </>
                  ) : (
                    <>
                      <LuCopy size={14} className="text-slate-500" /> Copy
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Network Performance Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="md:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 shadow-lg relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-blue-500/20 blur-[30px] md:blur-[40px] rounded-full pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <LuUsers className="text-indigo-400" size={16} />
                  <h2 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Network Performance
                  </h2>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-black text-white leading-none">
                    {totalDownline}
                  </span>
                  <span className="text-slate-400 text-xs md:text-sm font-medium">
                    Nodes
                  </span>
                </div>

                <p className="text-slate-500 text-[10px] md:text-xs font-medium mt-3 border-t border-slate-800 pt-3">
                  Tracking up to 3 levels deep
                </p>
              </div>
            </motion.div>
          </div>

          {/* Downline Structure Tree */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col"
          >
            <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-2xl">
              <h3 className="text-sm md:text-base font-bold text-slate-800 flex items-center gap-2">
                <LuNetwork className="text-blue-500" size={18} /> Downline
                Structure
              </h3>
            </div>

            <div className="p-4 md:p-6 min-h-[300px] md:min-h-[350px] flex flex-col">
              {totalDownline > 0 ? (
                <div className="flex-1 overflow-x-auto custom-scrollbar pr-2 md:pr-4">
                  <div className="min-w-max">
                    <TreeNode data={referralData?.referralTree || []} />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                    <LuUsers
                      size={20}
                      className="text-slate-300 md:text-[24px]"
                    />
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-slate-700 mb-1">
                    No referrals yet
                  </h4>
                  <p className="text-slate-500 text-[11px] md:text-xs max-w-[200px] md:max-w-[250px] mx-auto leading-relaxed">
                    Share your code to grow your network and start viewing your
                    downline here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Referrals;
