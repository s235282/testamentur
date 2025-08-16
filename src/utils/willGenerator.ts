import { WillData } from '../types';
import jsPDF from 'jspdf';

export const generateWillText = (data: WillData): string => {
  const today = new Date().toLocaleDateString('da-DK');
  
  const formatMaritalStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'gift': 'gift',
      'ugift': 'ugift',
      'samlevende': 'samlevende',
      'skilt': 'skilt',
      'enke': 'enke/enkemand'
    };
    return statusMap[status] || status;
  };

  const getSpouseText = () => {
    const spouse = data.familyMembers.find(m => m.relationship === 'ægtefælle' || m.relationship === 'samlever');
    return spouse ? spouse.name : 'min ægtefælle/samlever';
  };

  const getChildrenText = () => {
    const children = data.familyMembers.filter(m => m.relationship === 'barn');
    if (children.length === 0) return '';
    
    if (children.length === 1) {
      return `mit barn ${children[0].name}`;
    } else {
      const names = children.map(c => c.name);
      const last = names.pop();
      return `mine børn ${names.join(', ')} og ${last}`;
    }
  };

  const getDistributionText = () => {
    const { type, spousePercentage, childrenPercentage, specialInstructions } = data.inheritanceDistribution;
    
    switch (type) {
      case 'ægtefælle_arver_mest':
        return `Jeg ønsker, at ${getSpouseText()} arver den største del af min arv, og at mine børn får resten ligeligt fordelt mellem sig.`;
      
      case 'lige_fordeling_mellem_børn':
        const childrenText = getChildrenText();
        return childrenText ? `Jeg ønsker, at ${childrenText} arver lige store dele af min arv.` : 'Jeg ønsker lige fordeling af min arv mellem mine børn.';
      
      case 'blandet_fordeling':
        let text = `Jeg ønsker følgende fordeling af min arv: ${getSpouseText()} skal have ${spousePercentage || 0}% og mine børn skal dele de resterende ${childrenPercentage || 0}% ligeligt mellem sig.`;
        if (specialInstructions) {
          text += `\n\nSærlige instruktioner: ${specialInstructions}`;
        }
        return text;
      
      default:
        return 'Jeg ønsker standard arvefordeling efter dansk lov.';
    }
  };

  const willText = `TESTAMENTE

Dette testamente er udfærdiget den ${today} af:

${data.personalInfo.firstName} ${data.personalInfo.lastName}
CPR-nummer: ${data.personalInfo.cprNumber}
Adresse: ${data.personalInfo.address}
${data.personalInfo.postalCode} ${data.personalInfo.city}
Civilstand: ${formatMaritalStatus(data.personalInfo.maritalStatus)}

§ 1 - ARVEINDSÆTTELSE

Jeg, ${data.personalInfo.firstName} ${data.personalInfo.lastName}, erklærer hermed, at jeg ønsker at oprette et testamente til fordel for mine nærmeste familiemedlemmer.

§ 2 - FAMILIEMEDLEMMER

Mine nærmeste familiemedlemmer er:
${data.familyMembers.map((member, index) => 
  `${index + 1}. ${member.name} (${member.relationship})${member.cprNumber ? ` - CPR: ${member.cprNumber}` : ''}`
).join('\n')}

§ 3 - ARVEFORDELING

${getDistributionText()}

§ 4 - SÆRLIGE ØNSKER

${data.specialWishes.trim() || 'Ingen særlige ønsker er angivet.'}

§ 5 - UDSTEDELSE

Dette testamente skal udstedes i to eksemplarer, hvoraf det ene skal deponeres hos en notar.

§ 6 - GYLDIGHED

Dette testamente træder i kraft ved min død og skal følges i overensstemmelse med dansk arveret.

§ 7 - OPHÆVELSE

Jeg forbeholder mig retten til at ændre eller ophæve dette testamente når som helst.

Dette testamente er udfærdiget i fuldt bevidst tilstand og uden påvirkning fra andre.

${data.personalInfo.firstName} ${data.personalInfo.lastName}

Dato: ${today}

Sted: ${data.personalInfo.city}

---

BEMÆRK: Dette er kun et udkast til et testamente. For at dokumentet skal være juridisk bindende, skal det:
1. Underskrives foran en notar
2. Have to vidner til stede
3. Deponeres hos en notar

Vi anbefaler stærkt, at du konsulterer en advokat for at sikre, at dit testamente er juridisk korrekt og opfylder alle lovkrav.

Denne service yder ikke juridisk rådgivning og kan ikke garantere, at dokumentet er juridisk bindende.

Alle data slettes umiddelbart efter download af dokumentet i overensstemmelse med GDPR.`;

  return willText;
};

// Enhanced PDF generation with proper formatting and pagination
export const generatePDF = (data: WillData) => {
  const doc = new jsPDF();
  
  // Set margins and page dimensions
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const maxWidth = pageWidth - (2 * margin);
  
  let yPosition = margin;
  
  // Helper function to add text with pagination
  const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    const lineHeight = fontSize * 0.4;
    
    for (const line of lines) {
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    }
  };
  
  // Helper function to add spacing
  const addSpacing = (spacing: number = 5) => {
    yPosition += spacing;
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };
  
  // Title
  addText('TESTAMENTE', 18, true);
  addSpacing(10);
  
  // Date and personal info
  const today = new Date().toLocaleDateString('da-DK');
  addText(`Dette testamente er udfærdiget den ${today} af:`, 12);
  addSpacing(5);
  
  addText(`${data.personalInfo.firstName} ${data.personalInfo.lastName}`, 12, true);
  addText(`CPR-nummer: ${data.personalInfo.cprNumber}`, 12);
  addText(`Adresse: ${data.personalInfo.address}`, 12);
  addText(`${data.personalInfo.postalCode} ${data.personalInfo.city}`, 12);
  addText(`Civilstand: ${data.personalInfo.maritalStatus}`, 12);
  addSpacing(10);
  
  // Section 1
  addText('§ 1 - ARVEINDSÆTTELSE', 14, true);
  addSpacing(5);
  addText(`Jeg, ${data.personalInfo.firstName} ${data.personalInfo.lastName}, erklærer hermed, at jeg ønsker at oprette et testamente til fordel for mine nærmeste familiemedlemmer.`);
  addSpacing(10);
  
  // Section 2
  addText('§ 2 - FAMILIEMEDLEMMER', 14, true);
  addSpacing(5);
  addText('Mine nærmeste familiemedlemmer er:');
  addSpacing(3);
  
  data.familyMembers.forEach((member, index) => {
    const memberText = `${index + 1}. ${member.name} (${member.relationship})${member.cprNumber ? ` - CPR: ${member.cprNumber}` : ''}`;
    addText(memberText);
  });
  addSpacing(10);
  
  // Section 3
  addText('§ 3 - ARVEFORDELING', 14, true);
  addSpacing(5);
  
  const getDistributionText = () => {
    const { type, spousePercentage, childrenPercentage, specialInstructions } = data.inheritanceDistribution;
    
    switch (type) {
      case 'ægtefælle_arver_mest':
        const spouse = data.familyMembers.find(m => m.relationship === 'ægtefælle' || m.relationship === 'samlever');
        const spouseName = spouse ? spouse.name : 'min ægtefælle/samlever';
        return `Jeg ønsker, at ${spouseName} arver den største del af min arv, og at mine børn får resten ligeligt fordelt mellem sig.`;
      
      case 'lige_fordeling_mellem_børn':
        const children = data.familyMembers.filter(m => m.relationship === 'barn');
        if (children.length === 0) return 'Jeg ønsker lige fordeling af min arv mellem mine børn.';
        
        if (children.length === 1) {
          return `Jeg ønsker, at mit barn ${children[0].name} arver lige store dele af min arv.`;
        } else {
          const names = children.map(c => c.name);
          const last = names.pop();
          return `Jeg ønsker, at mine børn ${names.join(', ')} og ${last} arver lige store dele af min arv.`;
        }
      
      case 'blandet_fordeling':
        const spouse2 = data.familyMembers.find(m => m.relationship === 'ægtefælle' || m.relationship === 'samlever');
        const spouseName2 = spouse2 ? spouse2.name : 'min ægtefælle/samlever';
        let text = `Jeg ønsker følgende fordeling af min arv: ${spouseName2} skal have ${spousePercentage || 0}% og mine børn skal dele de resterende ${childrenPercentage || 0}% ligeligt mellem sig.`;
        if (specialInstructions) {
          text += `\n\nSærlige instruktioner: ${specialInstructions}`;
        }
        return text;
      
      default:
        return 'Jeg ønsker standard arvefordeling efter dansk lov.';
    }
  };
  
  addText(getDistributionText());
  addSpacing(10);
  
  // Section 4
  addText('§ 4 - SÆRLIGE ØNSKER', 14, true);
  addSpacing(5);
  addText(data.specialWishes.trim() || 'Ingen særlige ønsker er angivet.');
  addSpacing(10);
  
  // Section 5
  addText('§ 5 - UDSTEDELSE', 14, true);
  addSpacing(5);
  addText('Dette testamente skal udstedes i to eksemplarer, hvoraf det ene skal deponeres hos en notar.');
  addSpacing(10);
  
  // Section 6
  addText('§ 6 - GYLDIGHED', 14, true);
  addSpacing(5);
  addText('Dette testamente træder i kraft ved min død og skal følges i overensstemmelse med dansk arveret.');
  addSpacing(10);
  
  // Section 7
  addText('§ 7 - OPHÆVELSE', 14, true);
  addSpacing(5);
  addText('Jeg forbeholder mig retten til at ændre eller ophæve dette testamente når som helst.');
  addSpacing(10);
  
  // Declaration
  addText('Dette testamente er udfærdiget i fuldt bevidst tilstand og uden påvirkning fra andre.');
  addSpacing(15);
  
  // Signature
  addText(`${data.personalInfo.firstName} ${data.personalInfo.lastName}`, 12, true);
  addSpacing(5);
  addText(`Dato: ${today}`);
  addSpacing(3);
  addText(`Sted: ${data.personalInfo.city}`);
  addSpacing(15);
  
  // Separator
  addText('---');
  addSpacing(10);
  
  // Disclaimer
  addText('BEMÆRK: Dette er kun et udkast til et testamente. For at dokumentet skal være juridisk bindende, skal det:', 12, true);
  addSpacing(5);
  addText('1. Underskrives foran en notar');
  addText('2. Have to vidner til stede');
  addText('3. Deponeres hos en notar');
  addSpacing(10);
  
  addText('Vi anbefaler stærkt, at du konsulterer en advokat for at sikre, at dit testamente er juridisk korrekt og opfylder alle lovkrav.');
  addSpacing(5);
  addText('Denne service yder ikke juridisk rådgivning og kan ikke garantere, at dokumentet er juridisk bindende.');
  addSpacing(5);
  addText('Alle data slettes umiddelbart efter download af dokumentet i overensstemmelse med GDPR.');
  
  // Generate filename
  const filename = `testamente_${data.personalInfo.firstName}_${data.personalInfo.lastName}_${new Date().toISOString().split('T')[0]}.pdf`;
  
  return { doc, filename };
};
