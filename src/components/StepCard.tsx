import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

export function StepCard({ icon: Icon, title, description, step }: StepCardProps) {
  return (
    <AnimatedSection>
      <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
          {step}
        </div>
        <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </AnimatedSection>
  );
}