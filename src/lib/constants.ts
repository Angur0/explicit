import {
  LayoutDashboard,
  Calendar,
  User,
  Newspaper,
  CalendarPlus,
  ScanLine,
  Users,
  Upload,
  BarChart2,
  Settings,
  Shield,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Squads",
    href: "/dashboard/guilds",
    icon: Shield,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Event Management",
    href: "/dashboard/manage-events",
    icon: CalendarPlus,
  },
  {
    title: "Attendance Scanner",
    href: "/dashboard/scanner",
    icon: ScanLine,
  },
  {
    title: "News Management",
    href: "/dashboard/manage-news",
    icon: Newspaper,
  },
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Bulk Import",
    href: "/dashboard/import",
    icon: Upload,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
];
