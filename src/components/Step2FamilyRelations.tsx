import React, { useState } from 'react';
import styled from 'styled-components';
import StepWrapper from './StepWrapper';
import { StepProps, FamilyMember } from '../types';

const FamilyList = styled.div`
  margin-bottom: 2rem;
`;

const FamilyMemberCard = styled.div`
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #c82333;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
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

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background: #218838;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const HelpText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  font-style: italic;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-style: italic;
`;

const Step2FamilyRelations: React.FC<StepProps> = (props) => {
  const { data, onUpdate } = props;
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: 'barn',
    cprNumber: ''
  });

  const handleAddMember = () => {
    if (newMember.name && newMember.relationship) {
      const updatedMembers = [...data.familyMembers, newMember as FamilyMember];
      onUpdate({ familyMembers: updatedMembers });
      setNewMember({ name: '', relationship: 'barn', cprNumber: '' });
    }
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = data.familyMembers.filter((_, i) => i !== index);
    onUpdate({ familyMembers: updatedMembers });
  };

  const handleUpdateMember = (index: number, field: keyof FamilyMember, value: string) => {
    const updatedMembers = [...data.familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    onUpdate({ familyMembers: updatedMembers });
  };

  const canAddMember = () => {
    return (newMember.name?.trim() || '') !== '' && newMember.relationship;
  };

  const canProceed = () => {
    return data.familyMembers.length > 0;
  };

  return (
    <StepWrapper
      title="Familierelationer"
      description="Tilføj dine nærmeste familiemedlemmer"
      {...props}
      canProceed={canProceed()}
    >
      <FamilyList>
        {data.familyMembers.length === 0 ? (
          <EmptyState>
            Du har endnu ikke tilføjet nogen familiemedlemmer. 
            Tilføj mindst ét familiemedlem for at fortsætte.
          </EmptyState>
        ) : (
          data.familyMembers.map((member, index) => (
            <FamilyMemberCard key={index}>
              <RemoveButton onClick={() => handleRemoveMember(index)}>
                ×
              </RemoveButton>
              
              <FormGrid>
                <FormGroup>
                  <Label>Navn</Label>
                  <Input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleUpdateMember(index, 'name', e.target.value)}
                    placeholder="Indtast navn"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Relation</Label>
                  <Select
                    value={member.relationship}
                    onChange={(e) => handleUpdateMember(index, 'relationship', e.target.value as any)}
                  >
                    <option value="barn">Barn</option>
                    <option value="ægtefælle">Ægtefælle</option>
                    <option value="samlever">Samlever</option>
                    <option value="forælder">Forælder</option>
                    <option value="søskende">Søskende</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label>CPR-nummer (valgfrit)</Label>
                  <Input
                    type="text"
                    value={member.cprNumber || ''}
                    onChange={(e) => handleUpdateMember(index, 'cprNumber', e.target.value)}
                    placeholder="DDMMÅÅ-XXXX"
                    maxLength={11}
                  />
                  <HelpText>Hjælper med at identificere personen korrekt</HelpText>
                </FormGroup>
              </FormGrid>
            </FamilyMemberCard>
          ))
        )}
      </FamilyList>

      <div>
        <h3>Tilføj nyt familiemedlem</h3>
        <FormGrid>
          <FormGroup>
            <Label>Navn *</Label>
            <Input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="Indtast navn"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Relation *</Label>
            <Select
              value={newMember.relationship}
              onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value as any })}
            >
              <option value="barn">Barn</option>
              <option value="ægtefælle">Ægtefælle</option>
              <option value="samlever">Samlever</option>
              <option value="forælder">Forælder</option>
              <option value="søskende">Søskende</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>CPR-nummer (valgfrit)</Label>
            <Input
              type="text"
              value={newMember.cprNumber || ''}
              onChange={(e) => setNewMember({ ...newMember, cprNumber: e.target.value })}
              placeholder="DDMMÅÅ-XXXX"
              maxLength={11}
            />
          </FormGroup>
        </FormGrid>
        
        <AddButton onClick={handleAddMember} disabled={!canAddMember()}>
          Tilføj familiemedlem
        </AddButton>
      </div>
    </StepWrapper>
  );
};

export default Step2FamilyRelations;
