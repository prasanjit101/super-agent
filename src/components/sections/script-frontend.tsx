import React, { useState } from 'react';
import { FormConfig, Input } from '@/types/script-frontend.types';
import { Button } from '../ui/button';

const FormRenderer: React.FC<{
  config: FormConfig;
  onSubmit: (values: Record<string, any>) => void;
}> = ({ config, onSubmit }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    // Initialize with default values
    return config.inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.name]: input.type === 'number' ? 0 : '',
      }),
      {},
    );
  });

  const handleInputChange = (name: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderInput = (input: Input) => {
    switch (input.type) {
      case 'number':
        return (
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor={input.name}
            >
              {input.label}
            </label>
            <input
              type="number"
              id={input.name}
              className="w-full rounded-md border px-3 py-2"
              value={formValues[input.name]}
              onChange={(e) =>
                handleInputChange(input.name, parseFloat(e.target.value))
              }
              //   min={input.validation?.min}
              //   max={input.validation?.max}
              //   step={input.validation?.step}
            />
          </div>
        );

      case 'select':
        return (
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor={input.name}
            >
              {input.label}
            </label>
            <select
              id={input.name}
              className="w-full rounded-md border px-3 py-2"
              value={formValues[input.name]}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
            >
              {input.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return (
          <div className="mb-4">
            <label
              className="mb-1 block text-sm font-medium"
              htmlFor={input.name}
            >
              {input.label}
            </label>
            <input
              type="text"
              id={input.name}
              className="w-full rounded-md border px-3 py-2"
              value={formValues[input.name]}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
            />
          </div>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-2 text-2xl font-bold">{config.title}</h1>
      <p className="mb-6 text-gray-600">{config.description}</p>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${config.layout.columns}, 1fr)`,
            gap:
              config.layout.spacing === 'small'
                ? '1rem'
                : config.layout.spacing === 'medium'
                  ? '1.5rem'
                  : '2rem',
          }}
        >
          {config.inputs.map((input) => (
            <div key={input.name}>{renderInput(input)}</div>
          ))}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormRenderer;
