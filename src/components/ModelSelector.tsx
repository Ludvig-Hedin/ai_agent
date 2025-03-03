'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import { AIModelConfig } from '@/types';

interface ModelSelectorProps {
  models: AIModelConfig[];
  selectedModel: AIModelConfig;
  onModelChange: (model: AIModelConfig) => void;
  disabled?: boolean;
}

export default function ModelSelector({
  models,
  selectedModel,
  onModelChange,
  disabled = false,
}: ModelSelectorProps) {
  return (
    <div className="w-full">
      <label className="mb-1 block text-xs font-medium text-gray-400">AI Model</label>
      <Listbox value={selectedModel} onChange={onModelChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-lg border border-chatgpt-border bg-chatgpt-light py-2 pl-3 pr-10 text-left text-white shadow-sm hover:bg-chatgpt-light-hover focus:outline-none focus:ring-1 focus:ring-chatgpt-green disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center">
              <span className="block truncate">
                {selectedModel.name}
                <span className="ml-2 text-xs text-gray-400">({selectedModel.provider})</span>
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-chatgpt-light py-1 text-base shadow-lg border border-chatgpt-border focus:outline-none">
              {models.map((model) => (
                <Listbox.Option
                  key={model.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-chatgpt-light-hover text-white' : 'text-gray-300'
                    }`
                  }
                  value={model}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex flex-col">
                        <span className={`block truncate ${selected ? 'font-semibold text-white' : 'font-normal'}`}>
                          {model.name}
                        </span>
                        <span className="text-xs text-gray-400">{model.description}</span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-chatgpt-green">
                          <FiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
} 