'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  title: string
  description?: string
}

interface MultiStepFormProps {
  steps: Step[]
  currentStep: number
  onStepChange: (step: number) => void
  children: React.ReactNode
  onNext?: () => void
  onPrev?: () => void
  onSubmit?: () => void
  canGoNext?: boolean
  canGoPrev?: boolean
  isLastStep?: boolean
  nextLabel?: string
  prevLabel?: string
  submitLabel?: string
  className?: string
}

export function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  children,
  onNext,
  onPrev,
  onSubmit,
  canGoNext = true,
  canGoPrev = true,
  isLastStep = false,
  nextLabel = 'Next',
  prevLabel = 'Previous',
  submitLabel = 'Submit',
  className
}: MultiStepFormProps) {
  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-colors',
                  index <= currentStep
                    ? 'bg-btcl-primary border-btcl-primary text-white'
                    : 'border-gray-300 text-gray-500'
                )}
              >
                {index < currentStep ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <p className={cn(
                  'text-sm font-medium',
                  index <= currentStep ? 'text-btcl-primary' : 'text-gray-500'
                )}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-sm text-gray-500">{step.description}</p>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  'w-20 h-0.5 mx-4',
                  index < currentStep ? 'bg-btcl-primary' : 'bg-gray-300'
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        {children}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={!canGoPrev || currentStep === 0}
          className={currentStep === 0 ? 'invisible' : ''}
        >
          {prevLabel}
        </Button>
        
        <div className="flex space-x-4">
          {!isLastStep ? (
            <Button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
            >
              {nextLabel}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onSubmit}
              disabled={!canGoNext}
            >
              {submitLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}