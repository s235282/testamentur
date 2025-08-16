import React from 'react';
import styled from 'styled-components';
import { StepProps } from '../types';

const StepContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: #0066cc;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const StepTitle = styled.h2`
  color: #333;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  gap: 1rem;
`;

const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => 
    props.primary 
      ? '#0066cc' 
      : props.disabled 
        ? '#ccc' 
        : '#f0f0f0'
  };
  color: ${props => 
    props.primary 
      ? 'white' 
      : props.disabled 
        ? '#999' 
        : '#333'
  };
  min-width: 120px;
  
  &:hover:not(:disabled) {
    background-color: ${props => 
      props.primary 
        ? '#0052a3' 
        : '#e0e0e0'
    };
  }
`;

interface StepWrapperProps extends StepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  canProceed?: boolean;
}

const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canProceed = true
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <StepContainer>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      
      <StepHeader>
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </StepHeader>
      
      {children}
      
      <NavigationButtons>
        <Button 
          onClick={onPrevious}
          disabled={currentStep === 1}
        >
          Tilbage
        </Button>
        
        <Button 
          primary 
          onClick={onNext}
          disabled={!canProceed}
        >
          {currentStep === totalSteps ? 'Generer Testamente' : 'Næste'}
        </Button>
      </NavigationButtons>
    </StepContainer>
  );
};

export default StepWrapper;
