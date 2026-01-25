import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone,
  Globe,
  Sparkles,
  Timer
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance ensures your team never waits. Load times under 100ms guaranteed.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Real-time updates, comments, and @mentions keep everyone in sync across projects.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep insights into team productivity, bottlenecks, and project health at a glance.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, SSO, and compliance with SOC 2, GDPR, and HIPAA standards.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Native iOS and Android apps let you manage tasks on the go, anywhere, anytime.',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Available in 15+ languages with data centers worldwide for optimal performance.',
  },
  {
    icon: Sparkles,
    title: 'AI Automation',
    description: 'Smart task suggestions, auto-categorization, and predictive due dates powered by AI.',
  },
  {
    icon: Timer,
    title: 'Time Tracking',
    description: 'Built-in time tracking and reporting help you understand where time is spent.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28" id='features'>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">
            Everything you need to manage tasks
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features that scale with your team, from startups to enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
