import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 p-8 md:p-12 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-bold">
              Ready to transform your workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 10,000+ teams already using our platform to work smarter, not harder.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="flex-1"
              />
              <Link to="/login">
                <Button size="lg" className="group">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
