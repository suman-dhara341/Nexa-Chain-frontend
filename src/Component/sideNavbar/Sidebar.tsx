import { NavLink, useNavigate } from "react-router-dom";
import {
  LuLogOut,
  LuLayoutDashboard,
  LuTrendingUp,
  LuUsers,
  LuCpu,
} from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
    { name: "Investments", path: "/investments", icon: LuTrendingUp },
    { name: "Referrals", path: "/referrals", icon: LuUsers },
  ];

  return (
    <>
      
      <aside className="w-64 bg-white border-r border-slate-100 flex-col hidden md:flex z-10 shadow-[4px_0_24px_rgb(0,0,0,0.01)] h-screen sticky top-0">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg shadow-sm">
            <LuCpu className="text-white" size={18} />
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">
            Nexa <span className="text-blue-600">Chain</span>
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            <LuLogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 flex md:hidden justify-around items-center z-50 px-2 py-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 flex-1 py-1 relative transition-all duration-300 ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
                >
                  <item.icon size={20} />
                </div>

                <span className="text-[10px] font-bold tracking-tight select-none">
                  {item.name}
                </span>

                {isActive && (
                  <span className="absolute bottom-[-4px] w-1 h-1 bg-blue-600 rounded-full animate-pulse"></span>
                )}
              </>
            )}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 flex-1 py-1 text-slate-400 hover:text-rose-600 transition-all duration-300"
        >
          <div>
            <LuLogOut size={20} />
          </div>
          <span className="text-[10px] font-bold tracking-tight select-none">
            Logout
          </span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
