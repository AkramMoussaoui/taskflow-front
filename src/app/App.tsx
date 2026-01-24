import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Separator } from '@/app/components/ui/separator';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Slider } from '@/app/components/ui/slider';
import { Checkbox } from '@/app/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { Progress } from '@/app/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { 
  CheckSquare, 
  LayoutDashboard, 
  ListTodo, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';

// Task Management Components
import { PriorityBadge } from '@/app/components/task/priority-badge';
import { StatusBadge } from '@/app/components/task/status-badge';
import { TaskCard } from '@/app/components/task/task-card';
import { TaskList } from '@/app/components/task/task-list';
import { KanbanCard } from '@/app/components/task/kanban-card';
import { KanbanColumn } from '@/app/components/task/kanban-column';
import { TaskProgress } from '@/app/components/task/task-progress';
import { StatsCard } from '@/app/components/task/stats-card';
import { TeamMember } from '@/app/components/task/team-member';
import { FilterBar } from '@/app/components/task/filter-bar';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold">Task Management</h1>
                <p className="text-sm text-muted-foreground">Design System Showcase</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">Documentation</Button>
              <Button>Export Components</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="ui">UI Library</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2>Design System Overview</h2>
              <p className="text-muted-foreground mt-2">
                A comprehensive design system for task management applications with reusable components,
                consistent styling, and task-specific elements.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Track completion across all projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TaskProgress completed={89} total={142} label="Website Redesign" />
                <TaskProgress completed={45} total={60} label="Mobile App Development" />
                <TaskProgress completed={12} total={30} label="Marketing Campaign" />
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card>
              <CardHeader>
                <CardTitle>Task Management Color System</CardTitle>
                <CardDescription>Custom colors for priorities and statuses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">Priority Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--priority-low)]" />
                      <p className="text-sm font-medium">Low Priority</p>
                      <code className="text-xs text-muted-foreground">#10b981</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--priority-medium)]" />
                      <p className="text-sm font-medium">Medium Priority</p>
                      <code className="text-xs text-muted-foreground">#f59e0b</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--priority-high)]" />
                      <p className="text-sm font-medium">High Priority</p>
                      <code className="text-xs text-muted-foreground">#f97316</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--priority-critical)]" />
                      <p className="text-sm font-medium">Critical Priority</p>
                      <code className="text-xs text-muted-foreground">#ef4444</code>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Status Colors</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--status-todo)]" />
                      <p className="text-sm font-medium">To Do</p>
                      <code className="text-xs text-muted-foreground">#64748b</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--status-in-progress)]" />
                      <p className="text-sm font-medium">In Progress</p>
                      <code className="text-xs text-muted-foreground">#3b82f6</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--status-review)]" />
                      <p className="text-sm font-medium">Review</p>
                      <code className="text-xs text-muted-foreground">#8b5cf6</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[var(--status-done)]" />
                      <p className="text-sm font-medium">Done</p>
                      <code className="text-xs text-muted-foreground">#10b981</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div>
              <h2>Badge Components</h2>
              <p className="text-muted-foreground mt-2">
                Task-specific badges for priorities, statuses, and general categorization.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Priority Badges</CardTitle>
                <CardDescription>Visual indicators for task priorities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">Default Size</h4>
                  <div className="flex flex-wrap gap-3">
                    <PriorityBadge priority="low" />
                    <PriorityBadge priority="medium" />
                    <PriorityBadge priority="high" />
                    <PriorityBadge priority="critical" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Without Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <PriorityBadge priority="low" showIcon={false} />
                    <PriorityBadge priority="medium" showIcon={false} />
                    <PriorityBadge priority="high" showIcon={false} />
                    <PriorityBadge priority="critical" showIcon={false} />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Size Variants</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <PriorityBadge priority="high" size="sm" />
                    <PriorityBadge priority="high" size="md" />
                    <PriorityBadge priority="high" size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>Track task progress with status indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">All Statuses</h4>
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="todo" />
                    <StatusBadge status="in-progress" />
                    <StatusBadge status="review" />
                    <StatusBadge status="done" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Without Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="todo" showIcon={false} />
                    <StatusBadge status="in-progress" showIcon={false} />
                    <StatusBadge status="review" showIcon={false} />
                    <StatusBadge status="done" showIcon={false} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Badges</CardTitle>
                <CardDescription>Standard badge component for tags and labels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Use Cases</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Frontend</Badge>
                    <Badge variant="secondary">Backend</Badge>
                    <Badge variant="secondary">Design</Badge>
                    <Badge variant="secondary">Bug</Badge>
                    <Badge variant="secondary">Feature</Badge>
                    <Badge variant="secondary">Documentation</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            <div>
              <h2>Task Card Components</h2>
              <p className="text-muted-foreground mt-2">
                Flexible card layouts for displaying task information in different contexts.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Default Task Cards</CardTitle>
                <CardDescription>Standard task card with full information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <TaskCard
                    title="Implement authentication system"
                    description="Add JWT-based authentication with refresh tokens"
                    priority="high"
                    status="in-progress"
                    assignee={{ name: "Sarah Chen", initials: "SC" }}
                    dueDate="Jan 28"
                    tags={["Backend", "Security"]}
                    comments={5}
                    attachments={2}
                  />
                  <TaskCard
                    title="Design dashboard mockups"
                    description="Create high-fidelity mockups for the analytics dashboard"
                    priority="medium"
                    status="review"
                    assignee={{ name: "Mike Johnson", initials: "MJ" }}
                    dueDate="Jan 30"
                    tags={["Design", "UI"]}
                    comments={12}
                  />
                  <TaskCard
                    title="Fix mobile navigation bug"
                    priority="critical"
                    status="todo"
                    assignee={{ name: "Alex Rivera", initials: "AR" }}
                    dueDate="Jan 25"
                    tags={["Bug", "Frontend"]}
                    comments={3}
                    attachments={1}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compact Task Cards</CardTitle>
                <CardDescription>Minimal version for dense layouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <TaskCard
                    variant="compact"
                    title="Update documentation"
                    priority="low"
                    status="todo"
                    assignee={{ name: "Emily Davis", initials: "ED" }}
                    dueDate="Feb 1"
                    tags={["Docs"]}
                  />
                  <TaskCard
                    variant="compact"
                    title="Optimize database queries"
                    priority="medium"
                    status="in-progress"
                    assignee={{ name: "David Kim", initials: "DK" }}
                    dueDate="Jan 29"
                    tags={["Backend", "Performance"]}
                  />
                  <TaskCard
                    variant="compact"
                    title="Write unit tests"
                    priority="medium"
                    status="done"
                    assignee={{ name: "Lisa Wang", initials: "LW" }}
                    dueDate="Jan 24"
                    tags={["Testing"]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Task Cards</CardTitle>
                <CardDescription>Extended information with assignee names</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TaskCard
                    variant="detailed"
                    title="Implement real-time notifications"
                    description="Add WebSocket support for instant notifications across the platform"
                    priority="high"
                    status="in-progress"
                    assignee={{ name: "Sarah Chen", initials: "SC" }}
                    dueDate="Feb 2"
                    tags={["Feature", "Backend", "Real-time"]}
                    comments={8}
                    attachments={3}
                  />
                  <TaskCard
                    variant="detailed"
                    title="Conduct user research interviews"
                    description="Interview 10 users to gather feedback on the new features"
                    priority="medium"
                    status="review"
                    assignee={{ name: "Emma Thompson", initials: "ET" }}
                    dueDate="Feb 5"
                    tags={["Research", "UX"]}
                    comments={15}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Lists</CardTitle>
                <CardDescription>Compact list view for quick task management</CardDescription>
              </CardHeader>
              <CardContent>
                <TaskList
                  items={[
                    {
                      title: "Review pull requests",
                      completed: false,
                      priority: "high",
                      assignee: { name: "Sarah Chen", initials: "SC" },
                      dueDate: "Today",
                    },
                    {
                      title: "Update project roadmap",
                      completed: true,
                      priority: "medium",
                      assignee: { name: "Mike Johnson", initials: "MJ" },
                      dueDate: "Yesterday",
                    },
                    {
                      title: "Prepare sprint demo",
                      completed: false,
                      priority: "medium",
                      assignee: { name: "Alex Rivera", initials: "AR" },
                      dueDate: "Tomorrow",
                    },
                    {
                      title: "Fix CSS styling issues",
                      completed: false,
                      priority: "low",
                      assignee: { name: "Emily Davis", initials: "ED" },
                      dueDate: "Jan 30",
                    },
                    {
                      title: "Deploy to staging environment",
                      completed: true,
                      priority: "high",
                      assignee: { name: "David Kim", initials: "DK" },
                      dueDate: "Jan 23",
                    },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Display team member information and task counts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">Default View</h4>
                  <div className="space-y-0">
                    <TeamMember
                      name="Sarah Chen"
                      role="Frontend Developer"
                      initials="SC"
                      activeTasks={5}
                      completedTasks={23}
                    />
                    <TeamMember
                      name="Mike Johnson"
                      role="Product Designer"
                      initials="MJ"
                      activeTasks={3}
                      completedTasks={18}
                    />
                    <TeamMember
                      name="Alex Rivera"
                      role="Backend Developer"
                      initials="AR"
                      activeTasks={7}
                      completedTasks={31}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Detailed View</h4>
                  <div className="space-y-0">
                    <TeamMember
                      variant="detailed"
                      name="Emily Davis"
                      role="QA Engineer"
                      initials="ED"
                      activeTasks={4}
                      completedTasks={42}
                    />
                    <TeamMember
                      variant="detailed"
                      name="David Kim"
                      role="DevOps Engineer"
                      initials="DK"
                      activeTasks={2}
                      completedTasks={27}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Kanban Tab */}
          <TabsContent value="kanban" className="space-y-6">
            <div>
              <h2>Kanban Board Components</h2>
              <p className="text-muted-foreground mt-2">
                Drag-and-drop ready cards and columns for building Kanban boards.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Kanban Board Example</CardTitle>
                <CardDescription>Visual task organization with columns and cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  <KanbanColumn title="To Do" count={5} color="var(--status-todo)">
                    <KanbanCard
                      title="Design new landing page"
                      priority="high"
                      assignees={[
                        { name: "Sarah Chen", initials: "SC" },
                        { name: "Mike Johnson", initials: "MJ" },
                      ]}
                      dueDate="Jan 28"
                      tags={["Design", "Frontend"]}
                      comments={3}
                    />
                    <KanbanCard
                      title="Implement search functionality"
                      priority="medium"
                      assignees={[{ name: "Alex Rivera", initials: "AR" }]}
                      dueDate="Jan 30"
                      tags={["Feature"]}
                      attachments={1}
                    />
                  </KanbanColumn>

                  <KanbanColumn title="In Progress" count={3} color="var(--status-in-progress)">
                    <KanbanCard
                      title="API integration for payments"
                      priority="critical"
                      assignees={[
                        { name: "David Kim", initials: "DK" },
                        { name: "Emily Davis", initials: "ED" },
                      ]}
                      dueDate="Jan 26"
                      tags={["Backend", "Payment"]}
                      comments={8}
                      attachments={2}
                    />
                    <KanbanCard
                      title="Refactor authentication module"
                      priority="high"
                      assignees={[{ name: "Sarah Chen", initials: "SC" }]}
                      dueDate="Jan 29"
                      tags={["Backend", "Security"]}
                      comments={5}
                    />
                  </KanbanColumn>

                  <KanbanColumn title="Review" count={2} color="var(--status-review)">
                    <KanbanCard
                      title="Update user documentation"
                      priority="low"
                      assignees={[{ name: "Lisa Wang", initials: "LW" }]}
                      dueDate="Feb 1"
                      tags={["Documentation"]}
                      comments={2}
                    />
                  </KanbanColumn>

                  <KanbanColumn title="Done" count={12} color="var(--status-done)">
                    <KanbanCard
                      title="Setup CI/CD pipeline"
                      priority="high"
                      assignees={[
                        { name: "David Kim", initials: "DK" },
                        { name: "Alex Rivera", initials: "AR" },
                      ]}
                      tags={["DevOps"]}
                      comments={6}
                    />
                    <KanbanCard
                      title="Mobile responsive fixes"
                      priority="medium"
                      assignees={[{ name: "Mike Johnson", initials: "MJ" }]}
                      tags={["Frontend", "Mobile"]}
                    />
                  </KanbanColumn>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6">
            <div>
              <h2>Form Components</h2>
              <p className="text-muted-foreground mt-2">
                Complete form elements for task creation and editing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Task</CardTitle>
                  <CardDescription>Form example with all input types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input id="task-title" placeholder="Enter task title" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea
                      id="task-description"
                      placeholder="Describe the task..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select>
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sc">Sarah Chen</SelectItem>
                        <SelectItem value="mj">Mike Johnson</SelectItem>
                        <SelectItem value="ar">Alex Rivera</SelectItem>
                        <SelectItem value="ed">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Frontend</Badge>
                      <Badge variant="secondary">Backend</Badge>
                      <Badge variant="secondary">Design</Badge>
                      <Button variant="outline" size="sm">+ Add Tag</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="notifications" />
                      <Label htmlFor="notifications" className="text-sm">
                        Send notifications
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1">Create Task</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Input Components</CardTitle>
                    <CardDescription>Standard form inputs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="input-default">Default Input</Label>
                      <Input id="input-default" placeholder="Placeholder text" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="input-disabled">Disabled Input</Label>
                      <Input id="input-disabled" disabled value="Disabled value" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="textarea">Textarea</Label>
                      <Textarea id="textarea" placeholder="Enter multiple lines..." rows={3} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Toggles & Switches</CardTitle>
                    <CardDescription>Binary selection controls</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-1">Enable notifications</Label>
                      <Switch id="switch-1" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-2">Auto-assign tasks</Label>
                      <Switch id="switch-2" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch-3">Dark mode</Label>
                      <Switch id="switch-3" />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label>Checkbox Group</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="check-1" />
                          <Label htmlFor="check-1">Task completed</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="check-2" defaultChecked />
                          <Label htmlFor="check-2">Send email</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="check-3" />
                          <Label htmlFor="check-3">Archive after completion</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Radio Groups</CardTitle>
                    <CardDescription>Single selection from multiple options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="option-1">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="option-1" id="radio-1" />
                        <Label htmlFor="radio-1">Assign to me</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="option-2" id="radio-2" />
                        <Label htmlFor="radio-2">Assign to team</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="option-3" id="radio-3" />
                        <Label htmlFor="radio-3">Unassigned</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Slider</CardTitle>
                    <CardDescription>Numeric value selection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Task Completion</Label>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Slider defaultValue={[65]} max={100} step={1} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Filter Bar Component</CardTitle>
                <CardDescription>Search and filter tasks with multiple criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <FilterBar
                  activeFilters={[
                    { key: 'priority', label: 'Priority', value: 'High' },
                    { key: 'assignee', label: 'Assignee', value: 'Sarah Chen' },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* UI Library Tab */}
          <TabsContent value="ui" className="space-y-6">
            <div>
              <h2>UI Component Library</h2>
              <p className="text-muted-foreground mt-2">
                Additional components from the base design system.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Button variants and sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <CheckSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">With Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button variant="secondary">
                      <ListTodo className="mr-2 h-4 w-4" />
                      Tasks
                    </Button>
                    <Button variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Indicators</CardTitle>
                <CardDescription>Visual feedback for loading and completion</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loading</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Complete</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatars</CardTitle>
                <CardDescription>User profile images and fallbacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-3">Sizes</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Avatar Group</h4>
                  <div className="flex -space-x-4">
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>+3</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialog Component</CardTitle>
                <CardDescription>Modal dialogs for user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Task?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete the task
                        and remove all associated data.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Container components for content grouping</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card description goes here</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        This is the card content. Cards are flexible containers for grouping related information.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Another Card</CardTitle>
                      <CardDescription>With different content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Metric 1</span>
                          <span className="text-sm font-medium">42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Metric 2</span>
                          <span className="text-sm font-medium">89</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Task Management Design System © 2026</p>
            <p>Built with React + Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
