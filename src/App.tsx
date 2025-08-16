import React, { useState } from 'react';
import styled from 'styled-components';
import Step1PersonalInfo from './components/Step1PersonalInfo';
import Step2FamilyRelations from './components/Step2FamilyRelations';
import Step3InheritanceDistribution from './components/Step3InheritanceDistribution';
import Step4SpecialWishes from './components/Step4SpecialWishes';
import Step5Review from './components/Step5Review';
import Step6Download from './components/Step6Download';
import { WillData } from './types';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`;

const Header = styled.header`
  text-align: center;
  color: white;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const Disclaimer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin: 0 auto;
  max-width: 600px;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const initialWillData: WillData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    cprNumber: '',
    address: '',
    postalCode: '',
    city: '',
    maritalStatus: undefined as any
  },
  familyMembers: [],
  inheritanceDistribution: {
    type: undefined as any
  },
  specialWishes: '',
  createdAt: new Date()
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [willData, setWillData] = useState<WillData>(initialWillData);

  const totalSteps = 6;

  const handleUpdate = (updates: Partial<WillData>) => {
    setWillData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: willData,
      onUpdate: handleUpdate,
      onNext: handleNext,
      onPrevious: handlePrevious,
      currentStep,
      totalSteps
    };

    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo {...stepProps} />;
      case 2:
        return <Step2FamilyRelations {...stepProps} />;
      case 3:
        return <Step3InheritanceDistribution {...stepProps} />;
      case 4:
        return <Step4SpecialWishes {...stepProps} />;
      case 5:
        return <Step5Review {...stepProps} />;
      case 6:
        return <Step6Download {...stepProps} />;
      default:
        return <Step1PersonalInfo {...stepProps} />;
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>Testamentegenerator</Title>
        <Subtitle>Din sikre vej til et testamente</Subtitle>
        <Disclaimer>
          <strong>Bemærk:</strong> Dette er kun et udkast til et testamente. 
          For at dokumentet skal være juridisk bindende, skal det underskrives foran en notar. 
          Vi yder ikke juridisk rådgivning.
        </Disclaimer>
      </Header>

      {renderCurrentStep()}
    </AppContainer>
  );
};

export default App;
