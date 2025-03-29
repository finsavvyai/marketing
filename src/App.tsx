import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  GitBranch,
  AlertCircle,
  CheckCircle,
  Moon,
  Sun,
  X,
  Menu,
  Lock,
  Zap,
  Settings,
  Users,
  FileCheck,
  Plug,
  Bot,
  BarChart,
  Play
} from 'lucide-react';
import { SEO } from './components/SEO';
import { AnimatedSection } from './components/AnimatedSection';
import { BetaForm } from './components/BetaForm';
import { IntegrationCard } from './components/IntegrationCard';
import { StepCard } from './components/StepCard';

// Video Modal Component
const VideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Handle closing the modal when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle ESC key to close modal
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      
      // Auto-play video when modal opens
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.error('Auto-play failed:', err));
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Restore scrolling when modal closes
      
      // Pause video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <video 
          ref={videoRef}
          controls 
          className="w-full h-full" 
          src={videoSrc}
          poster="/images/video-thumbnail.jpg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const features = [
    {
      title: 'Universal CI/CD Integration',
      description: 'Connect seamlessly with GitLab, GitHub Actions, Jenkins, Azure DevOps, CircleCI, and AWS CodePipeline.',
      icon: Plug
    },
    {
      title: 'Intelligent Policy Engine',
      description: 'Define security policies once and enforce them consistently across all pipelines.',
      icon: Bot
    },
    {
      title: 'AI-Powered Analysis',
      description: 'Get contextual understanding of vulnerabilities with our AI analysis engine.',
      icon: Zap
    },
    {
      title: 'Multi-Tenant Architecture',
      description: 'Support multiple teams with isolated security policies and role-based access control.',
      icon: Users
    },
    {
      title: 'Compliance Automation',
      description: 'Automatically map security controls to compliance frameworks with evidence collection.',
      icon: FileCheck
    },
    {
      title: 'Real-time Monitoring',
      description: 'Monitor security metrics and get instant alerts on policy violations.',
      icon: BarChart
    }
  ];

  const steps = [
    {
      title: 'Connect Your Pipelines',
      description: 'Integrate PipeWarden with your existing CI/CD platforms in minutes with our guided setup.',
      icon: Plug
    },
    {
      title: 'Define Security Policies',
      description: "Create or import security policies that match your organization's requirements.",
      icon: Shield
    },
    {
      title: 'Enforce & Monitor',
      description: 'Automatically enforce policies across all pipelines with real-time visibility.',
      icon: AlertCircle
    },
    {
      title: 'Remediate & Improve',
      description: 'Get actionable insights to fix vulnerabilities and improve security.',
      icon: CheckCircle
    }
  ];

  const integrations = [
    {
      name: 'GitHub Actions',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      description: 'Seamless integration with GitHub Actions workflows.'
    },
    {
      name: 'GitLab CI',
      logo: 'https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png',
      description: 'Native support for GitLab CI/CD pipelines.'
    },
    {
      name: 'Jenkins',
      logo: 'https://www.jenkins.io/images/logos/jenkins/jenkins.png',
      description: 'Robust integration with Jenkins pipelines.'
    },
    {
      name: 'Azure DevOps',
      logo: 'https://azure.microsoft.com/svghandler/devops/?width=600&height=315',
      description: 'Seamless Azure DevOps integration.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$499',
      period: '/month',
      description: 'For small teams getting started with DevSecOps',
      features: [
        'Up to 10 pipelines',
        '5 user accounts',
        'Basic security policies',
        'Email support',
        'Core integrations'
      ]
    },
    {
      name: 'Professional',
      price: '$1,499',
      period: '/month',
      description: 'For growing organizations scaling security',
      features: [
        'Up to 30 pipelines',
        '20 user accounts',
        'Advanced policy management',
        'Priority support',
        'All integrations',
        'Basic compliance reporting'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For organizations with complex security needs',
      features: [
        'Unlimited pipelines',
        'Unlimited users',
        'Custom policy development',
        '24/7 premium support',
        'Advanced compliance automation',
        'Dedicated security advisor'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How does PipeWarden integrate with my existing CI/CD platform?',
      answer: 'PipeWarden connects via APIs and webhooks to monitor pipeline activities, trigger scans, and enforce security gates without disrupting your workflows.'
    },
    {
      question: 'Can I use PipeWarden with multiple CI/CD platforms simultaneously?',
      answer: 'Yes! PipeWarden is designed to work across different platforms, giving you a unified security view regardless of which tools your teams use.'
    },
    {
      question: 'How does the policy engine work?',
      answer: 'Our policy engine lets you define security rules that automatically evaluate findings from security scans. You can set thresholds for vulnerabilities, check for specific issues, and create custom rules for your unique requirements.'
    },
    {
      question: 'What compliance frameworks does PipeWarden support?',
      answer: 'PipeWarden supports mapping to SOC2, ISO 27001, PCI DSS, HIPAA, GDPR, and custom frameworks. We continuously add new frameworks based on customer needs.'
    },
    {
      question: 'Is PipeWarden available for on-premises deployment?',
      answer: 'Yes, we offer both cloud-based SaaS and on-premises deployment options for organizations with specific security or regulatory requirements.'
    }
  ];

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PipeWarden",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Any",
    "description": "PipeWarden secures your CI/CD pipelines with automated security scanning, compliance monitoring, and vulnerability detection to protect your software delivery process.",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "highPrice": "999",
      "lowPrice": "99",
      "offerCount": "3"
    },
    "featureList": "CI/CD Security, Pipeline Monitoring, Vulnerability Scanning, DevSecOps Automation, Compliance Reporting"
  };

  return (
    <>
      <SEO
        title="PipeWarden | Secure CI/CD Pipeline Security Solution"
        description="PipeWarden protects your CI/CD pipelines with automated security scanning, compliance monitoring, and vulnerability detection. Secure your software delivery process today."
        canonicalUrl="/"
        keywords={[
          'CI/CD pipeline security',
          'secure software delivery',
          'pipeline vulnerability detection',
          'automated security scans',
          'devsecops tool',
          'compliance automation',
          'software supply chain security',
          'pipeline security monitoring'
        ]}
        schema={organizationSchema}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="relative h-8 w-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg shadow-lg"></div>
                <div className="absolute inset-0.5 bg-gradient-to-br from-primary-400 to-blue-500 rounded-lg opacity-70"></div>
                <Lock className="h-4 w-4 text-white relative z-10" />
              </div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">PipeWarden</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Features</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">How It Works</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Pricing</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Contact</a>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <a href="#contact" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-block">
                Join Beta
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">How It Works</a>
              <a href="#pricing" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Pricing</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
              <a href="#contact" className="w-full mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-block text-center">
                Join Beta
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <AnimatedSection>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Break Free From Security Vulnerabilities
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">
                  Without Breaking Your Pipeline
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                PipeWarden continuously monitors, scans, and enforces security policies across all your CI/CD platforms - helping you ship secure code faster.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#contact" className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors inline-block">
                  Join Beta Program
                </a>
                <button 
                  onClick={() => setIsVideoModalOpen(true)} 
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Play size={18} /> Watch Demo
                </button>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent dark:from-gray-900 pointer-events-none"></div>
            <img
              src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=2070"
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Comprehensive Pipeline Security
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Everything you need to secure your development workflow
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index}>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
                  <feature.icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                How PipeWarden Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Get started with PipeWarden in four simple steps
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Seamless Integrations
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Connect with your favorite CI/CD platforms
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                name={integration.name}
                logo={integration.logo}
                description={integration.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choose the plan that best fits your needs
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <AnimatedSection key={index}>
                <div
                  className={`p-8 rounded-xl ${
                    tier.popular
                      ? 'bg-primary-600 text-white ring-2 ring-primary-600 dark:ring-primary-400'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm mb-4 opacity-90">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-lg">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/get-started?plan=${encodeURIComponent(tier.name)}`}
                    className={`w-full py-3 rounded-lg font-semibold text-center block ${
                      tier.popular
                        ? 'bg-white text-primary-600 hover:bg-gray-100'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    } transition-colors`}
                  >
                    Get Started
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Secure Your Pipeline?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join the beta program today and be among the first to experience the future of pipeline security.
              </p>
            </div>
          </AnimatedSection>
          <BetaForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">PipeWarden</span>
              </div>
              <p className="text-gray-400">
                Securing development pipelines with intelligent automation.
              </p>
              <p className="mt-4 text-gray-400">
                Contact us: <a href="mailto:info@pipewarden.io" className="hover:text-white">info@pipewarden.io</a>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 PipeWarden.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
      {/* Video Demo Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoSrc="./pipewarden-video.mp4" 
      />
    </>
  );
}
