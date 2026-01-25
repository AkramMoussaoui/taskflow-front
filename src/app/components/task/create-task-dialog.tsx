import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
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
import { X, Plus } from 'lucide-react';

interface CreateTaskDialogProps {
  onAddTask: (task: {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    tags: string[];
  }) => void;
  children: React.ReactNode;
}

const AVAILABLE_TAGS = ['Frontend', 'Backend', 'Design', 'API', 'Bug', 'Feature', 'Security', 'DevOps'];

export function CreateTaskDialog({ onAddTask, children }: CreateTaskDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      description,
      priority,
      tags: selectedTags,
    });

    // Reset and close
    setTitle('');
    setDescription('');
    setPriority('medium');
    setSelectedTags([]);
    setOpen(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-white border-slate-200 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <DialogTitle className="text-2xl font-bold text-slate-900">Create New Task</DialogTitle>
          <DialogDescription className="text-slate-500">
            Fill in the details below to add a new task to your board.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-4">
            {/* Title Field */}
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-slate-700 font-semibold">
                Task Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Update system architecture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-50 border-slate-200 focus:border-primary/50 focus:ring-primary/20 h-11"
                required
              />
            </div>

            {/* Description Field */}
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-slate-700 font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Provide details about this task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-slate-50 border-slate-200 focus:border-primary/50 focus:ring-primary/20 min-h-[100px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Priority Dropdown */}
              <div className="grid gap-2">
                <Label htmlFor="priority" className="text-slate-700 font-semibold">
                  Priority
                </Label>
                <Select 
                  value={priority} 
                  onValueChange={(val: any) => setPriority(val)}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
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

              {/* Tag Dropdown (Multi-select UI) */}
              <div className="grid gap-2">
                <Label className="text-slate-700 font-semibold">Tags</Label>
                <Select onValueChange={toggleTag}>
                  <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-slate-400" />
                      <span>Add Tags</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_TAGS.map(tag => (
                      <SelectItem 
                        key={tag} 
                        value={tag}
                        className={selectedTags.includes(tag) ? "bg-primary/5 text-primary" : ""}
                      >
                        <div className="flex items-center justify-between w-full">
                          {tag}
                          {selectedTags.includes(tag) && <X className="h-3 w-3 ml-2" />}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedTags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="pl-3 pr-1 py-1 flex items-center gap-1 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    {tag}
                    <button 
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="p-0.5 hover:bg-slate-300 rounded-full transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 border-t border-slate-100 mt-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-[0_8px_16px_rgba(var(--primary),0.15)]"
            >
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
