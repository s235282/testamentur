import React from 'react';
import styled from 'styled-components';
import StepWrapper from './StepWrapper';
import { StepProps } from '../types';

const WishesContainer = styled.div`
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  min-height: 200px;
  resize: vertical;
  line-height: 1.6;
  
  &:focus {
    border-color: #0066cc;
    outline: none;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const ExamplesSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
`;

const ExamplesTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const ExampleItem = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #0066cc;
`;

const ExampleTitle = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ExampleText = styled.p`
  color: #666;
  font-style: italic;
  margin: 0;
`;

const HelpText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 1rem;
  line-height: 1.6;
`;

const OptionalNote = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #856404;
`;

const Step4SpecialWishes: React.FC<StepProps> = (props) => {
  const { data, onUpdate } = props;
  
  const handleWishesChange = (value: string) => {
    onUpdate({ specialWishes: value });
  };

  const examples = [
    {
      title: 'Særeje-klausul',
      text: 'Jeg ønsker at sikre, at min ægtefælle kan blive boende i vores fælles hjem, selvom jeg går bort først.'
    },
    {
      title: 'Specifikke gaver',
      text: 'Min datter skal have min mors ring, og min søn skal have min fars ure. Disse gaver skal gives før arvefordelingen.'
    },
    {
      title: 'Betingelser for arv',
      text: 'Mine børn skal have færdiggjort deres uddannelse, før de modtager deres arv.'
    },
    {
      title: 'Velgørenhed',
      text: 'Jeg ønsker at 10% af min arv går til Kræftens Bekæmpelse.'
    },
    {
      title: 'Personlige ønsker',
      text: 'Jeg ønsker en enkel begravelse og at mine venner og familie husker mig med glæde.'
    }
  ];

  return (
    <StepWrapper
      title="Særlige Ønsker"
      description="Tilføj eventuelle særlige ønsker eller instruktioner"
      {...props}
      canProceed={true}
    >
      <OptionalNote>
        <strong>Bemærk:</strong> Dette trin er valgfrit. Du kan springe det over, hvis du ikke har særlige ønsker.
      </OptionalNote>

      <WishesContainer>
        <TextArea
          value={data.specialWishes}
          onChange={(e) => handleWishesChange(e.target.value)}
          placeholder="Beskriv her dine særlige ønsker, instruktioner eller betingelser for din arv..."
        />
        
        <HelpText>
          Du kan beskrive særlige ønsker om begravelse, specifikke gaver til bestemte personer, 
          betingelser for arv, eller andre vigtige detaljer. Lad feltet være tomt, hvis du ikke har særlige ønsker.
        </HelpText>
      </WishesContainer>

      <ExamplesSection>
        <ExamplesTitle>Eksempler på særlige ønsker</ExamplesTitle>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Her er nogle eksempler på, hvad du kan skrive:
        </p>
        
        {examples.map((example, index) => (
          <ExampleItem key={index}>
            <ExampleTitle>{example.title}</ExampleTitle>
            <ExampleText>"{example.text}"</ExampleText>
          </ExampleItem>
        ))}
      </ExamplesSection>
    </StepWrapper>
  );
};

export default Step4SpecialWishes;
