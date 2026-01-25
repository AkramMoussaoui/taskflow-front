import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  X, 
  Plus, 
  Calendar, 
  MessageSquare, 
  Trash2, 
  Clock, 
  User,
  Hash,
  Pencil,
  Check
} from 'lucide-react';
import { Task } from '../../pages/Dashboard';

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const AVAILABLE_TAGS = ['Frontend', 'Backend', 'Design', 'API', 'Bug', 'Feature', 'Security', 'DevOps'];

export function TaskDetailDialog({ 
  task, 
  open, 
  onOpenChange, 
  onUpdateTask, 
  onDeleteTask 
}: TaskDetailDialogProps) {
  const [editedTask, setEditedTask] = React.useState<Task | null>(null);
  const [newComment, setNewComment] = React.useState('');
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const titleInputRef = React.useRef<HTMLInputElement>(null);

  // Sync editedTask when dialog opens or task changes
  React.useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
      setIsEditingTitle(false);
    }
  }, [task, open]);

  React.useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  if (!editedTask) return null;

  const handleUpdate = () => {
    if (editedTask) {
      onUpdateTask(editedTask);
      onOpenChange(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(editedTask.id);
      onOpenChange(false);
    }
  };

  const toggleTag = (tag: string) => {
    const tags = editedTask.tags || [];
    const newTags = tags.includes(tag) 
      ? tags.filter(t => t !== tag) 
      : [...tags, tag];
    setEditedTask({ ...editedTask, tags: newTags });
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Math.random().toString(36).substring(2, 9),
      user: 'Sarah Chen', // Demo user
      text: newComment,
      date: 'Just now',
    };
    setEditedTask({
      ...editedTask,
      comments: [comment, ...editedTask.comments],
    });
    setNewComment('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white border-slate-200 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="capitalize text-xs font-medium border-slate-200">
              {editedTask.status.replace('-', ' ')}
            </Badge>
          </div>
          <DialogTitle className="p-0">
            <div className="flex items-center gap-3">
              {isEditingTitle ? (
                <Input
                  ref={titleInputRef}
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                  className="text-2xl font-bold text-slate-900 border border-slate-200 bg-white px-4 py-2 focus-visible:ring-0 focus-visible:ring-primary/30 h-auto rounded-xl w-full shadow-sm transition-all"
                />
              ) : (
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  {editedTask.title}
                </h2>
              )}
              <button 
                type="button"
                onClick={() => setIsEditingTitle(!isEditingTitle)}
                className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-200/50 text-slate-400 hover:text-primary transition-all group"
              >
                {isEditingTitle ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Pencil className="h-4 w-4 focus-visible:ring-0" />
                )}
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-[500px]">
          {/* Main Content Area */}
          <div className="col-span-2 p-6 space-y-6 overflow-y-auto border-r border-slate-100">
            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <Clock className="h-4 w-4" />
                Description
              </div>
              <Textarea
                placeholder="Add a detailed description..."
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="bg-slate-50 border-slate-200 focus:border-primary/50 focus:ring-primary/20 min-h-[120px] resize-none text-sm"
              />
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                <MessageSquare className="h-4 w-4" />
                Comments ({editedTask.comments.length})
              </div>
              
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-slate-50 border-slate-200 focus:border-primary/50 focus:ring-primary/20 min-h-[60px] resize-none text-sm"
                  />
                  <div className="flex justify-end">
                    <Button size="sm" onClick={addComment} disabled={!newComment.trim()}>
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {editedTask.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {comment.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{comment.user}</span>
                        <span className="text-[10px] text-slate-400">{comment.date}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="bg-slate-50/50 p-6 space-y-6">
            <div className="space-y-4">
              {/* Priority */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Priority</Label>
                <Select 
                  value={editedTask.priority} 
                  onValueChange={(val: any) => setEditedTask({ ...editedTask, priority: val })}
                >
                  <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Due Date</Label>
                <div className="relative group">
                  <Input
                    type="date"
                    value={editedTask.dueDate || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    className="bg-white border-slate-200 h-9 text-sm"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tags</Label>
                <Select onValueChange={toggleTag}>
                  <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                    <div className="flex items-center gap-2">
                      <Plus className="h-3.5 w-3.5 text-slate-400" />
                      <span>Add Tags</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_TAGS.map(tag => (
                      <SelectItem key={tag} value={tag}>
                        <div className="flex items-center justify-between w-full">
                          {tag}
                          {editedTask.tags?.includes(tag) && <X className="h-3 w-3 ml-2" />}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {editedTask.tags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[10px] bg-slate-100 border-slate-200 text-slate-600">
                      {tag}
                      <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-slate-900">
                        <X className="h-2 w-2" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Assignees */}
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Assignees</Label>
                <div className="flex -space-x-1.5">
                  {editedTask.assignees.map((a, i) => (
                    <div key={i} className="h-7 w-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {a.initials}
                    </div>
                  ))}
                  <button className="h-7 w-7 rounded-full bg-slate-100 border-2 border-white border-dashed flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-slate-100 bg-white flex items-center justify-between sm:justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive hover:bg-destructive/5 gap-2 px-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete Task</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleUpdate} className="bg-primary hover:bg-primary/90 font-semibold px-8 shadow-md">
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
