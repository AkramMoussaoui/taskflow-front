import React from 'react';

const stats = [
  { value: '10,000+', label: 'Active teams' },
  { value: '2M+', label: 'Tasks completed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'Customer rating' },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
