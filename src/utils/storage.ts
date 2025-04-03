import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';

export interface StorageData {
  activities: Activity[];
  milestones: Milestone[];
  readinessAssessment: ReadinessAssessment;
}

export interface Activity {
  id: number;
  date: string;
  title: string;
  category: 'general-admin' | 'pecc-education' | 'mentor-meeting' | 'sim-prep' | 'sim-facilitation' | 'hospital-ed' | 'policies' | 'qi-pi' | 'collaborative' | 'staffing' | 'disaster' | 'injury-prevention' | 'equipment' | 'special-needs';
  hours: number;
  simulationType?: string;
  simulationParticipants?: number;
  feedbackSubmitted?: boolean;
  notes?: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: 'initial' | 'ongoing' | 'prs' | 'equipment' | 'patient-safety' | 'staffing' | 'policies' | 'qi';
  links?: {
    text: string;
    url: string;
  }[];
  subItems?: string[];
}

export interface ReadinessAssessment {
  contactInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    facilityName: string;
    facilityAddress: string;
    facilityCity: string;
    facilityZip: string;
  };
  facilityInfo: {
    has24HourED: boolean | undefined;
    hospitalType: string;
    otherHospitalType?: string;
    edConfiguration: string;
    otherEDConfig?: string;
  };
  traumaDesignation: {
    isTraumaCenter: boolean | undefined;
    verificationBodies: {
      acs: boolean | undefined;
      stateRegional: boolean | undefined;
    };
    adultLevel: string;
    pediatricLevel: string;
  };
  inpatientServices: {
    newbornNursery: boolean | undefined;
    nicu: boolean | undefined;
    picu: boolean | undefined;
    pediatricStepDown: boolean | undefined;
    pediatricWard: boolean | undefined;
    adultICU: boolean | undefined;
    adultStepDown: boolean | undefined;
    adultWard: boolean | undefined;
    childrenInAdultICU?: boolean | undefined;
    childrenInAdultStepDown?: boolean | undefined;
    childrenInAdultWard?: boolean | undefined;
  };
  administration: {
    physicianCoordinator: {
      hasCoordinator: boolean | undefined;
      type: string;
      hasDedicatedTime: boolean | undefined;
      scope: string;
    };
    nurseCoordinator: {
      hasCoordinator: boolean | undefined;
      type: string;
      hasDedicatedTime: boolean | undefined;
      scope: string;
    };
    hasPediatricED: boolean | undefined;
    hasPediatricInpatient: boolean | undefined;
    hasPediatricICU: boolean | undefined;
    hasPediatricSurgery: boolean | undefined;
  };
  personnel: {
    has24HourPhysician: boolean | undefined;
    hasPediatrician: boolean | undefined;
    hasPediatricEM: boolean | undefined;
    hasPediatricNurse: boolean | undefined;
    hasPediatricRT: boolean | undefined;
    hasPALS: boolean | undefined;
    hasENPC: boolean | undefined;
    hasTNCC: boolean | undefined;
    hasATLS: boolean | undefined;
  };
  qualityImprovement: {
    hasQIPlan: boolean | undefined;
    components: {
      trauma: boolean | undefined;
      emergency: boolean | undefined;
      inpatient: boolean | undefined;
      outpatient: boolean | undefined;
      transport: boolean | undefined;
      rehabilitation: boolean | undefined;
      childLife: boolean | undefined;
      socialWork: boolean | undefined;
      pastoralCare: boolean | undefined;
      familySupport: boolean | undefined;
      quality: boolean | undefined;
      research: boolean | undefined;
      education: boolean | undefined;
      disaster: boolean | undefined;
      injury: boolean | undefined;
    };
  };
  patientSafety: {
    weightInKg: boolean | undefined;
    weightRecordedInKg: boolean | undefined;
    vitalsRecorded: boolean | undefined;
    bloodPressureMonitoring: boolean | undefined;
    pulseOximetry: boolean | undefined;
    endTidalCO2: boolean | undefined;
    abnormalVitalsNotification: boolean | undefined;
    preCalculatedDosing: boolean | undefined;
    interpreterServices: boolean | undefined;
    consciousnessAssessment: boolean | undefined;
    painAssessment: boolean | undefined;
    hasPediatricSafety: boolean | undefined;
    hasPediatricMedication: boolean | undefined;
    hasPediatricEquipment: boolean | undefined;
    hasPediatricEnvironment: boolean | undefined;
    hasPediatricHandoff: boolean | undefined;
    hasPediatricTransfer: boolean | undefined;
    hasPediatricDischarge: boolean | undefined;
    hasPediatricFollowup: boolean | undefined;
  };
  policies: {
    triagePolicy: boolean | undefined;
    assessmentReassessment: boolean | undefined;
    immunizationAssessment: boolean | undefined;
    childMaltreatment: boolean | undefined;
    deathInED: boolean | undefined;
    radiationReduction: boolean | undefined;
    behavioralHealth: boolean | undefined;
    transferGuidelines: boolean | undefined;
    hasPediatricAdmission: boolean | undefined;
    hasPediatricTransfer: boolean | undefined;
    hasPediatricConsent: boolean | undefined;
    hasPediatricRestraint: boolean | undefined;
    hasPediatricTriage: boolean | undefined;
    hasPediatricPain: boolean | undefined;
    hasPediatricSedation: boolean | undefined;
    hasPediatricImaging: boolean | undefined;
  };
  familyCenteredCare: {
    hasPolicy: boolean | undefined;
    components: {
      decisionMaking: boolean | undefined;
      medicationSafety: boolean | undefined;
      familyPresence: boolean | undefined;
      education: boolean | undefined;
      bereavement: boolean | undefined;
    };
    hasFamilyPresence: boolean | undefined;
    hasFamilySupport: boolean | undefined;
    hasFamilyEducation: boolean | undefined;
    hasFamilyFeedback: boolean | undefined;
    hasCulturalCompetency: boolean | undefined;
    hasLanguageServices: boolean | undefined;
    hasInterpreter: boolean | undefined;
    hasTranslation: boolean | undefined;
  };
  disasterPlanning: {
    addressesChildren: boolean | undefined;
    components: {
      medicationsSupplies: boolean | undefined;
      decontamination: boolean | undefined;
      familyReunification: boolean | undefined;
      pediatricDrills: boolean | undefined;
      surgeCapacity: boolean | undefined;
      behavioralHealth: boolean | undefined;
      socialServices: boolean | undefined;
      specialNeeds: boolean | undefined;
    };
    hasPediatricDisaster: boolean | undefined;
    hasPediatricMassCasualty: boolean | undefined;
    hasPediatricEvacuation: boolean | undefined;
    hasPediatricShelter: boolean | undefined;
    hasPediatricSupplies: boolean | undefined;
    hasPediatricEquipment: boolean | undefined;
    hasPediatricMedications: boolean | undefined;
    hasPediatricStaff: boolean | undefined;
  };
  equipmentManagement: {
    hasPediatricInventory: boolean | undefined;
    hasPediatricMaintenance: boolean | undefined;
    hasPediatricCalibration: boolean | undefined;
    hasPediatricReplacement: boolean | undefined;
    hasPediatricTraining: boolean | undefined;
    hasPediatricCompetency: boolean | undefined;
    hasPediatricDocumentation: boolean | undefined;
    hasPediatricQuality: boolean | undefined;
  };
  monitoringEquipment: {
    hasPediatricStethoscope: boolean | undefined;
    hasPediatricBP: boolean | undefined;
    hasPediatricThermometer: boolean | undefined;
    hasPediatricScale: boolean | undefined;
    hasPediatricECG: boolean | undefined;
    hasPediatricPulse: boolean | undefined;
    hasPediatricETCO2: boolean | undefined;
    hasPediatricGlucose: boolean | undefined;
  };
  resuscitationEquipment: {
    gauge22: boolean | undefined;
    gauge24: boolean | undefined;
    ioNeedles: boolean | undefined;
    ivAdministration: boolean | undefined;
    hasPediatricBag: boolean | undefined;
    hasPediatricSuction: boolean | undefined;
    hasPediatricOxygen: boolean | undefined;
    hasPediatricDefibrillator: boolean | undefined;
    hasPediatricETT: boolean | undefined;
    hasPediatricLMA: boolean | undefined;
    hasPediatricIO: boolean | undefined;
    hasPediatricChest: boolean | undefined;
  };
  respiratoryEquipment: {
    hasPediatricNebulizer: boolean | undefined;
    hasPediatricSpacer: boolean | undefined;
    hasPediatricMetered: boolean | undefined;
    hasPediatricCPAP: boolean | undefined;
    hasPediatricVentilator: boolean | undefined;
    hasPediatricHighFlow: boolean | undefined;
    hasPediatricSuction: boolean | undefined;
    hasPediatricChest: boolean | undefined;
  };
  patientVolume: {
    totalPatients: string;
    pediatricVolume: 'low' | 'medium' | 'medium-high' | 'high';
    totalEDVisits: string;
    pediatricEDVisits: string;
    pediatricICUAdmissions: string;
    pediatricTraumaAdmissions: string;
  };
}

const STORAGE_PREFIX = 'impacts_';

const generateStorageKey = (email: string) => {
  return `${STORAGE_PREFIX}${email}`;
};

export const useUserStorage = () => {
  const { user } = useAuth();

  const saveData = useCallback((data: Partial<StorageData>) => {
    if (!user?.email) return;
    const key = generateStorageKey(user.email);
    const existingData = getData();
    const newData = {
      ...existingData,
      ...data
    };
    localStorage.setItem(key, JSON.stringify(newData));
  }, [user?.email]);

  const getData = useCallback((): StorageData => {
    if (!user?.email) {
      return {
        activities: [],
        milestones: [],
        readinessAssessment: {} as ReadinessAssessment
      };
    }

    const key = generateStorageKey(user.email);
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      return {
        activities: [],
        milestones: [],
        readinessAssessment: {} as ReadinessAssessment
      };
    }

    try {
      const parsedData = JSON.parse(storedData);
      return {
        activities: parsedData.activities || [],
        milestones: parsedData.milestones || [],
        readinessAssessment: parsedData.readinessAssessment || {} as ReadinessAssessment
      };
    } catch (e) {
      console.error('Error parsing stored data:', e);
      return {
        activities: [],
        milestones: [],
        readinessAssessment: {} as ReadinessAssessment
      };
    }
  }, [user?.email]);

  return { saveData, getData };
};

export const getReadinessAssessment = async (): Promise<ReadinessAssessment> => {
  try {
    const response = await fetch('/api/readiness-assessment');
    if (!response.ok) {
      throw new Error('Failed to fetch readiness assessment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching readiness assessment:', error);
    return {} as ReadinessAssessment;
  }
};

export const saveReadinessAssessment = async (assessment: ReadinessAssessment, userEmail: string): Promise<void> => {
  try {
    if (!userEmail) {
      throw new Error('No user email provided');
    }
    
    const key = generateStorageKey(userEmail);
    const storedData = localStorage.getItem(key);
    const existingData = storedData ? JSON.parse(storedData) : {
      activities: [],
      milestones: [],
      readinessAssessment: {} as ReadinessAssessment
    };
    
    const newData = {
      ...existingData,
      readinessAssessment: assessment
    };
    
    localStorage.setItem(key, JSON.stringify(newData));
  } catch (error) {
    console.error('Error saving readiness assessment:', error);
    throw error;
  }
}; 