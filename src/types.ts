export interface PresetPack {
  id: string;
  number: string;
  title: string;
  category: string;
  count: number;
  description: string;
  idealFor: string[];
  palette: string[];
  sampleImage: string;
  editedImage: string;
  featured?: boolean;
  filterStyle: {
    brightness: number;
    contrast: number;
    saturate: number;
    sepia: number;
    hueRotate: number;
  };
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  photographer: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  presetName: string;
  settings: {
    exposure: string;
    contrast: string;
    highlights: string;
    shadows: string;
    temp: string;
    vibrance: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  handle: string;
  location: string;
  rating: number;
  quote: string;
  favoritePack: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
