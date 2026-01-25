import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "This tool completely transformed how our team works. We've reduced project delivery time by 40% and everyone actually enjoys using it. The AI features are a game-changer.",
    author: "Sarah Mitchell",
    role: "VP of Engineering",
    company: "TechVista",
    initials: "SM",
    rating: 5,
  },
  {
    content: "We tried every task management tool out there. This is the only one our entire team actually adopted. The interface is intuitive and the collaboration features are unmatched.",
    author: "Marcus Chen",
    role: "Product Manager",
    company: "Nexus",
    initials: "MC",
    rating: 5,
  },
  {
    content: "The analytics dashboard gives us visibility we never had before. We can now predict bottlenecks and allocate resources more effectively. ROI was positive within the first month.",
    author: "Emily Rodriguez",
    role: "COO",
    company: "Quantum",
    initials: "ER",
    rating: 5,
  },
  {
    content: "As a remote-first company, real-time collaboration is critical. This platform keeps our 50+ person team aligned across 12 time zones. Couldn't imagine working without it.",
    author: "James Taylor",
    role: "Head of Operations",
    company: "Velocity",
    initials: "JT",
    rating: 5,
  },
  {
    content: "The mobile app is so good that I sometimes prefer managing tasks on my phone. The sync is instant and I've never lost any data. Security features give us peace of mind too.",
    author: "Lisa Wang",
    role: "CTO",
    company: "Apex",
    initials: "LW",
    rating: 5,
  },
  {
    content: "We switched from our old tool and migrated 5 years of data in under an hour. The customer support team was amazing, and our team was productive from day one. Best decision we made.",
    author: "David Kim",
    role: "Director of PMO",
    company: "Zenith",
    initials: "DK",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30" id='customers'>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">
            Loved by teams everywhere
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-muted-foreground mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
