import { LuUser } from "react-icons/lu";
import type { ReferralTreeNode } from "../features/referrals/referralApiSlice";
interface TreeNodeProps {
  data: ReferralTreeNode[];
}

const TreeNode: React.FC<TreeNodeProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const getLevelStyles = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-50/80 border-blue-200/80 shadow-blue-500/5";
      case 2:
        return "bg-indigo-50/80 border-indigo-200/80 shadow-indigo-500/5";
      case 3:
        return "bg-purple-50/80 border-purple-200/80 shadow-purple-500/5";
      default:
        return "bg-slate-50 border-slate-200 shadow-slate-500/5";
    }
  };

  const getBadgeStyles = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case 2:
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case 3:
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-200 text-slate-700 border-slate-300";
    }
  };

  return (
    <ul className="relative pl-0 sm:pl-4 space-y-4">
      {data.map((node, index: number) => (
        <li key={node._id || index} className="relative pl-6 sm:pl-8">
          <div className="absolute left-0 top-0 bottom-[-16px] w-[2px] bg-slate-200"></div>
          <div className="absolute left-0 top-6 w-6 sm:w-8 h-[2px] bg-slate-200"></div>

          <div
            className={`relative z-10 p-3 sm:p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-md max-w-full overflow-hidden ${getLevelStyles(
              node.level,
            )}`}
          >
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/60 border border-white shadow-sm items-center justify-center shrink-0">
                <LuUser size={18} className="text-slate-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-bold text-slate-800 truncate">
                    {node.fullName || "Anonymous User"}
                  </h4>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeStyles(
                      node.level,
                    )}`}
                  >
                    Level {node.level}
                  </span>
                </div>

                <p
                  className="text-xs font-medium text-slate-500 truncate block w-full"
                  title={node.email}
                >
                  {node.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          {node.downline && node.downline.length > 0 && (
            <div className="mt-4">
              <TreeNode data={node.downline} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TreeNode;
