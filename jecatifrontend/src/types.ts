
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string; // Icon name reference
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  pricePerDay: number;
  image: string;
  category: 'heavy' | 'transport' | 'light';
  specs?: string[];
}

export interface ServiceRate {
  id: string;
  role: string;
  description: string;
  rate: string; // Display string e.g., "500 / day"
  priceNumeric?: number; // Number for calculation, optional if "Ask for Quote"
  unit: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  quote?: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}
