import React from 'react';
import { AnimatedSection } from './AnimatedSection';

interface IntegrationCardProps {
  name: string;
  logo: string;
  description: string;
}

export function IntegrationCard({ name, logo, description }: IntegrationCardProps) {
  return (
    <AnimatedSection>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
        <img src={logo} alt={name} className="h-12 w-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </AnimatedSection>
  );
}