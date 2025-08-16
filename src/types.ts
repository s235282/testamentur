export interface PersonalInfo {
  firstName: string;
  lastName: string;
  cprNumber: string;
  address: string;
  postalCode: string;
  city: string;
  maritalStatus: 'gift' | 'ugift' | 'samlevende' | 'skilt' | 'enke';
}

export interface FamilyMember {
  name: string;
  relationship: 'barn' | 'ægtefælle' | 'samlever' | 'forælder' | 'søskende';
  cprNumber?: string;
}

export interface InheritanceDistribution {
  type: 'ægtefælle_arver_mest' | 'lige_fordeling_mellem_børn' | 'blandet_fordeling';
  spousePercentage?: number;
  childrenPercentage?: number;
  specialInstructions?: string;
}

export interface WillData {
  personalInfo: PersonalInfo;
  familyMembers: FamilyMember[];
  inheritanceDistribution: InheritanceDistribution;
  specialWishes: string;
  createdAt: Date;
}

export interface StepProps {
  data: WillData;
  onUpdate: (updates: Partial<WillData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
}
