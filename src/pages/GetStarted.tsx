import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BetaForm } from '../components/BetaForm';
import { AnimatedSection } from '../components/AnimatedSection';

export function GetStarted() {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  
  // Extract plan from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get('plan');
    if (plan) {
      setSelectedPlan(plan);
      // Store in session storage for the form component to use
      sessionStorage.setItem('selectedPlan', plan);
    }
  }, [location]);
  
  // Schema for GetStarted page with FAQPage schema for better search visibility
  const getStartedSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I get started with PipeWarden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Select your pricing plan, fill out the form with your information, and complete the payment process to start securing your CI/CD pipelines immediately."
        }
      },
      {
        "@type": "Question",
        "name": "What information do I need to provide to get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll need to provide your name, email, company, role, team size, number of pipelines, and the CI/CD platforms you use."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I start using PipeWarden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After completing the sign-up process and payment, you can start using PipeWarden immediately for Starter and Professional plans. Enterprise customers will receive a personalized onboarding process."
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Get Started with PipeWarden | Secure Your CI/CD Pipelines Today"
        description="Start securing your CI/CD pipelines in minutes. Choose your plan, complete a quick form, and begin protecting your software delivery process with PipeWarden's automated security tools."
        canonicalUrl="/get-started"
        keywords={[
          'get started with pipeline security',
          'CI/CD security signup',
          'secure DevOps onboarding',
          'pipeline security trial',
          'DevSecOps implementation',
          'start security automation',
          'CI/CD security solution signup',
          'pipeline vulnerability protection'
        ]}
        schema={getStartedSchema}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get Started with PipeWarden
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Complete the form below to start securing your CI/CD pipelines
                {selectedPlan && <span> with our <strong>{selectedPlan}</strong> plan</span>}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <BetaForm />
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What happens next?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold mb-2">Form Submission</h3>
                  <p className="text-gray-600 dark:text-gray-400">We'll review your information and verify your eligibility</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold mb-2">Payment Processing</h3>
                  <p className="text-gray-600 dark:text-gray-400">For Starter and Professional plans, you'll receive payment instructions</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold mb-2">Account Setup</h3>
                  <p className="text-gray-600 dark:text-gray-400">We'll help you set up your PipeWarden account and start securing your pipelines</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
