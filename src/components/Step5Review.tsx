import React from 'react';
import styled from 'styled-components';
import StepWrapper from './StepWrapper';
import { StepProps } from '../types';

const ReviewSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
`;

const SectionTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #0066cc;
  padding-bottom: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
`;

const InfoValue = styled.span`
  color: #666;
`;

const FamilyMemberItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border-left: 4px solid #0066cc;
`;

const DistributionInfo = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

const WishesText = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 6px;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const EmptyWishes = styled.div`
  font-style: italic;
  color: #999;
`;

const WarningBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: #856404;
`;

const WarningTitle = styled.h4`
  color: #856404;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const WarningList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
`;

const WarningItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

const Step5Review: React.FC<StepProps> = (props) => {
  const { data } = props;
  
  const formatMaritalStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'gift': 'Gift',
      'ugift': 'Ugift',
      'samlevende': 'Samlevende',
      'skilt': 'Skilt',
      'enke': 'Enke/Enkemand'
    };
    return statusMap[status] || status;
  };

  const formatDistributionType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'ægtefælle_arver_mest': 'Ægtefælle arver mest',
      'lige_fordeling_mellem_børn': 'Lige fordeling mellem børn',
      'blandet_fordeling': 'Blandet fordeling'
    };
    return typeMap[type] || type;
  };

  const getDistributionDetails = () => {
    const { type, spousePercentage, childrenPercentage, specialInstructions } = data.inheritanceDistribution;
    
    switch (type) {
      case 'ægtefælle_arver_mest':
        return 'Din ægtefælle/samlever får den største del af arven, og børnene får resten ligeligt fordelt.';
      case 'lige_fordeling_mellem_børn':
        return 'Alle dine børn får lige store dele af arven.';
      case 'blandet_fordeling':
        let details = `Ægtefælle/samlever: ${spousePercentage || 0}%, Børn: ${childrenPercentage || 0}%`;
        if (specialInstructions) {
          details += `\nSærlige instruktioner: ${specialInstructions}`;
        }
        return details;
      default:
        return 'Ikke specificeret';
    }
  };

  return (
    <StepWrapper
      title="Gennemgang"
      description="Gennemgå alle dine oplysninger før vi genererer dit testamente"
      {...props}
      canProceed={true}
    >
      <WarningBox>
        <WarningTitle>⚠️ Vigtig information</WarningTitle>
        <WarningList>
          <WarningItem>
            Dette er kun et udkast til et testamente og er ikke juridisk bindende.
          </WarningItem>
          <WarningItem>
            Du skal have dokumentet underskrevet foran en notar for at det bliver gyldigt.
          </WarningItem>
          <WarningItem>
            Vi yder ikke juridisk rådgivning - kontakt en advokat for professionel hjælp.
          </WarningItem>
          <WarningItem>
            Alle data slettes umiddelbart efter download af dokumentet.
          </WarningItem>
        </WarningList>
      </WarningBox>

      <ReviewSection>
        <SectionTitle>Personlige Oplysninger</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Navn:</InfoLabel>
            <InfoValue>{data.personalInfo.firstName} {data.personalInfo.lastName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>CPR-nummer:</InfoLabel>
            <InfoValue>{data.personalInfo.cprNumber}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Adresse:</InfoLabel>
            <InfoValue>{data.personalInfo.address}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Postnummer og by:</InfoLabel>
            <InfoValue>{data.personalInfo.postalCode} {data.personalInfo.city}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Civilstand:</InfoLabel>
            <InfoValue>{formatMaritalStatus(data.personalInfo.maritalStatus)}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </ReviewSection>

      <ReviewSection>
        <SectionTitle>Familierelationer</SectionTitle>
        {data.familyMembers.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Ingen familiemedlemmer tilføjet</p>
        ) : (
          data.familyMembers.map((member, index) => (
            <FamilyMemberItem key={index}>
              <InfoLabel>Navn:</InfoLabel>
              <InfoValue>{member.name}</InfoValue>
              <br />
              <InfoLabel>Relation:</InfoLabel>
              <InfoValue>{member.relationship}</InfoValue>
              {member.cprNumber && (
                <>
                  <br />
                  <InfoLabel>CPR:</InfoLabel>
                  <InfoValue>{member.cprNumber}</InfoValue>
                </>
              )}
            </FamilyMemberItem>
          ))
        )}
      </ReviewSection>

      <ReviewSection>
        <SectionTitle>Arvefordeling</SectionTitle>
        <DistributionInfo>
          <InfoLabel>Type:</InfoLabel>
          <InfoValue>{formatDistributionType(data.inheritanceDistribution.type || '')}</InfoValue>
          <br />
          <InfoLabel>Detaljer:</InfoLabel>
          <InfoValue>{getDistributionDetails()}</InfoValue>
        </DistributionInfo>
      </ReviewSection>

      <ReviewSection>
        <SectionTitle>Særlige Ønsker</SectionTitle>
        {data.specialWishes.trim() ? (
          <WishesText>{data.specialWishes}</WishesText>
        ) : (
          <EmptyWishes>Ingen særlige ønsker angivet</EmptyWishes>
        )}
      </ReviewSection>
    </StepWrapper>
  );
};

export default Step5Review;
