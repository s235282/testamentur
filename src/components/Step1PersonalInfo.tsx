import React from 'react';
import styled from 'styled-components';
import StepWrapper from './StepWrapper';
import { StepProps, PersonalInfo } from '../types';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
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
  
  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    border-color: #0066cc;
    outline: none;
  }
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const HelpText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  font-style: italic;
`;

const Step1PersonalInfo: React.FC<StepProps> = (props) => {
  const { data, onUpdate } = props;
  
  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  const canProceed = () => {
    const { personalInfo } = data;
    return (
      personalInfo.firstName.trim() !== '' &&
      personalInfo.lastName.trim() !== '' &&
      personalInfo.cprNumber.trim() !== '' &&
      personalInfo.address.trim() !== '' &&
      personalInfo.postalCode.trim() !== '' &&
      personalInfo.city.trim() !== '' &&
      personalInfo.maritalStatus !== undefined
    );
  };

  return (
    <StepWrapper
      title="Personlige Oplysninger"
      description="Indtast dine grundlæggende oplysninger"
      {...props}
      canProceed={canProceed()}
    >
      <FormGrid>
        <FormGroup>
          <Label htmlFor="firstName">Fornavn *</Label>
          <Input
            id="firstName"
            type="text"
            value={data.personalInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Indtast dit fornavn"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="lastName">Efternavn *</Label>
          <Input
            id="lastName"
            type="text"
            value={data.personalInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Indtast dit efternavn"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cprNumber">CPR-nummer *</Label>
          <Input
            id="cprNumber"
            type="text"
            value={data.personalInfo.cprNumber}
            onChange={(e) => handleInputChange('cprNumber', e.target.value)}
            placeholder="DDMMÅÅ-XXXX"
            maxLength={11}
            required
          />
          <HelpText>Format: DDMMÅÅ-XXXX (f.eks. 150385-1234)</HelpText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="maritalStatus">Civilstand *</Label>
          <Select
            id="maritalStatus"
            value={data.personalInfo.maritalStatus || ''}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value as any)}
            required
          >
            <option value="">Vælg civilstand</option>
            <option value="gift">Gift</option>
            <option value="ugift">Ugift</option>
            <option value="samlevende">Samlevende</option>
            <option value="skilt">Skilt</option>
            <option value="enke">Enke/Enkemand</option>
          </Select>
        </FormGroup>

        <FullWidthGroup>
          <Label htmlFor="address">Adresse *</Label>
          <Input
            id="address"
            type="text"
            value={data.personalInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Indtast din adresse"
            required
          />
        </FullWidthGroup>

        <FormGroup>
          <Label htmlFor="postalCode">Postnummer *</Label>
          <Input
            id="postalCode"
            type="text"
            value={data.personalInfo.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            placeholder="1234"
            maxLength={4}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">By *</Label>
          <Input
            id="city"
            type="text"
            value={data.personalInfo.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Indtast bynavn"
            required
          />
        </FormGroup>
      </FormGrid>
    </StepWrapper>
  );
};

export default Step1PersonalInfo;
