import React from 'react';
import { cn } from '@/app/components/ui/utils';

const companies = [
  { name: 'TechVista', color: '#3b82f6' },
  { name: 'Nexus', color: '#8b5cf6' },
  { name: 'Quantum', color: '#10b981' },
  { name: 'Velocity', color: '#f59e0b' },
  { name: 'Apex', color: '#ef4444' },
  { name: 'Zenith', color: '#06b6d4' },
];

export function CompanyLogos() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by leading teams worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: company.color }}
                >
                  {company.name.charAt(0)}
                </div>
                <span className="font-semibold text-lg">{company.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
