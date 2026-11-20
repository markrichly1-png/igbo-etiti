"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  Users,
  MessageCircle,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Image,
  Newspaper,
  ReceiptText,
} from "lucide-react";
import {
  adminApi,
  formatPaymentStatus,
  formatVerificationStatus,
  getAdminToken,
} from "@/lib/api/adminApi";

interface DashboardStats {
  totalApplications: number;
  pendingPayments: number;
  successfulPayments: number;
  staffCount: number;
  recentActivities: { id: string; type: string; description: string; timestamp: string }[];
  recentApplications: {
    id: string;
    refNumber: string;
    paymentStatus: string;
    verificationStatus: string;
    createdAt: string;
    applicant?: { fullName?: string | null };
    serviceConfig?: { name?: string; serviceType?: string };
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    adminApi
      .getDashboardStats(token)
      .then((res) => (res.success ? setStats(res.data) : setError("Could not load dashboard data")))
      .catch(() => setError("Failed to load dashboard from server"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-36 rounded-2xl bg-muted" />)}
      </div>
    );
  if (error || !stats)
    return (
      <p className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-destructive">
        {error || "No data available"}
      </p>
    );

  const statCards = [
    { title: "Applications", value: stats.totalApplications, detail: "All submitted requests", icon: FileText, tone: "bg-[#eef5ff] text-[#315da8]" },
    { title: "Pending payments", value: stats.pendingPayments, detail: "Awaiting confirmation", icon: Clock, tone: "bg-[#fff7e6] text-[#9a6417]" },
    { title: "Successful payments", value: stats.successfulPayments, detail: "Completed transactions", icon: CheckCircle2, tone: "bg-[#edf8ef] text-[#3d7450]" },
    { title: "Staff members", value: stats.staffCount, detail: "Active directory entries", icon: Users, tone: "bg-[#f3efff] text-[#69509a]" },
  ];

  return (
    <div className="space-y-7 pb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">Control centre</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Good day, Administrator</h1>
          <p className="mt-2 text-sm text-foreground/60">Here is what is happening across Igbo-Etiti services today.</p>
        </div>
        <Button asChild className="h-11 rounded-xl px-5 shadow-sm">
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Create news post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden rounded-2xl border-0 shadow-[0_10px_35px_rgba(30,41,59,.06)]">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-foreground/25" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-foreground/45">{stat.title}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-xs text-foreground/55">{stat.detail}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
        <Card className="rounded-2xl border-border/70 shadow-[0_10px_35px_rgba(30,41,59,.05)]">
          <CardHeader className="flex-row items-center justify-between border-b px-5 py-4">
            <div>
              <CardTitle className="text-base">Recent applications</CardTitle>
              <p className="mt-1 text-xs text-foreground/55">Latest requests from citizens</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/applications">
                View all <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentApplications.length === 0 ? (
              <p className="p-6 text-sm text-foreground/60">No recent applications.</p>
            ) : (
              <div className="divide-y divide-border/70">
                {stats.recentApplications.slice(0, 6).map((app) => {
                  const payment = formatPaymentStatus(app.paymentStatus);
                  const verification = formatVerificationStatus(app.verificationStatus);
                  return (
                    <div key={app.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_150px_120px] sm:items-center">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{app.applicant?.fullName || "Unknown applicant"}</p>
                        <p className="mt-1 truncate text-xs text-foreground/55">
                          {app.serviceConfig?.name || app.serviceConfig?.serviceType || "Local government service"}
                        </p>
                      </div>
                      <Badge variant="secondary" className={`w-fit capitalize ${payment === "successful" ? "bg-green-100 text-green-700" : payment === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                        {payment}
                      </Badge>
                      <p className="text-xs text-foreground/55 sm:text-right">{new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70 shadow-[0_10px_35px_rgba(30,41,59,.05)]">
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="text-base">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 p-3">
            {[
              { label: "Applications", href: "/admin/applications", icon: FileText },
              { label: "Payments", href: "/admin/payments", icon: ReceiptText },
              { label: "News posts", href: "/admin/posts", icon: Newspaper },
              { label: "Media gallery", href: "/admin/gallery", icon: Image },
              { label: "Staff directory", href: "/admin/staff", icon: Users },
              { label: "Messages", href: "/admin/messages", icon: MessageCircle },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">{action.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-foreground/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {stats.recentActivities.length > 0 && (
        <Card className="rounded-2xl border-border/70">
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-3">
            {stats.recentActivities.slice(0, 6).map((activity) => (
              <div key={`${activity.type}-${activity.id}`} className="rounded-xl border border-border/70 p-4">
                <p className="line-clamp-2 text-sm font-medium">{activity.description}</p>
                <p className="mt-2 text-xs text-foreground/50">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
