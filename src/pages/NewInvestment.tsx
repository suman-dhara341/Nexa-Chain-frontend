import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuCheck,
  LuShieldCheck,
  LuInfo,
  LuCalculator,
  LuRocket,
} from "react-icons/lu";
import Sidebar from "../Component/sideNavbar/Sidebar";

import { useCreateInvestmentMutation } from "../features/investment/investmentApiSlice";

const NewInvestment = () => {
  const navigate = useNavigate();

  const [createInvestment, { isLoading }] = useCreateInvestmentMutation();

  const plans = [
    {
      id: "starter",
      name: "Starter Alpha",
      minInvest: 100,
      maxInvest: 999,
      roi: 1.0,
      duration: 30,
      features: [
        "Daily Auto Credit",
        "Level 1 Commissions",
        "Standard Support",
      ],
      color: "text-blue-600",
      bgHover: "hover:border-blue-300",
      activeRing: "ring-2 ring-blue-500 bg-blue-50/30 border-blue-200",
    },
    {
      id: "pro",
      name: "Pro Matrix",
      minInvest: 1000,
      maxInvest: 4999,
      roi: 1.5,
      duration: 60,
      popular: true,
      features: [
        "Enhanced 1.5% Daily ROI",
        "All 3-Level Commissions",
        "Priority Node",
      ],
      color: "text-indigo-600",
      bgHover: "hover:border-indigo-300",
      activeRing: "ring-2 ring-indigo-500 bg-indigo-50/30 border-indigo-200",
    },
    {
      id: "elite",
      name: "Quantum Elite",
      minInvest: 5000,
      maxInvest: 100000,
      roi: 2.0,
      duration: 90,
      features: [
        "Max 2.0% Daily Returns",
        "Full Matrix Multipliers",
        "Dedicated Manager",
      ],
      color: "text-purple-600",
      bgHover: "hover:border-purple-300",
      activeRing: "ring-2 ring-purple-500 bg-purple-50/30 border-purple-200",
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[1]); 
  const [amount, setAmount] = useState(selectedPlan.minInvest.toString());

  const numAmount = parseFloat(amount) || 0;
  const dailyReturn = (numAmount * selectedPlan.roi) / 100;
  const totalReturn = dailyReturn * selectedPlan.duration;

  const isValidAmount =
    numAmount >= selectedPlan.minInvest && numAmount <= selectedPlan.maxInvest;


  const handleInvestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidAmount) return;

    const investmentPayload = {
      investmentAmount: numAmount,
      planDetails: selectedPlan.name,
      dailyRoiPercentage: selectedPlan.roi,
      duration: selectedPlan.duration,
    };

    try {
      await createInvestment(investmentPayload).unwrap();

      alert(`Successfully staked $${numAmount} in ${selectedPlan.name}!`);

      navigate("/investments");
    } catch (error:any) {
      console.error("Investment failed:", error);
      alert(
        error?.data?.message ||
          "Failed to process investment. Please try again.",
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-700 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      <Sidebar  />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <LuRocket className="text-blue-600" /> Deploy Capital
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Select an optimized staking model and enter your allocation amount
              to start earning.
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            <div className="xl:col-span-2 space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                1. Select Staking Model
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {plans.map((plan, idx) => {
                  const isSelected = selectedPlan.id === plan.id;

                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setAmount(plan.minInvest.toString());
                      }}
                      className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                        isSelected
                          ? plan.activeRing
                          : `bg-white border-slate-200/80 shadow-[0_2px_10px_rgb(0,0,0,0.02)] ${plan.bgHover} hover:shadow-md`
                      } ${plan.id === "elite" ? "sm:col-span-2 md:col-span-1 xl:col-span-2" : ""}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 right-6">
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-widest text-[9px] uppercase px-3 py-1.5 rounded-full shadow-sm">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <h3 className="text-lg font-black text-slate-900">
                            {plan.name}
                          </h3>
                          <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-widest">
                            Lock: {plan.duration} Days
                          </p>
                        </div>
                        <div
                          className={`text-3xl font-black tracking-tight ${plan.color}`}
                        >
                          {plan.roi}%{" "}
                          <span className="text-xs text-slate-400 font-bold uppercase">
                            /day
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-6">
                        {plan.features.map((feat, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 text-sm text-slate-600 font-medium"
                          >
                            <div
                              className={`p-1 rounded-full bg-slate-100 ${plan.color}`}
                            >
                              <LuCheck size={12} />
                            </div>
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-500">
                        <span>Min: ${plan.minInvest.toLocaleString()}</span>
                        <span>Max: ${plan.maxInvest.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="xl:col-span-1 sticky top-8"
            >
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                2. Allocation Details
              </h2>

              <form
                onSubmit={handleInvestSubmit}
                className="bg-white border border-slate-200/80 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-6 sm:p-8"
              >
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                    Enter Amount (USD)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-black text-xl">
                        $
                      </span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`w-full pl-10 pr-5 py-4 bg-[#F8FAFC] border-2 rounded-2xl text-2xl font-black text-slate-900 focus:outline-none transition-all ${
                        isValidAmount
                          ? "border-slate-200 focus:border-blue-500 focus:bg-white"
                          : "border-red-300 focus:border-red-500 focus:bg-red-50"
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {!isValidAmount && numAmount > 0 && (
                    <p className="text-[11px] text-red-500 font-bold mt-2 flex items-center gap-1.5">
                      <LuInfo size={14} /> Amount must be between $
                      {selectedPlan.minInvest} and ${selectedPlan.maxInvest}
                    </p>
                  )}
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6 relative overflow-hidden shadow-lg">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="flex items-center gap-2 mb-5 text-blue-400">
                    <LuCalculator size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Live ROI Projection
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-xs text-slate-400 font-medium">
                        Daily Return
                      </span>
                      <span className="text-base font-bold text-emerald-400">
                        +${dailyReturn.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-end">
                      <span className="text-xs text-slate-400 font-medium">
                        Total ROI ({selectedPlan.duration} days)
                      </span>
                      <span className="text-base font-bold text-white">
                        +${totalReturn.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-700/50 flex justify-between items-end">
                    <span className="text-xs text-slate-400 font-medium">
                      Est. Total Payout
                    </span>
                    <span className="text-2xl font-black text-white">
                      $
                      {(numAmount + totalReturn).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isValidAmount || isLoading}
                  className={`w-full flex items-center justify-center gap-2 py-4.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isValidAmount && !isLoading
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-95"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <LuShieldCheck size={18} /> Confirm & Stake Capital
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-5">
                  Secured via Encrypted Ledger
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewInvestment;
