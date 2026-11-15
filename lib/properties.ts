
export type Property = {
  id: string;
  slug: string;
  name: string;
  city: string;
  destination: string;
  bedrooms: number | null;
  bathrooms: number | null;
  maxGuests?: number;
  nightlyRate: number;
  description: string;
  coverPhoto: string;
  gallery: string[];
  amenities: string[];
  featured: boolean;
  available: boolean;
};

// Central property database
export const PROPERTY_DATA: Property[] = [
  {
    id: "1",
    slug: "miami-home",
    name: "Downtown Miami Residence",
    city: "Miami",
    destination: "Florida",
    bedrooms: 2,
    bathrooms: 2.5,
    nightlyRate: 250,
    description:
      "A comfortable Miami residence offering spacious interiors and convenient access to the city's attractions.",
    coverPhoto: "/images/picture/IMG_1.jpg",
    gallery: [
      "/images/picture/IMG_1.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "2",
    slug: "las-olas",
    name: "Las Olas Isle Retreat",
    city: "Fort Lauderdale",
    destination: "Florida",
    bedrooms: 2,
    bathrooms: 2,
    nightlyRate: 250,
    description:
      "A welcoming retreat in Fort Lauderdale, ideal for guests seeking comfort and convenient city access.",
    coverPhoto: "/images/picture/IMG_2.jpg",
    gallery: [
      "/images/picture/IMG_2.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "3",
    slug: "pinecrest",
    name: "Pinecrest Family Estate",
    city: "Pinecrest",
    destination: "Florida",
    bedrooms: 5,
    bathrooms: 6,
    nightlyRate: 475,
    description:
      "A spacious family estate featuring five bedrooms, six bathrooms and a confirmed swimming pool.",
    coverPhoto: "/images/picture/IMG_3.jpg",
    gallery: [
      "/images/picture/IMG_3.jpg",
    ],
    amenities: ["Swimming Pool"],
    featured: true,
    available: true,
  },
  {
    id: "4",
    slug: "pinecrest-contemporary",
    name: "Pinecrest Contemporary Retreat",
    city: "Pinecrest",
    destination: "Florida",
    bedrooms: 7,
    bathrooms: 10,
    nightlyRate: 600,
    description:
      "Luxury 7-bedroom contemporary estate featuring spacious interiors, chef’s kitchen, private theater, entertainment room, heated infinity",
    coverPhoto: "/images/picture/IMG_4.jpg",
    gallery: [
      "/images/picture/IMG_4.jpg",
    ],
    amenities: ["Chef Kitchen"],
    featured: true,
    available: true,
  },
  {
    id: "5",
    slug: "los-angeles",
    name: "Los Angeles Signature Home",
    city: "Los Angeles",
    destination: "California",
    bedrooms: 7,
    bathrooms: 8,
    nightlyRate: 450,
    description:
      "A spacious signature residence in Los Angeles, designed for comfortable group and family stays.",
    coverPhoto: "/images/picture/IMG_5.jpg",
    gallery: [
      "/images/picture/IMG_5.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "6",
    slug: "miami-residence",
    name: "Miami Six-Bedroom Residence",
    city: "Miami",
    destination: "Florida",
    bedrooms: 6,
    bathrooms: 9,
    nightlyRate: 550,
    description:
      "An expansive Miami residence featuring six bedrooms and nine bathrooms.",
    coverPhoto: "/images/picture/IMG_6.jpg",
    gallery: [
      "/images/picture/IMG_6.jpg",
    ],
    amenities: [],
    featured: true,
    available: true,
  },
  {
    id: "7",
    slug: "miami-seven",
    name: "Miami Seven-Bedroom Residence",
    city: "Miami",
    destination: "Florida",
    bedrooms: 7,
    bathrooms: 8.5,
    nightlyRate: 455,
    description:
      "A spacious seven-bedroom Miami home offering generous accommodation for larger groups.",
    coverPhoto: "/images/picture/IMG_7.jpg",
    gallery: [
      "/images/picture/IMG_7.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "8",
    slug: "eado-houston-townhome",
    name: "EaDo Houston Townhome",
    city: "Houston",
    destination: "Texas",
    bedrooms: 4,
    bathrooms: 4,
    nightlyRate: 400,
    description:
      "A four-bedroom Houston townhome with comfortable accommodation and spacious interiors.",
    coverPhoto: "/images/picture/IMG_8.jpg",
    gallery: [
      "/images/picture/IMG_8.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "9",
    slug: "highlands-lohi-denver-home",
    name: "Highlands / LoHi Denver Home",
    city: "Denver",
    destination: "Colorado",
    bedrooms: 4,
    bathrooms: 5,
    nightlyRate: 385,
    description:
      "A welcoming Denver home with four bedrooms and five bathrooms for a comfortable stay.",
    coverPhoto: "/images/picture/IMG_9.jpg",
    gallery: [
      "/images/picture/IMG_9.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "10",
    slug: "summerhill-atlanta-home",
    name: "Summerhill Atlanta Home",
    city: "Atlanta",
    destination: "Georgia",
    bedrooms: 5,
    bathrooms: 4,
    nightlyRate: 400,
    description:
      "A five-bedroom Atlanta residence offering comfortable spaces for families and groups.",
    coverPhoto: "/images/picture/IMG_10.jpg",
    gallery: [
      "/images/picture/IMG_10.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "11",
    slug: "shadyside-pittsburgh-home",
    name: "Shadyside Pittsburgh Home",
    city: "Pittsburgh",
    destination: "Pennsylvania",
    bedrooms: 3,
    bathrooms: 4,
    nightlyRate: 350,
    description:
      "A comfortable three-bedroom residence in Pittsburgh with four bathrooms.",
    coverPhoto: "/images/picture/IMG_11.jpg",
    gallery: [
      "/images/picture/IMG_11.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "12",
    slug: "uptown-dallas-residence",
    name: "Uptown Dallas Residence",
    city: "Dallas",
    destination: "Texas",
    bedrooms: 3,
    bathrooms: 3.5,
    nightlyRate: 300,
    description:
      "A contemporary Dallas residence with three bedrooms and thoughtfully arranged living spaces.",
    coverPhoto: "/images/picture/IMG_12.jpg",
    gallery: [
      "/images/picture/IMG_12.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "13",
    slug: "san-francisco-signature-home",
    name: "San Francisco Signature Home",
    city: "San Francisco",
    destination: "California",
    bedrooms: 5,
    bathrooms: 5.5,
    nightlyRate: 600,
    description:
      "A signature five-bedroom San Francisco residence offering spacious accommodation.",
    coverPhoto: "/images/picture/IMG_13.jpg",
    gallery: [
      "/images/picture/IMG_13.jpg",
    ],
    amenities: [],
    featured: true,
    available: true,
  },
  {
    id: "14",
    slug: "fort-lauderdale-four-bedroom-home",
    name: "Fort Lauderdale Four-Bedroom Home",
    city: "Fort Lauderdale",
    destination: "Florida",
    bedrooms: 4,
    bathrooms: 6,
    nightlyRate: 485,
    description:
      "A spacious Fort Lauderdale home featuring four bedrooms and six bathrooms.",
    coverPhoto: "/images/picture/IMG_14.jpg",
    gallery: [
      "/images/picture/IMG_14.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "15",
    slug: "miami-eight-bath-residence",
    name: "Miami Eight-Bath Residence",
    city: "Miami",
    destination: "Florida",
    bedrooms: 6,
    bathrooms: 8,
    nightlyRate: 505,
    description:
      "An expansive six-bedroom Miami residence with eight bathrooms and generous accommodation.",
    coverPhoto: "/images/picture/IMG_31.jpg",
    gallery: [
      "/images/picture/IMG_31.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "16",
    slug: "ottawa-signature-home",
    name: "Ottawa Signature Home",
    city: "Ottawa",
    destination: "Ontario, Canada",
    bedrooms: 5,
    bathrooms: 5,
    nightlyRate: 400,
    description:
      "A spacious five-bedroom signature residence in Ottawa, suitable for families and groups.",
    coverPhoto: "/images/picture/IMG_15.jpg",
    gallery: [
      "/images/picture/IMG_15.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "17",
    slug: "the-nashville-castle",
    name: "The Nashville Castle",
    city: "Nashville",
    destination: "Tennessee",
    bedrooms: null,
    bathrooms: null,
    nightlyRate: 1000,
    description:
      "An exclusive Nashville property. Bedroom and bathroom details are awaiting confirmation.",
    coverPhoto: "/images/picture/IMG_16.jpg",
    gallery: [
      "/images/picture/IMG_16.jpg",
    ],
    amenities: [],
    featured: true,
    available: true,
  },
  {
    id: "18",
    slug: "austin-five-bedroom-home",
    name: "Austin Five-Bedroom Home",
    city: "Austin",
    destination: "Texas",
    bedrooms: 5,
    bathrooms: 8,
    nightlyRate: 850,
    description:
      "A spacious Austin residence featuring five bedrooms and eight bathrooms.",
    coverPhoto: "/images/picture/IMG_17.jpg",
    gallery: [
      "/images/picture/IMG_17.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "19",
    slug: "houston-signature-estate",
    name: "Houston Signature Estate",
    city: "Houston",
    destination: "Texas",
    bedrooms: 5,
    bathrooms: 6,
    nightlyRate: 1000,
    description:
      "A premium Houston estate with five bedrooms and six bathrooms for an elevated stay.",
    coverPhoto: "/images/picture/IMG_18.jpg",
    gallery: [
      "/images/picture/IMG_18.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "20",
    slug: "miami-beach-mansion",
    name: "Miami Beach Mansion",
    city: "Miami Beach",
    destination: "Florida",
    bedrooms: 6,
    bathrooms: 11,
    nightlyRate: 1350,
    description:
      "An expansive Miami Beach mansion featuring six bedrooms and eleven bathrooms.",
    coverPhoto: "/images/picture/IMG_19.jpg",
    gallery: [
      "/images/picture/IMG_19.jpg",
    ],
    amenities: [],
    featured: true,
    available: true,
  },
  {
    id: "21",
    slug: "calgary-signature-home",
    name: "Calgary Signature Home",
    city: "Calgary",
    destination: "Alberta, Canada",
    bedrooms: 5,
    bathrooms: 6,
    nightlyRate: 450,
    description:
      "A five-bedroom Calgary residence offering generous space for a comfortable stay.",
    coverPhoto: "/images/picture/IMG_20.jpg",
    gallery: [
      "/images/picture/IMG_20.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "22",
    slug: "austin-three-bedroom-home",
    name: "Austin Three-Bedroom Home",
    city: "Austin",
    destination: "Texas",
    bedrooms: 3,
    bathrooms: 5,
    nightlyRate: 400,
    description:
      "A comfortable Austin residence featuring three bedrooms and five bathrooms.",
    coverPhoto: "/images/picture/IMG_21.jpg",
    gallery: [
      "/images/picture/IMG_21.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "24",
    slug: "fort-lauderdale-five-bedroom-home",
    name: "Fort Lauderdale Five-Bedroom Home",
    city: "Fort Lauderdale",
    destination: "Florida",
    bedrooms: 5,
    bathrooms: 6.5,
    nightlyRate: 585,
    description:
      "A generous five-bedroom Fort Lauderdale residence with six and a half bathrooms.",
    coverPhoto: "/images/picture/IMG_23.jpg",
    gallery: [
      "/images/picture/IMG_23.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "25",
    slug: "houston-four-bedroom-home",
    name: "Houston Four-Bedroom Home",
    city: "Houston",
    destination: "Texas",
    bedrooms: 4,
    bathrooms: 3.5,
    nightlyRate: 350,
    description:
      "A comfortable Houston home featuring four bedrooms and three and a half bathrooms.",
    coverPhoto: "/images/picture/IMG_24.jpg",
    gallery: [
      "/images/picture/IMG_24.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "26",
    slug: "los-angeles-five-bedroom-home",
    name: "Los Angeles Five-Bedroom Home",
    city: "Los Angeles",
    destination: "California",
    bedrooms: 5,
    bathrooms: 6,
    nightlyRate: 405,
    description:
      "A spacious Los Angeles residence featuring five bedrooms and six bathrooms.",
    coverPhoto: "/images/picture/IMG_25.jpg",
    gallery: [
      "/images/picture/IMG_25.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "27",
    slug: "miami-eight-bedroom-residence",
    name: "Miami Eight-Bedroom Residence",
    city: "Miami",
    destination: "Florida",
    bedrooms: 8,
    bathrooms: 9,
    nightlyRate: 650,
    description:
      "A large Miami residence with eight bedrooms and nine bathrooms, ideal for group stays.",
    coverPhoto: "/images/picture/IMG_26.jpg",
    gallery: [
      "/images/picture/IMG_26.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "28",
    slug: "miami-five-bedroom-residence",
    name: "Miami Five-Bedroom Residence",
    city: "Miami",
    destination: "Florida",
    bedrooms: 5,
    bathrooms: 6,
    nightlyRate: 550,
    description:
      "A spacious five-bedroom Miami residence with six bathrooms and comfortable living areas.",
    coverPhoto: "/images/picture/IMG_27.jpg",
    gallery: [
      "/images/picture/IMG_27.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "29",
    slug: "fort-lauderdale-five-bedroom-retreat",
    name: "Fort Lauderdale Five-Bedroom Retreat",
    city: "Fort Lauderdale",
    destination: "Florida",
    bedrooms: 5,
    bathrooms: 7,
    nightlyRate: 507,
    description:
      "A five-bedroom Fort Lauderdale retreat offering generous accommodation and living space.",
    coverPhoto: "/images/picture/IMG_28.jpg",
    gallery: [
      "/images/picture/IMG_28.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
  {
    id: "30",
    slug: "charlotte-signature-home",
    name: "Charlotte Signature Home",
    city: "Charlotte",
    destination: "North Carolina",
    bedrooms: 4,
    bathrooms: 3,
    nightlyRate: 404,
    description:
      "A comfortable Charlotte residence featuring four bedrooms and three bathrooms.",
    coverPhoto: "/images/picture/IMG_29.jpg",
    gallery: [
      "/images/picture/IMG_29.jpg",
    ],
    amenities: [],
    featured: false,
    available: true,
  },
];

// Return all publicly available properties
export function getAvailableProperties(): Property[] {
  return PROPERTY_DATA.filter((property) => property.available);
}

// Return only available featured properties
export function getFeaturedProperties(): Property[] {
  return PROPERTY_DATA.filter(
    (property) => property.available && property.featured
  );
}

// Find one property using its unique URL slug
export function getPropertyBySlug(
  slug: string
): Property | undefined {
  return PROPERTY_DATA.find(
    (property) => property.slug === slug
  );
}

// Find one property using its ID
export function getPropertyById(
  id: string
): Property | undefined {
  return PROPERTY_DATA.find(
    (property) => property.id === id
  );
}
