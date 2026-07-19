'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  FileText,
  MessageSquare,
  Eye,
  Heart,
  Code,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  href: string;
}

interface RecentActivity {
  id: string;
  type: 'project' | 'blog' | 'message' | 'comment';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  dueDate: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
    }
  }, [status, router]);

  if (!mounted || status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#0082c4] border-t-transparent" />
          <p className="text-lg font-semibold text-[#0082c4]">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  // Mock data - Replace with real API calls
  const stats: StatCard[] = [
    {
      title: 'Total Projects',
      value: '12',
      change: '+3 this month',
      changeType: 'increase',
      icon: <Code className="h-6 w-6" />,
      href: '/dashboard/projects',
    },
    {
      title: 'Blog Posts',
      value: '24',
      change: '+5 this week',
      changeType: 'increase',
      icon: <FileText className="h-6 w-6" />,
      href: '/dashboard/blogs',
    },
    {
      title: 'Messages',
      value: '8',
      change: '2 unread',
      changeType: 'increase',
      icon: <MessageSquare className="h-6 w-6" />,
      href: '/dashboard/messages',
    },
    {
      title: 'Total Views',
      value: '2,543',
      change: '+12.5%',
      changeType: 'increase',
      icon: <Eye className="h-6 w-6" />,
      href: '/dashboard/analytics',
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'project',
      title: 'New Project Added',
      description: 'E-commerce Platform launched',
      time: '2 hours ago',
      icon: <Code className="h-5 w-5 text-[#0082c4]" />,
    },
    {
      id: '2',
      type: 'blog',
      title: 'Blog Post Published',
      description: 'Understanding React Server Components',
      time: '5 hours ago',
      icon: <FileText className="h-5 w-5 text-[#10b981]" />,
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message Received',
      description: 'Client inquiry about web development',
      time: '1 day ago',
      icon: <MessageSquare className="h-5 w-5 text-[#f59e0b]" />,
    },
    {
      id: '4',
      type: 'comment',
      title: 'New Comment',
      description: 'Someone commented on your latest blog post',
      time: '2 days ago',
      icon: <Heart className="h-5 w-5 text-[#ef4444]" />,
    },
  ];

  const activeProjects: Project[] = [
    {
      id: '1',
      name: 'Portfolio Redesign',
      status: 'active',
      progress: 75,
      dueDate: '2025-12-15',
    },
    {
      id: '2',
      name: 'E-commerce Platform',
      status: 'active',
      progress: 45,
      dueDate: '2025-12-30',
    },
    {
      id: '3',
      name: 'Mobile App Development',
      status: 'pending',
      progress: 20,
      dueDate: '2026-01-15',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white pt-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#0082c4] md:text-4xl">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what&apos;s happening with your portfolio today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={stat.href}>
                <div className="group card-surface glow-cyan-hover border-border cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:border-[#0082c4]">
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg bg-[#0082c4]/10 p-3 text-[#0082c4] transition-transform group-hover:scale-110">
                      {stat.icon}
                    </div>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="h-5 w-5 text-[#10b981]" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-[#ef4444]" />
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-[#0082c4]">
                      {stat.value}
                    </p>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        stat.changeType === 'increase'
                          ? 'text-[#10b981]'
                          : 'text-[#ef4444]'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Active Projects */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="card-surface border-border rounded-xl border p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0082c4]">
                  Active Projects
                </h2>
                <Link
                  href="/dashboard/projects"
                  className="flex items-center gap-1 text-sm font-medium text-[#0082c4] hover:underline"
                >
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {activeProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-border rounded-lg border p-4 transition-all hover:border-[#0082c4]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">
                          {project.name}
                        </h3>
                        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {project.dueDate}</span>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          project.status === 'active'
                            ? 'bg-[#0082c4]/10 text-[#0082c4]'
                            : project.status === 'completed'
                              ? 'bg-[#10b981]/10 text-[#10b981]'
                              : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                        }`}
                      >
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold text-[#0082c4]">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-[#0082c4] to-[#0099e6]"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="card-surface border-border rounded-xl border p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0082c4]">
                  Recent Activity
                </h2>
                <Activity className="h-5 w-5 text-[#0082c4]" />
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-border flex gap-4 rounded-lg border p-3 transition-all hover:border-[#0082c4]"
                  >
                    <div className="flex-shrink-0">{activity.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-black dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-muted-foreground mt-1 truncate text-sm">
                        {activity.description}
                      </p>
                      <div className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <div className="card-surface border-border rounded-xl border p-6">
            <h2 className="mb-6 text-xl font-bold text-[#0082c4]">
              Quick Actions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/dashboard/projects/new">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border-2 border-[#0082c4] bg-[#0082c4] p-4 text-left font-semibold text-white transition-all hover:bg-[#0099e6]"
                >
                  <Code className="mb-2 h-6 w-6" />
                  <span>New Project</span>
                </motion.button>
              </Link>

              <Link href="/dashboard/blogs/new">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border-2 border-[#0082c4] bg-transparent p-4 text-left font-semibold text-[#0082c4] transition-all hover:bg-[#0082c4]/10"
                >
                  <FileText className="mb-2 h-6 w-6" />
                  <span>Write Blog</span>
                </motion.button>
              </Link>

              <Link href="/dashboard/messages">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border-2 border-[#0082c4] bg-transparent p-4 text-left font-semibold text-[#0082c4] transition-all hover:bg-[#0082c4]/10"
                >
                  <MessageSquare className="mb-2 h-6 w-6" />
                  <span>View Messages</span>
                </motion.button>
              </Link>

              <Link href="/dashboard/analytics">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border-2 border-[#0082c4] bg-transparent p-4 text-left font-semibold text-[#0082c4] transition-all hover:bg-[#0082c4]/10"
                >
                  <BarChart3 className="mb-2 h-6 w-6" />
                  <span>Analytics</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
