import React, { useState } from 'react';

export function BetaForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    pipelines: '',
    platforms: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pipelines" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Pipelines
        </label>
        <select
          name="pipelines"
          id="pipelines"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          value={formData.pipelines}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="1-5">1-5</option>
          <option value="6-20">6-20</option>
          <option value="21-50">21-50</option>
          <option value="50+">50+</option>
        </select>
      </div>
      <div>
        <label htmlFor="platforms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred CI/CD Platforms
        </label>
        <input
          type="text"
          name="platforms"
          id="platforms"
          placeholder="e.g., GitHub Actions, Jenkins"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
          value={formData.platforms}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
      >
        Apply for Beta Access
      </button>
    </form>
  );
}