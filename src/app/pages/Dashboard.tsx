import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  ListTodo, 
  Users, 
  Clock, 
  Target,
  LayoutDashboard,
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';

// Task Management Components
import { StatsCard } from '../components/task/stats-card';
import { KanbanCard } from '../components/task/kanban-card';
import { KanbanColumn } from '../components/task/kanban-column';

import { Logo } from '../components/icons/Logo';

// DnD Imports
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * Task interface for the Kanban board.
 */
interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignees: Array<{ name: string; initials: string; avatar?: string }>;
  dueDate?: string;
  tags?: string[];
  comments?: number;
  attachments?: number;
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: "Design new landing page",
    priority: "high",
    status: 'todo',
    assignees: [
      { name: "Sarah Chen", initials: "SC" },
      { name: "Mike Johnson", initials: "MJ" },
    ],
    dueDate: "Jan 28",
    tags: ["Design", "Frontend"],
    comments: 3,
  },
  {
    id: '2',
    title: "Implement search functionality",
    priority: "medium",
    status: 'todo',
    assignees: [{ name: "Alex Rivera", initials: "AR" }],
    dueDate: "Jan 30",
    tags: ["Feature"],
    attachments: 1,
  },
  {
    id: '3',
    title: "API integration for payments",
    priority: "critical",
    status: 'in-progress',
    assignees: [
      { name: "David Kim", initials: "DK" },
      { name: "Emily Davis", initials: "ED" },
    ],
    dueDate: "Jan 26",
    tags: ["Backend", "Payment"],
    comments: 8,
    attachments: 2,
  },
  {
    id: '4',
    title: "Refactor authentication module",
    priority: "high",
    status: 'in-progress',
    assignees: [{ name: "Sarah Chen", initials: "SC" }],
    dueDate: "Jan 29",
    tags: ["Backend", "Security"],
    comments: 5,
  },
  {
    id: '5',
    title: "Update user documentation",
    priority: "low",
    status: 'review',
    assignees: [{ name: "Lisa Wang", initials: "LW" }],
    dueDate: "Feb 1",
    tags: ["Documentation"],
    comments: 2,
  },
  {
    id: '6',
    title: "Setup CI/CD pipeline",
    priority: "high",
    status: 'done',
    assignees: [
      { name: "David Kim", initials: "DK" },
      { name: "Alex Rivera", initials: "AR" },
    ],
    tags: ["DevOps"],
    comments: 6,
  },
  {
    id: '7',
    title: "Mobile responsive fixes",
    priority: "medium",
    status: 'done',
    assignees: [{ name: "Mike Johnson", initials: "MJ" }],
    tags: ["Frontend", "Mobile"],
  },
];

/**
 * Integrated Dashboard component.
 * Combines high-level stats with an interactive Kanban board.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard() {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS);

  const moveTask = (taskId: string, targetStatus: Task['status']) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <Logo className="h-6 w-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">TaskFlow</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-slate-100 text-primary rounded-lg font-medium">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link to="/showcase" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <CheckSquare className="h-5 w-5" />
            Components
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link to="/login" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search tasks, teams..." 
                className="pl-10 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">Sarah Chen</p>
                <p className="text-xs text-slate-500">Project Manager</p>
              </div>
              <Avatar>
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Page Heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
              <p className="text-slate-500">Review your team's progress and upcoming tasks</p>
            </div>
            <Button className="gap-2 shadow-[0_4px_12px_rgba(var(--primary),0.2)]">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Tasks"
              value="142"
              description="from last month"
              icon={ListTodo}
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatsCard
              title="In Progress"
              value="24"
              description="active now"
              icon={Clock}
              variant="primary"
            />
            <StatsCard
              title="Completed"
              value="89"
              description="this month"
              icon={Target}
              variant="success"
            />
            <StatsCard
              title="Team Members"
              value="8"
              description="collaborating"
              icon={Users}
            />
          </div>

          {/* Kanban Board Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Kanban Board</h3>
              <Button variant="link" className="text-primary p-0 h-auto font-medium">View all tasks</Button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-6 -mx-2 px-2">
              <KanbanColumn 
                title="To Do" 
                status="todo"
                count={tasks.filter(t => t.status === 'todo').length} 
                color="var(--status-todo)"
                onDropTask={(id) => moveTask(id, 'todo')}
              >
                {tasks.filter(t => t.status === 'todo').map(task => (
                  <KanbanCard key={task.id} {...task} />
                ))}
              </KanbanColumn>

              <KanbanColumn 
                title="In Progress" 
                status="in-progress"
                count={tasks.filter(t => t.status === 'in-progress').length} 
                color="var(--status-in-progress)"
                onDropTask={(id) => moveTask(id, 'in-progress')}
              >
                {tasks.filter(t => t.status === 'in-progress').map(task => (
                  <KanbanCard key={task.id} {...task} />
                ))}
              </KanbanColumn>

              <KanbanColumn 
                title="Review" 
                status="review"
                count={tasks.filter(t => t.status === 'review').length} 
                color="var(--status-review)"
                onDropTask={(id) => moveTask(id, 'review')}
              >
                {tasks.filter(t => t.status === 'review').map(task => (
                  <KanbanCard key={task.id} {...task} />
                ))}
              </KanbanColumn>

              <KanbanColumn 
                title="Done" 
                status="done"
                count={tasks.filter(t => t.status === 'done').length} 
                color="var(--status-done)"
                onDropTask={(id) => moveTask(id, 'done')}
              >
                {tasks.filter(t => t.status === 'done').map(task => (
                  <KanbanCard key={task.id} {...task} />
                ))}
              </KanbanColumn>
            </div>
          </div>
        </div>
      </main>
    </div>
    </DndProvider>
  );
}
