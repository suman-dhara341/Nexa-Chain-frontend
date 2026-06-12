import { Link } from "react-router-dom";
import { LuCpu } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md fixed w-full top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-md shadow-blue-600/10 group-hover:scale-105 transition-transform">
            <LuCpu className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Nexa <span className="text-blue-600">Chain</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4.5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
