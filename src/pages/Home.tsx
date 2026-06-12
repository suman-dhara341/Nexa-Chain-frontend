import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import {
  LuArrowRight,
  LuCheck,
  LuUserPlus,
  LuChevronRight,
  LuSparkles,
  LuChevronDown,
  LuActivity,
  LuGlobe,
  LuUserCheck,
  LuAward,
  LuBox,
  LuShieldCheck,
} from "react-icons/lu";
import Navbar from "./Navbar";


type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatComma?: boolean;
}


const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatComma = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);

  const display = useTransform(count, (latest: number | string) => {
    const numericValue =
      typeof latest === "string" ? parseFloat(latest) : latest;

    let val = isNaN(numericValue) ? "0" : numericValue.toFixed(decimals);

    if (formatComma) {
      val = Number(val).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    return `${prefix}${val}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [inView, count, to, duration]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left py-5 text-slate-800 hover:text-blue-600 font-bold text-[15px] transition-colors group"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 group-hover:text-blue-500 transition-colors"
        >
          <LuChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 text-[14px] leading-relaxed pb-5 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const Home = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter Alpha",
      minInvest: "100",
      roi: "1.0%",
      duration: "30 Days",
      features: [
        "Daily Auto Credit",
        "Level 1 Commissions Eligible",
        "24/7 Node Security",
      ],
      popular: false,
      accent:
        "border-slate-200/60 bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
    },
    {
      name: "Pro Matrix",
      minInvest: "1,000",
      roi: "1.5%",
      duration: "60 Days",
      features: [
        "Enhanced 1.5% Daily ROI",
        "All 3-Level Commission Tiers",
        "Priority Withdrawal Node",
        "Exclusive Community Access",
      ],
      popular: true,
      accent:
        "border-blue-200/80 bg-gradient-to-b from-blue-50/40 via-white/80 to-white/90 backdrop-blur-xl shadow-[0_20px_40px_rgba(37,99,235,0.06)] ring-1 ring-blue-500/10 transform md:scale-[1.03] z-10",
    },
    {
      name: "Quantum Elite",
      minInvest: "5,000",
      roi: "2.0%",
      duration: "90 Days",
      features: [
        "Max 2.0% Daily Returns",
        "Full Network Matrix Multipliers",
        "Dedicated Account Manager",
        "Early Access to Future Tokens",
      ],
      popular: false,
      accent:
        "border-slate-200/60 bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]",
    },
  ];

  const faqs = [
    {
      question: "How is the daily ROI calculated and credited?",
      answer:
        "Our smart system runs automated processes at exactly 12:00 AM everyday. It checks your active staking parameters and securely adds your precise returns to your wallet balance without any duplicate risk.",
    },
    {
      question: "What are the requirements for level commission unlocks?",
      answer:
        "Level 1 commission (5%) is unlocked immediately upon registration. To activate Level 2 (3%) and Level 3 (2%) network structures, you must maintain a Pro Matrix or Quantum Elite active staking node allocation.",
    },
    {
      question: "Is there a lock-in period for my staking deposit?",
      answer:
        "Yes, deposits are bound to node lock-up terms (30, 60, or 90 days depending on the selected staking model). Upon completion of the term duration, the principal allocation is instantly released back to your liquid wallet balance.",
    },
    {
      question: "Can I manage multiple staking pools simultaneously?",
      answer:
        "Absolutely. Your Nexa Chain dashboard allows you to launch and monitor multiple independent investment allocations across different yield models in parallel.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <header className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100/80 text-blue-600 text-[11px] font-black rounded-full uppercase tracking-widest mb-8 shadow-sm cursor-default"
        >
          <LuSparkles size={14} className="text-blue-500" />
          Nexa Chain V2.0 is Live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12] mb-6"
        >
          The Intelligent Ecosystem for <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Automulated Wealth Growth
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[16px] sm:text-[18px] text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12"
        >
          Maximize your passive crypto yielding. Connect seamlessly with secure,
          verified multi-level ledger structures calculating clean daily rewards
          autonomously.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-28"
        >
          <Link
            to="/signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/20 text-white text-[15px] font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5"
          >
            Start Staking Now <LuArrowRight size={18} />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 text-[15px] font-bold px-8 py-4 rounded-2xl transition-all shadow-sm hover:shadow-md"
          >
            Explore Dashboard{" "}
            <LuChevronRight size={18} className="text-slate-400" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.4,
                staggerChildren: 0.1,
              },
            },
          }}
          className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.04)] grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-left"
        >
          {[
            {
              label: "Platform Status",
              value: 99.98,
              dec: 2,
              suff: "%",
              icon: LuActivity,
              color: "text-blue-600 bg-blue-50 border-blue-100",
              sub: "Uptime Node Guarantee",
            },
            {
              label: "Total Staked",
              value: 46.8,
              dec: 1,
              pref: "$",
              suff: "M+",
              icon: LuGlobe,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100",
              sub: "Active TVL Locked",
            },
            {
              label: "Verified Nodes",
              value: 12450,
              dec: 0,
              suff: "+",
              comma: true,
              icon: LuUserCheck,
              color: "text-purple-600 bg-purple-50 border-purple-100",
              sub: "Global Active Accounts",
            },
            {
              label: "ROI Payouts",
              value: 3.1,
              dec: 1,
              pref: "$",
              suff: "M+",
              icon: LuAward,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
              sub: "Distributed Successfully",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`p-4 ${i > 0 ? "border-t-0 border-l-0 md:border-l border-slate-100" : ""}`}
            >
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-2 ${stat.color}`}
              >
                <stat.icon size={12} /> {stat.label}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                <AnimatedCounter
                  to={stat.value}
                  decimals={stat.dec}
                  prefix={stat.pref}
                  suffix={stat.suff}
                  formatComma={stat.comma}
                  duration={2}
                />
              </p>
              <p className="text-[12px] text-slate-400 mt-1 font-semibold">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </header>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="bg-white border-y border-slate-100 relative overflow-hidden py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              Onboarding Process
            </h2>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              Start Earning In 3 Simple Steps
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-[44px] left-[16.66%] w-[66.66%] h-px border-t-2 border-dashed border-slate-200 z-0"></div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "66.66%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="hidden md:block absolute top-[44px] left-[16.66%] h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-0 origin-left"
            ></motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  title: "Register Node",
                  desc: "Create your account securely with double encrypted parameters. Input an uplink referral code if invited.",
                  icon: LuUserPlus,
                },
                {
                  title: "Deploy Allocation",
                  desc: "Choose your ideal custom pool tier staking plan. Fund using safe deposit systems to trigger immediate nodes.",
                  icon: LuBox,
                },
                {
                  title: "Harvest & Multiply",
                  desc: "Collect verified precise ledger payouts directly into your wallet. Share your unique code to build your team tree.",
                  icon: LuAward,
                },
              ].map((step, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: sIdx * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-[88px] h-[88px] bg-white rounded-[1.8rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-center mb-8 mx-auto z-10 group-hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] group-hover:-translate-y-0.5 transition-all duration-300">
                    <step.icon size={28} className="text-blue-600" />
                    <div className="absolute -top-1.5 -right-1.5 w-[26px] h-[26px] bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-[11px] font-black flex items-center justify-center rounded-full shadow-md border-2 border-white">
                      {sIdx + 1}
                    </div>
                  </div>
                  <h3 className="text-[19px] font-black text-slate-900 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-[14px] font-medium leading-relaxed max-w-[260px] mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Staking Models
          </h2>
          <p className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            Optimized High-Yield Plans
          </p>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px] font-medium leading-relaxed">
            Select a plan best suited to your profile. All metrics are natively
            handled inside secure server operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative flex flex-col justify-between p-8 rounded-[2rem] border transition-all duration-300 min-h-[480px] ${plan.accent}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black tracking-wider text-[9px] uppercase px-4 py-1.5 rounded-full shadow-md shadow-blue-500/20">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-[17px] font-black text-slate-800 tracking-tight mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-[40px] font-black text-slate-900 tracking-tight leading-none">
                    {plan.roi}
                  </span>
                  <span className="text-slate-400 font-bold text-[12px] mb-1">
                    / daily
                  </span>
                </div>

                <div className="space-y-4 py-4 border-y border-slate-100 mb-6">
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-slate-400 font-semibold">
                      Min. Deposit
                    </span>
                    <span className="font-extrabold text-slate-800">
                      ${plan.minInvest}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[14px]">
                    <span className="text-slate-400 font-semibold">
                      Duration
                    </span>
                    <span className="font-extrabold text-slate-800">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <LuCheck
                        className="text-blue-600 shrink-0 mt-0.5"
                        size={16}
                      />
                      <span className="text-[13.5px] text-slate-600 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/signup"
                className={`w-full text-center py-3.5 rounded-2xl font-bold text-[14px] transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20 text-white"
                    : "bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200/60"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-blue-500/15 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-lg relative z-10 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] font-bold rounded-full uppercase tracking-widest mb-5">
                <LuShieldCheck size={12} /> Network Rewards
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
                Earn Dynamic 3-Level Commissions
              </h2>
              <p className="text-slate-400 text-[15px] font-medium leading-relaxed mb-8">
                Invite your team network and receive scalable income streams
                directly tracked through multi-tier matrix filters.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                {[
                  { rate: "5%", lvl: "Level 1", color: "text-blue-400" },
                  { rate: "3%", lvl: "Level 2", color: "text-indigo-400" },
                  { rate: "2%", lvl: "Level 3", color: "text-purple-400" },
                ].map((tier, tIdx) => (
                  <div key={tIdx}>
                    <p className={`text-3xl font-black mb-0.5 ${tier.color}`}>
                      {tier.rate}
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      {tier.lvl}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0 relative z-10">
              <Link
                to="/signup"
                className="w-full lg:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 text-[15px] font-bold px-8 py-4 rounded-2xl transition-all shadow-xl group"
              >
                Generate Referral Code{" "}
                <LuArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] border-t border-slate-100 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Support Matrix
            </h2>
            <p className="text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200/60 rounded-[2rem] px-6 py-4 shadow-sm"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqIndex === index}
                onClick={() =>
                  setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
              />
            ))}
          </motion.div>
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white border-t border-slate-200 py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-slate-400 font-semibold">
          <p>
            © {new Date().getFullYear()} Nexa Chain Ecosystem. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
