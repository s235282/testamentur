import React, { useEffect } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import { generatePDF } from '../utils/willGenerator';
import { StepProps } from '../types';

const DownloadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 1200px;
  min-height: 80vh;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #28a745;
  border-radius: 50%;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const DownloadButton = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #0052a3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const InfoBox = styled.div`
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const InfoTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const InfoList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  color: #666;
  line-height: 1.6;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
`;

const WarningBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: #856404;
  text-align: left;
`;

const WarningTitle = styled.h4`
  color: #856404;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const WarningText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const NewWillButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #218838;
  }
`;

const DonationSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2.5rem;
  margin: 2rem 0;
  color: white;
  text-align: center;
`;

const DonationTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const DonationText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const DonationButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #ff5252;
    transform: translateY(-2px);
  }
`;

const DonationInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Step6Download: React.FC<StepProps> = (props) => {
  const { data } = props;

  const downloadPDF = () => {
    const { doc, filename } = generatePDF(data);
    
    // Download the PDF
    doc.save(filename);
    
    // Clear data after download (simulating GDPR compliance)
    setTimeout(() => {
      // In a real app, you would clear the data from state/storage here
      console.log('Data cleared for GDPR compliance');
    }, 1000);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Auto-download after a short delay
    const timer = setTimeout(() => {
      downloadPDF();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DownloadContainer>
      <MainContent>
        <LeftSection>
          <SuccessIcon>✓</SuccessIcon>
          <Title>Dit testamente er klar!</Title>
          <Subtitle>
            Vi har genereret dit testamente baseret på de oplysninger, du har angivet. 
            Dokumentet downloades automatisk om få sekunder.
          </Subtitle>
          <DownloadButton onClick={downloadPDF}>
            Download Testamente (PDF)
          </DownloadButton>
        </LeftSection>

        <RightSection>
          <DonationSection>
            <DonationTitle>💝 Støt vores arbejde</DonationTitle>
            <DonationText>
              Vi har hjulpet dig med at oprette dit testamente gratis. Hvis du synes, 
              at denne service er værdifuld, kan du overveje at støtte os med en donation. 
              Det hjælper os med at holde servicen gratis for alle.
            </DonationText>
            
            <DonationInfo>
              <strong>MobilePay: 20290178</strong><br />
              Til Emil Sean Skovgaard
            </DonationInfo>
          </DonationSection>
        </RightSection>
      </MainContent>

      <InfoBox>
        <InfoTitle>Hvad skal du gøre nu?</InfoTitle>
        <InfoList>
          <InfoItem>Gem PDF-filen sikkert på din computer</InfoItem>
          <InfoItem>Print dokumentet ud på papir</InfoItem>
          <InfoItem>Kontakt en notar for at få dokumentet underskrevet</InfoItem>
          <InfoItem>Deponer det underskrevne testamente hos notaren</InfoItem>
          <InfoItem>Informer dine nærmeste om, at du har et testamente</InfoItem>
        </InfoList>
      </InfoBox>

      <WarningBox>
        <WarningTitle>⚠️ Vigtig information</WarningTitle>
        <WarningText>
          Dette er kun et udkast til et testamente. For at dokumentet skal være juridisk bindende, 
          skal det underskrives foran en notar med to vidner til stede. Vi anbefaler stærkt, 
          at du konsulterer en advokat for at sikre, at dit testamente er juridisk korrekt.
        </WarningText>
      </WarningBox>

      <div>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Vil du oprette et nyt testamente?
        </p>
        <NewWillButton onClick={() => window.location.reload()}>
          Start forfra
        </NewWillButton>
      </div>
    </DownloadContainer>
  );
};

export default Step6Download;
