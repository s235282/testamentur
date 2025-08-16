import React from 'react';
import styled from 'styled-components';
import StepWrapper from './StepWrapper';
import { StepProps, InheritanceDistribution } from '../types';

const OptionCard = styled.div<{ selected: boolean }>`
  border: 3px solid ${props => props.selected ? '#0066cc' : '#e0e0e0'};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  background-color: ${props => props.selected ? '#f0f8ff' : 'white'};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.selected ? '#0066cc' : '#0066cc'};
    background-color: ${props => props.selected ? '#f0f8ff' : '#f8f9fa'};
  }
`;

const OptionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const OptionDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const OptionExample = styled.div`
  background: #f8f9fa;
  border-left: 4px solid #0066cc;
  padding: 1rem;
  margin-top: 1rem;
  font-style: italic;
  color: #555;
`;

const CustomDistribution = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  
  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

const HelpText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  font-style: italic;
`;

const Step3InheritanceDistribution: React.FC<StepProps> = (props) => {
  const { data, onUpdate } = props;
  
  const handleDistributionChange = (type: InheritanceDistribution['type']) => {
    onUpdate({
      inheritanceDistribution: {
        ...data.inheritanceDistribution,
        type
      }
    });
  };

  const handleCustomChange = (field: keyof InheritanceDistribution, value: string | number) => {
    onUpdate({
      inheritanceDistribution: {
        ...data.inheritanceDistribution,
        [field]: value
      }
    });
  };

  const canProceed = () => {
    return data.inheritanceDistribution.type !== undefined;
  };

  const distributionOptions = [
    {
      type: 'ægtefælle_arver_mest' as const,
      title: 'Ægtefælle arver mest',
      description: 'Din ægtefælle eller samlever får den største del af arven, og børnene får resten.',
      example: 'F.eks.: Ægtefælle får 75% og børnene deler de resterende 25% ligeligt.'
    },
    {
      type: 'lige_fordeling_mellem_børn' as const,
      title: 'Lige fordeling mellem børn',
      description: 'Alle dine børn får lige store dele af arven.',
      example: 'F.eks.: Hvis du har 3 børn, får hver 33,33% af arven.'
    },
    {
      type: 'blandet_fordeling' as const,
      title: 'Blandet fordeling',
      description: 'Du kan specificere præcis, hvordan arven skal fordeles mellem ægtefælle og børn.',
      example: 'F.eks.: Ægtefælle får 60%, børnene deler de resterende 40% ligeligt.'
    }
  ];

  return (
    <StepWrapper
      title="Arvefordeling"
      description="Vælg hvordan din arv skal fordeles"
      {...props}
      canProceed={canProceed()}
    >
      <div>
        {distributionOptions.map((option) => (
          <OptionCard
            key={option.type}
            selected={data.inheritanceDistribution.type === option.type}
            onClick={() => handleDistributionChange(option.type)}
          >
            <OptionTitle>{option.title}</OptionTitle>
            <OptionDescription>{option.description}</OptionDescription>
            <OptionExample>{option.example}</OptionExample>
          </OptionCard>
        ))}
      </div>

      {data.inheritanceDistribution.type === 'blandet_fordeling' && (
        <CustomDistribution>
          <h3>Specificer fordeling</h3>
          <FormGrid>
            <FormGroup>
              <Label>Ægtefælles andel (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={data.inheritanceDistribution.spousePercentage || ''}
                onChange={(e) => handleCustomChange('spousePercentage', parseInt(e.target.value) || 0)}
                placeholder="F.eks. 60"
              />
              <HelpText>Indtast procentdel for ægtefælle/samlever</HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>Børnenes andel (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={data.inheritanceDistribution.childrenPercentage || ''}
                onChange={(e) => handleCustomChange('childrenPercentage', parseInt(e.target.value) || 0)}
                placeholder="F.eks. 40"
              />
              <HelpText>Indtast procentdel for børn (deles ligeligt)</HelpText>
            </FormGroup>
          </FormGrid>
          
          <FormGroup style={{ marginTop: '1rem' }}>
            <Label>Særlige instruktioner (valgfrit)</Label>
            <TextArea
              value={data.inheritanceDistribution.specialInstructions || ''}
              onChange={(e) => handleCustomChange('specialInstructions', e.target.value)}
              placeholder="Beskriv eventuelle særlige ønsker for fordelingen..."
            />
            <HelpText>F.eks. specifikke gaver eller betingelser</HelpText>
          </FormGroup>
        </CustomDistribution>
      )}
    </StepWrapper>
  );
};

export default Step3InheritanceDistribution;
