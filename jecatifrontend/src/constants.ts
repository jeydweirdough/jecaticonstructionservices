
import type { Service, Project, Equipment, TeamMember, NavItem, Statistic, ServiceRate } from './types';

// Navigation
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

// Services
export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Concrete Demolition',
    description: 'We offer expert concrete demolition services for residential and commercial projects using advanced tools.',
    icon: 'Hammer',
    image: 'https://picsum.photos/id/101/600/400'
  },
  {
    id: 's2',
    title: 'Construction Service',
    description: 'Our construction labor services provide skilled and unskilled labor for various construction projects.',
    icon: 'HardHat',
    image: 'https://picsum.photos/id/102/600/400'
  },
  {
    id: 's3',
    title: 'Backhoe On Hire',
    description: 'Our backhoe rental service offers reliable and well-maintained backhoes for your construction needs.',
    icon: 'Truck',
    image: 'https://picsum.photos/id/103/600/400'
  },
  {
    id: 's4',
    title: 'Stump Removal',
    description: 'We offer comprehensive stump removal services to clear your land and prepare it for construction.',
    icon: 'TreeDeciduous',
    image: 'https://picsum.photos/id/104/600/400'
  },
  {
    id: 's5',
    title: 'Transport Equipment',
    description: 'Our transport equipment rental service includes mini dump trucks for hauling materials and debris.',
    icon: 'Truck',
    image: 'https://picsum.photos/id/105/600/400'
  }
];

// Projects
export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Digging Foundation Hole',
    category: 'Excavation',
    location: 'Molino III, Bacoor Cavite, Philippines',
    image: 'https://picsum.photos/id/201/800/600'
  },
  {
    id: 'p2',
    title: 'Removing Ground Layers',
    category: 'Excavation',
    location: 'Talon Uno, Las Pinas, Philippines',
    image: 'https://picsum.photos/id/202/800/600'
  },
  {
    id: 'p3',
    title: 'Creating Underground Space',
    category: 'Excavation',
    location: 'Panapaan, Bacoor Cavite, Philippines',
    image: 'https://picsum.photos/id/203/800/600'
  },
  {
    id: 'p4',
    title: 'Excavating Site Area',
    category: 'Excavation',
    location: 'Talon Uno, Las Pinas, Philippines',
    image: 'https://picsum.photos/id/204/800/600'
  },
  {
    id: 'p5',
    title: 'Clearing Construction Site',
    category: 'Clearing',
    location: 'Salawag, Dasma Cavite, Philippines',
    image: 'https://picsum.photos/id/206/800/600'
  },
  {
    id: 'p6',
    title: 'Digging Structural Base',
    category: 'Excavation',
    location: 'Maharlika, Imus Cavite, Philippines',
    image: 'https://picsum.photos/id/208/800/600'
  }
];

// Equipment Pricing
export const EQUIPMENT: Equipment[] = [
  {
    id: 'e1',
    name: 'Komatsu',
    model: 'Excavator PC 20',
    pricePerDay: 12000,
    category: 'heavy',
    image: 'https://picsum.photos/id/301/500/500',
    specs: ['Bucket Capacity: 0.09 m3', 'Operating Weight: 3 Tons']
  },
  {
    id: 'e2',
    name: 'Komatsu',
    model: 'Excavator PC 30',
    pricePerDay: 13500,
    category: 'heavy',
    image: 'https://picsum.photos/id/302/500/500',
    specs: ['Bucket Capacity: 0.11 m3', 'Operating Weight: 3.5 Tons']
  },
  {
    id: 'e3',
    name: 'Komatsu',
    model: 'Excavator PC 60',
    pricePerDay: 16000,
    category: 'heavy',
    image: 'https://picsum.photos/id/304/500/500',
    specs: ['Bucket Capacity: 0.25 m3', 'Operating Weight: 6.3 Tons']
  },
  {
    id: 'e4',
    name: 'Caterpillar',
    model: 'D6 Bulldozer',
    pricePerDay: 25000,
    category: 'heavy',
    image: 'https://picsum.photos/id/305/500/500',
    specs: ['Blade Width: 3.2m', 'Net Power: 120 kW']
  },
  {
    id: 'e5',
    name: 'Isuzu',
    model: 'Mini Dump Truck',
    pricePerDay: 5000,
    category: 'transport',
    image: 'https://picsum.photos/id/306/500/500',
    specs: ['Load Capacity: 3 Tons', '4-Wheeler']
  },
  {
    id: 'e6',
    name: 'Bobcat',
    model: 'Skid Steer S450',
    pricePerDay: 9000,
    category: 'light',
    image: 'https://picsum.photos/id/307/500/500',
    specs: ['Rated Operating Capacity: 608kg', 'Tipping Load: 1215kg']
  },
  {
    id: 'e7',
    name: 'Hitachi',
    model: 'Zaxis 200',
    pricePerDay: 22000,
    category: 'heavy',
    image: 'https://picsum.photos/id/308/500/500',
    specs: ['Bucket Capacity: 0.8 m3', 'Operating Weight: 20 Tons']
  },
  {
    id: 'e8',
    name: 'Sakai',
    model: 'Vibratory Roller',
    pricePerDay: 8500,
    category: 'heavy',
    image: 'https://picsum.photos/id/309/500/500',
    specs: ['Drum Width: 1.7m', 'Centrifugal Force: 260 kN']
  }
];

export const LABOR_RATES: ServiceRate[] = [
  {
    id: 'l1',
    role: 'Skilled Labor',
    description: 'Experienced masons, carpenters, or welders.',
    rate: '800',
    priceNumeric: 800,
    unit: 'per day',
    image: 'https://picsum.photos/id/401/400/300'
  },
  {
    id: 'l2',
    role: 'Helper / Laborer',
    description: 'General construction assistance and site clearing.',
    rate: '600',
    priceNumeric: 600,
    unit: 'per day',
    image: 'https://picsum.photos/id/402/400/300'
  },
  {
    id: 'l3',
    role: 'Site Foreman',
    description: 'Project supervision and team management.',
    rate: '1,200',
    priceNumeric: 1200,
    unit: 'per day',
    image: 'https://picsum.photos/id/403/400/300'
  },
  {
    id: 'l4',
    role: 'Demolition Works',
    description: 'Concrete breaking and debris removal.',
    rate: 'Ask for Quote',
    unit: 'per project',
    image: 'https://picsum.photos/id/404/400/300'
  }
];

// Stats
export const STATS: Statistic[] = [
  { label: 'Completed Projects', value: '756+', icon: 'Home' },
  { label: 'Happy Customers', value: '1672', icon: 'User' },
  { label: 'Years Experience', value: '07+', icon: 'Clock' },
  { label: 'Qualified Engineers', value: '45+', icon: 'Award' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Rygs Tiu',
    role: 'Manager',
    image: 'https://picsum.photos/id/1005/300/300',
    quote: "We believe that the construction process should be as smooth and hassle-free as possible."
  }
];

export const CONTACT_INFO = {
  phone: '0928 1808 210',
  phoneAlt: '0918 9065 202',
  email: 'plukgeoffreylozenztiu@gmail.com',
  address: 'Lot 25 Block 12 Green Valley Subdivision, San Nicholas III 4102 Bacoor, Cavite'
};
