import React, { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;  
  teamSize: string;  
  pipelines: string;
  platforms: string[];
  currentChallenges: string;  
  securityChallenges: string; // Added for specific security challenges question
  securityTools: string[];  
  howHeard: string;  
}

export function BetaForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    pipelines: '',
    platforms: [],
    currentChallenges: '',
    securityChallenges: '',
    securityTools: [],
    howHeard: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const cicdPlatforms = [
    'GitHub Actions',
    'GitLab CI',
    'Jenkins',
    'Azure DevOps',
    'CircleCI',
    'AWS CodePipeline',
    'Bitbucket Pipelines',
    'TeamCity',
  ];
  
  const securityToolOptions = [
    'SonarQube',
    'Snyk',
    'Trivy',
    'OWASP ZAP',
    'Checkmarx',
    'Veracode',
    'Fortify',
    'None yet'
  ];

  // Validate form data and return errors
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Your role is required';
    }
    
    if (!formData.teamSize) {
      newErrors.teamSize = 'Please select your team size';
    }
    
    if (!formData.pipelines) {
      newErrors.pipelines = 'Please select number of pipelines';
    }
    
    if (formData.platforms.length === 0) {
      newErrors.platforms = 'Please select at least one CI/CD platform';
    }
    
    return newErrors;
  };

  // Check if form is valid when fields change
  useEffect(() => {
    const newErrors = validateForm();
    // Only update errors for touched fields
    const filteredErrors: Record<string, string> = {};
    Object.keys(touched).forEach(key => {
      if (touched[key] && newErrors[key]) {
        filteredErrors[key] = newErrors[key];
      }
    });
    setErrors(filteredErrors);
  }, [formData, touched]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);
    
    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    
    setStatus('submitting');
    setErrorMessage('');

    // Google Form ID and entry IDs from extraction
    const FORM_ID = '1pAjCKEIjxavLQgQteqLhSoEIUtqvC-js8wUMvqow8o4';
    
    // Correct Entry IDs from extraction
    const NAME_ID = 'entry.1372580056';
    const EMAIL_ID = 'entry.1741300682';
    const COMPANY_ID = 'entry.779876828';
    const ROLE_ID = 'entry.1898208136';
    const TEAM_SIZE_ID = 'entry.1819908532';
    const PIPELINES_ID = 'entry.1180000427';
    const PLATFORMS_ID = 'entry.226006883';
    const CHALLENGES_ID = 'entry.2009267947';
    const SECURITY_CHALLENGES_ID = 'entry.1969986361';
    const TOOLS_ID = 'entry.2114182257';
    const HOW_HEARD_ID = 'entry.520955940';

    try {
      // Create a hidden iframe to submit the form
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a form inside the document
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `https://docs.google.com/forms/d/${FORM_ID}/formResponse`;
      form.target = 'hidden_iframe';
      
      // Add form data with correct entry IDs
      const nameInput = document.createElement('input');
      nameInput.type = 'hidden';
      nameInput.name = NAME_ID;
      nameInput.value = formData.name;
      form.appendChild(nameInput);
      
      const emailInput = document.createElement('input');
      emailInput.type = 'hidden';
      emailInput.name = EMAIL_ID;
      emailInput.value = formData.email;
      form.appendChild(emailInput);
      
      const companyInput = document.createElement('input');
      companyInput.type = 'hidden';
      companyInput.name = COMPANY_ID;
      companyInput.value = formData.company;
      form.appendChild(companyInput);
      
      const roleInput = document.createElement('input');
      roleInput.type = 'hidden';
      roleInput.name = ROLE_ID;
      roleInput.value = formData.role;
      form.appendChild(roleInput);
      
      const teamSizeInput = document.createElement('input');
      teamSizeInput.type = 'hidden';
      teamSizeInput.name = TEAM_SIZE_ID;
      teamSizeInput.value = formData.teamSize;
      form.appendChild(teamSizeInput);
      
      const pipelinesInput = document.createElement('input');
      pipelinesInput.type = 'hidden';
      pipelinesInput.name = PIPELINES_ID;
      pipelinesInput.value = formData.pipelines;
      form.appendChild(pipelinesInput);
      
      // For checkboxes, we need to handle differently for Google Forms
      // Each checkbox value needs its own input
      if (formData.platforms.length > 0) {
        formData.platforms.forEach(platform => {
          const platformInput = document.createElement('input');
          platformInput.type = 'hidden';
          platformInput.name = PLATFORMS_ID;
          platformInput.value = platform;
          form.appendChild(platformInput);
        });
      } else {
        // Add an empty input if nothing selected
        const platformInput = document.createElement('input');
        platformInput.type = 'hidden';
        platformInput.name = PLATFORMS_ID;
        platformInput.value = '';
        form.appendChild(platformInput);
      }
      
      const challengesInput = document.createElement('input');
      challengesInput.type = 'hidden';
      challengesInput.name = CHALLENGES_ID;
      challengesInput.value = formData.currentChallenges;
      form.appendChild(challengesInput);
      
      const securityChallengesInput = document.createElement('input');
      securityChallengesInput.type = 'hidden';
      securityChallengesInput.name = SECURITY_CHALLENGES_ID;
      securityChallengesInput.value = formData.securityChallenges;
      form.appendChild(securityChallengesInput);
      
      // Handle security tools the same way as platforms (for checkboxes)
      if (formData.securityTools.length > 0) {
        formData.securityTools.forEach(tool => {
          const toolInput = document.createElement('input');
          toolInput.type = 'hidden';
          toolInput.name = TOOLS_ID;
          toolInput.value = tool;
          form.appendChild(toolInput);
        });
      } else {
        // Add an empty input if nothing selected
        const toolInput = document.createElement('input');
        toolInput.type = 'hidden';
        toolInput.name = TOOLS_ID;
        toolInput.value = '';
        form.appendChild(toolInput);
      }
      
      const howHeardInput = document.createElement('input');
      howHeardInput.type = 'hidden';
      howHeardInput.name = HOW_HEARD_ID;
      howHeardInput.value = formData.howHeard;
      form.appendChild(howHeardInput);
      
      // Add form to document and submit
      document.body.appendChild(form);
      form.submit();
      
      // Clean up after submission
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        teamSize: '',
        pipelines: '',
        platforms: [],
        currentChallenges: '',
        securityChallenges: '',
        securityTools: [],
        howHeard: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Mark field as touched when changed
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true,
      }));
    }
  };

  const handleMultiSelectChange = (item: string, field: 'platforms' | 'securityTools') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(p => p !== item)
        : [...prev[field], item],
    }));
    
    // Mark field as touched when changed
    if (!touched[field]) {
      setTouched(prev => ({
        ...prev,
        [field]: true,
      }));
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
          Thank you for your interest in PipeWarden!
        </h3>
        <p className="text-green-800 dark:text-green-200">
          We've received your application for the beta program. We'll review your submission and be in touch soon with next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        />
        {errors.name && touched.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        />
        {errors.email && touched.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="company"
          id="company"
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 ${errors.company ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        />
        {errors.company && touched.company && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.company}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Your Role <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="role"
          id="role"
          placeholder="e.g., DevOps Engineer, Security Lead, CTO"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 ${errors.role ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          onBlur={handleBlur}
          value={formData.role}
          onChange={handleChange}
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Development Team Size <span className="text-red-500">*</span>
        </label>
        <select
          name="teamSize"
          id="teamSize"
          className={`mt-1 block w-full py-2.5 px-4 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800/50 appearance-none bg-no-repeat bg-right ${errors.teamSize ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%235e72e4' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
            backgroundSize: '1.5em 1.5em', 
            paddingRight: '2.5rem', 
            backgroundPosition: 'right 0.75rem center',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease-in-out'
          }}
          value={formData.teamSize}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        >
          <option value="">Select...</option>
          <option value="1-5 developers">1-5 developers</option>
          <option value="6-20 developers">6-20 developers</option>
          <option value="21-50 developers">21-50 developers</option>
          <option value="50+ developers">50+ developers</option>
        </select>
        {errors.teamSize && touched.teamSize && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.teamSize}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="pipelines" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of CI/CD Pipelines <span className="text-red-500">*</span>
        </label>
        <select
          name="pipelines"
          id="pipelines"
          required
          className={`mt-1 block w-full py-2.5 px-4 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800/50 appearance-none bg-no-repeat bg-right ${errors.pipelines ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%235e72e4' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
            backgroundSize: '1.5em 1.5em', 
            paddingRight: '2.5rem', 
            backgroundPosition: 'right 0.75rem center',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease-in-out'
          }}
          value={formData.pipelines}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        >
          <option value="">Select...</option>
          <option value="1-5">1-5</option>
          <option value="6-20">6-20</option>
          <option value="21-50">21-50</option>
          <option value="50+">50+</option>
        </select>
        {errors.pipelines && touched.pipelines && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.pipelines}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CI/CD Platforms Used <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {cicdPlatforms.map((platform) => (
            <label
              key={platform}
              className={`
                flex items-center p-3 rounded-lg border cursor-pointer transition-colors
                ${formData.platforms.includes(platform)
                  ? 'bg-primary-50 dark:bg-primary-900 border-primary-500'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={formData.platforms.includes(platform)}
                onChange={() => handleMultiSelectChange(platform, 'platforms')}
                disabled={status === 'submitting'}
              />
              <span className={`text-sm ${
                formData.platforms.includes(platform)
                  ? 'text-primary-900 dark:text-primary-100'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {platform}
              </span>
            </label>
          ))}
        </div>
        {errors.platforms && touched.platforms && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.platforms}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Current Challenges
        </label>
        <textarea
          name="currentChallenges"
          id="currentChallenges"
          rows={3}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 ${errors.currentChallenges ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          value={formData.currentChallenges}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <label htmlFor="securityChallenges" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          What are your biggest security challenges with your CI/CD pipelines?
        </label>
        <textarea
          name="securityChallenges"
          id="securityChallenges"
          rows={3}
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 ${errors.securityChallenges ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          value={formData.securityChallenges}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Security Tools Currently Using
        </label>
        <div className="grid grid-cols-2 gap-2">
          {securityToolOptions.map((tool) => (
            <label
              key={tool}
              className={`
                flex items-center p-3 rounded-lg border cursor-pointer transition-colors
                ${formData.securityTools.includes(tool)
                  ? 'bg-primary-50 dark:bg-primary-900 border-primary-500'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={formData.securityTools.includes(tool)}
                onChange={() => handleMultiSelectChange(tool, 'securityTools')}
                disabled={status === 'submitting'}
              />
              <span className={`text-sm ${
                formData.securityTools.includes(tool)
                  ? 'text-primary-900 dark:text-primary-100'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {tool}
              </span>
            </label>
          ))}
        </div>
        {errors.securityTools && touched.securityTools && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.securityTools}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="howHeard" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          How did you hear about PipeWarden?
        </label>
        <select
          name="howHeard"
          id="howHeard"
          className={`mt-1 block w-full py-2.5 px-4 text-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800/50 appearance-none bg-no-repeat bg-right ${errors.howHeard ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%235e72e4' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
            backgroundSize: '1.5em 1.5em', 
            paddingRight: '2.5rem', 
            backgroundPosition: 'right 0.75rem center',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease-in-out'
          }}
          value={formData.howHeard}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={status === 'submitting'}
        >
          <option value="">Select...</option>
          <option value="Search Engine">Search Engine</option>
          <option value="Social Media">Social Media</option>
          <option value="AWS Marketplace">AWS Marketplace</option>
          <option value="Blog or Publication">Blog or Publication</option>
          <option value="Word of Mouth">Word of Mouth</option>
          <option value="Other">Other</option>
        </select>
        {errors.howHeard && touched.howHeard && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.howHeard}</p>
        )}
      </div>
      
      {status === 'error' && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors ${
          status === 'submitting'
            ? 'opacity-75 cursor-not-allowed'
            : 'hover:bg-primary-700'
        }`}
      >
        {status === 'submitting' ? 'Submitting...' : 'Apply for Beta Access'}
      </button>
    </form>
  );
}