"use client";

import { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  X,
  Eye,
  EyeOff,
  Search,
  Users,
  TrendingUp,
  Calendar,
  Target,
  ChevronRight,
  LogOut,
  Clock,
  Phone,
  User,
  Briefcase,
  Dumbbell,
  IndianRupee,
  MessageSquare,
  Star,
  CheckSquare,
  RotateCcw,
  Activity,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Application {
  id: string;
  name: string;
  whatsapp: string;
  ageHeightWeight: string;
  profession: string;
  startTimeline: string;
  goals: string[];
  previousTraining: string;
  fallOffReason: string;
  workoutTime: string;
  transformationGoal: string;
  seriousness: string;
  investment: string;
  fitnessStruggle: string;
  submittedAt: Timestamp | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: Timestamp | null): string {
  if (!ts) return "-";
  return ts.toDate().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(ts: Timestamp | null): string {
  if (!ts) return "-";
  const seconds = Math.floor((Date.now() - ts.toDate().getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(ts);
}

function seriousnessColor(score: string): string {
  const n = parseInt(score, 10);
  if (n >= 8) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (n >= 5) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-600 border-red-200";
}

function investmentBadge(inv: string): string {
  if (inv.includes("35,000+")) return "bg-purple-50 text-purple-700 border-purple-200";
  if (inv.includes("20,000")) return "bg-blue-50 text-blue-700 border-blue-200";
  if (inv.includes("12,000")) return "bg-sky-50 text-sky-700 border-sky-200";
  return "bg-gray-100 text-gray-500 border-gray-200";
}

function isThisWeek(ts: Timestamp | null): boolean {
  if (!ts) return false;
  const now = Date.now();
  return now - ts.toDate().getTime() < 7 * 24 * 60 * 60 * 1000;
}

// ─── Password Gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin123";
    if (pw === correct) {
      localStorage.setItem("cbs_admin", "1");
      onUnlock();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#111111] mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#111111]">Admin Access</h1>
          <p className="text-sm text-[#666666] mt-1">Coached by Shweta - Applications</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e8e8e8] p-6 shadow-sm space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] transition ${
                error ? "border-red-400 bg-red-50" : "border-[#e8e8e8]"
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999]"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500">Incorrect password. Try again.</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#111111] text-white text-sm font-medium hover:bg-[#333] transition"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Detail Panel ──────────────────────────────────────────────────────────────

function DetailPanel({ app, onClose }: { app: Application; onClose: () => void }) {
  const Field = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | string[] }) => (
    <div className="py-4 border-b border-[#f0f0f0] last:border-0">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={13} className="text-[#d4a8a4] flex-shrink-0" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#999]">{label}</span>
      </div>
      {Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {value.map((v) => (
            <span key={v} className="text-xs px-2.5 py-1 rounded-full bg-[#f2e8e7] text-[#d4a8a4] font-medium">
              {v}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#111111] leading-relaxed">{value || "-"}</p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8e8e8] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="font-heading text-xl font-bold text-[#111111]">{app.name}</h2>
            <p className="text-xs text-[#999] mt-0.5">{formatDate(app.submittedAt)}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#f5f5f5] transition">
            <X size={18} className="text-[#666]" />
          </button>
        </div>

        {/* Quick badges */}
        <div className="px-6 py-4 flex flex-wrap gap-2 border-b border-[#f0f0f0]">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${seriousnessColor(app.seriousness)}`}>
            Seriousness: {app.seriousness}/10
          </span>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${investmentBadge(app.investment)}`}>
            {app.investment}
          </span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#fafaf8] border border-[#e8e8e8] text-[#555]">
            {app.startTimeline}
          </span>
        </div>

        {/* Fields */}
        <div className="px-6 py-2 flex-1">
          <Field icon={User}          label="Full Name"                 value={app.name} />
          <Field icon={Phone}         label="WhatsApp Number"           value={app.whatsapp} />
          <Field icon={Activity}      label="Age / Height / Weight"     value={app.ageHeightWeight} />
          <Field icon={Briefcase}     label="Profession & Daily Routine" value={app.profession} />
          <Field icon={Calendar}      label="Start Timeline"            value={app.startTimeline} />
          <Field icon={Target}        label="Main Goals"                value={app.goals} />
          <Field icon={CheckSquare}   label="Previous Online Training"  value={app.previousTraining} />
          <Field icon={RotateCcw}     label="Reason for Falling Off"    value={app.fallOffReason} />
          <Field icon={Clock}         label="Preferred Workout Time"    value={app.workoutTime} />
          <Field icon={TrendingUp}    label="3–6 Month Transformation Goal" value={app.transformationGoal} />
          <Field icon={Star}          label="Seriousness (1–10)"        value={`${app.seriousness} / 10`} />
          <Field icon={IndianRupee}   label="Investment Range"          value={app.investment} />
          <Field icon={MessageSquare} label="Biggest Fitness Struggle"  value={app.fitnessStruggle} />
        </div>

        {/* Footer action */}
        <div className="sticky bottom-0 bg-white border-t border-[#e8e8e8] px-6 py-4">
          <a
            href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe59] transition"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Application Card ──────────────────────────────────────────────────────────

function AppCard({ app, onClick }: { app: Application; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-[#e8e8e8] rounded-2xl p-5 hover:border-[#d4a8a4] hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Name + time */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#f2e8e7] flex items-center justify-center text-xs font-bold text-[#d4a8a4] flex-shrink-0">
              {app.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-heading text-base font-semibold text-[#111111] leading-tight truncate">
                {app.name}
              </p>
              <p className="text-xs text-[#999]">{timeAgo(app.submittedAt)}</p>
            </div>
          </div>

          {/* WhatsApp */}
          <p className="text-xs text-[#666] mt-2 mb-3">{app.whatsapp}</p>

          {/* Goals pills */}
          <div className="flex flex-wrap gap-1">
            {app.goals.slice(0, 3).map((g) => (
              <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-[#fafaf8] border border-[#e8e8e8] text-[#555]">
                {g}
              </span>
            ))}
            {app.goals.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#fafaf8] border border-[#e8e8e8] text-[#999]">
                +{app.goals.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Right: badges */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${seriousnessColor(app.seriousness)}`}>
            {app.seriousness}/10
          </span>
          <ChevronRight size={16} className="text-[#ccc] group-hover:text-[#d4a8a4] transition mt-1" />
        </div>
      </div>

      {/* Investment strip */}
      <div className={`mt-3 pt-3 border-t border-[#f5f5f5] flex items-center justify-between`}>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${investmentBadge(app.investment)}`}>
          {app.investment}
        </span>
        <span className="text-xs text-[#aaa]">{app.startTimeline}</span>
      </div>
    </button>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Application | null>(null);
  const [search, setSearch] = useState("");
  const [filterGoal, setFilterGoal] = useState("All");

  // Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, "applications"), orderBy("submittedAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setApps(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Application))
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Stats
  const stats = useMemo(() => {
    const total = apps.length;
    const thisWeek = apps.filter((a) => isThisWeek(a.submittedAt)).length;
    const avgSeriousness =
      apps.length > 0
        ? (apps.reduce((sum, a) => sum + (parseInt(a.seriousness, 10) || 0), 0) / apps.length).toFixed(1)
        : "-";
    const readyNow = apps.filter((a) =>
      a.startTimeline?.toLowerCase().includes("immediately")
    ).length;
    return { total, thisWeek, avgSeriousness, readyNow };
  }, [apps]);

  // All unique goals for filter
  const allGoals = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((a) => a.goals?.forEach((g) => set.add(g)));
    return ["All", ...Array.from(set)];
  }, [apps]);

  // Filtered apps
  const filtered = useMemo(() => {
    return apps.filter((a) => {
      const matchSearch =
        !search ||
        a.name?.toLowerCase().includes(search.toLowerCase()) ||
        a.whatsapp?.includes(search);
      const matchGoal =
        filterGoal === "All" || a.goals?.includes(filterGoal);
      return matchSearch && matchGoal;
    });
  }, [apps, search, filterGoal]);

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e8e8e8]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-base font-bold text-[#111111]">Applications</span>
            <span className="text-xs font-semibold bg-[#111111] text-white px-2 py-0.5 rounded-full">
              {stats.total}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#999] hidden sm:block">@CoachedbyShweta</span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#111] transition"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users,     label: "Total Applications", value: stats.total,          sub: "All time" },
            { icon: Calendar,  label: "This Week",          value: stats.thisWeek,        sub: "Last 7 days" },
            { icon: Star,      label: "Avg Seriousness",    value: stats.avgSeriousness,  sub: "Out of 10" },
            { icon: Dumbbell,  label: "Ready to Start",     value: stats.readyNow,        sub: "Immediately" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#e8e8e8] p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#999] uppercase tracking-wider">{label}</span>
                <div className="w-8 h-8 rounded-xl bg-[#f2e8e7] flex items-center justify-center">
                  <Icon size={14} className="text-[#d4a8a4]" />
                </div>
              </div>
              <p className="font-heading text-3xl font-bold text-[#111111]">{value}</p>
              <p className="text-xs text-[#aaa] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#aaa]" />
            <input
              type="text"
              placeholder="Search by name or number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8e8e8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {allGoals.map((g) => (
              <button
                key={g}
                onClick={() => setFilterGoal(g)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${
                  filterGoal === g
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#666] border-[#e8e8e8] hover:border-[#111111]"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Applications grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-[#aaa] text-sm">
            Loading applications…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Users size={32} className="text-[#e8e8e8] mb-3" />
            <p className="text-[#aaa] text-sm">
              {apps.length === 0 ? "No applications yet." : "No results match your search."}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} onClick={() => setSelected(app)} />
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel app={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

// ─── Root Export ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cbs_admin") === "1") setUnlocked(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cbs_admin");
    setUnlocked(false);
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}
