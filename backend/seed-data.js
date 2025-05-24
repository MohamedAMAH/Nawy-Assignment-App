const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_PROD)
  .catch(err => {
    process.exit(1);
  });

const apartmentSchema = new mongoose.Schema(
  {
    name: String,
    apartmentNumber: String,
    address: String,
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    description: String,
    project: String,
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Apartment = mongoose.model('Apartment', apartmentSchema);

const apartments = [
  {
    name: 'Luxury Downtown Apartment',
    apartmentNumber: 'A101',
    address: '123 Main Street, Downtown, City',
    price: 500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    description: 'Experience luxury living at its finest in this meticulously designed downtown apartment. Featuring floor-to-ceiling windows that flood the space with natural light, premium hardwood flooring throughout, and a state-of-the-art kitchen with marble countertops and high-end stainless steel appliances. The master bedroom includes a spacious walk-in closet and an ensuite bathroom with rainfall shower. Residents enjoy exclusive access to a rooftop pool, fitness center, and 24/7 concierge service.',
    project: 'Downtown Heights'
  },
  {
    name: 'Cozy Studio',
    apartmentNumber: 'B202',
    address: '456 Park Avenue, Midtown, City',
    price: 300000,
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    description: 'This thoughtfully designed studio apartment maximizes every square foot to create a perfect urban retreat. The modern open-concept layout seamlessly blends living and dining areas, while clever storage solutions ensure a clutter-free environment. The kitchen features built-in appliances and a breakfast bar, ideal for both entertaining and everyday living. The large windows offer stunning city views, and the custom-built Murphy bed provides flexibility in space usage. Building amenities include a co-working space, bike storage, and a communal garden.',
    project: 'Midtown Residences'
  },
  {
    name: 'Family Penthouse',
    apartmentNumber: 'P501',
    address: '789 Skyline Drive, Uptown, City',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    description: 'This spectacular penthouse offers unparalleled luxury for family living. The grand entrance leads to an expansive living area with double-height ceilings and panoramic windows showcasing breathtaking city views. The gourmet kitchen features a large island, custom cabinetry, and professional-grade appliances. Four generously sized bedrooms include a master suite with a spa-like bathroom and private terrace. The wraparound balcony spans 100 square meters, perfect for outdoor entertaining. Additional features include a home theater room, smart home automation, and private elevator access.',
    project: 'Skyline Towers'
  },
  {
    name: 'Modern Loft',
    apartmentNumber: 'L303',
    address: '321 Industrial Blvd, Arts District, City',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    description: 'Housed in a converted industrial building, this stunning loft apartment combines historical character with modern luxury. The dramatic 4.5-meter ceilings and original exposed brick walls create an impressive atmosphere, while modern additions like polished concrete floors and industrial-style windows add contemporary flair. The open-plan living space features a designer kitchen with waterfall island and professional appliances. A floating staircase leads to the mezzanine level master bedroom with custom wardrobes and an ensuite bathroom featuring a freestanding tub and designer fixtures.',
    project: 'The Factory Lofts'
  },
  {
    name: 'Garden Oasis Apartment',
    apartmentNumber: 'G105',
    address: '567 Green Valley Road, Suburban District, City',
    price: 600000,
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    description: 'This ground-floor apartment offers a unique blend of indoor comfort and outdoor living. The expansive private garden spans 200 square meters, featuring mature landscaping, a covered patio, and a built-in barbecue area. Inside, the open-plan living space showcases premium finishes including Italian porcelain tiles, custom millwork, and floor-to-ceiling sliding doors that create a seamless indoor-outdoor flow. The chef&apos;s kitchen boasts quartz countertops, a wine fridge, and a large pantry. Three well-appointed bedrooms include a master suite with garden views and a luxury ensuite. Additional features include underfloor heating, a home office nook, and direct access to the community&apos;s walking trails.',
    project: 'Green Valley Residences'
  }
];

const seedDatabase = async () => {
  try {
    const apartmentNumbers = apartments.map(a => a.apartmentNumber);
    const existingApartment = await Apartment.findOne({ apartmentNumber: { $in: apartmentNumbers } });
    if (existingApartment) {
      return mongoose.disconnect();
    }
    const result = await Apartment.insertMany(apartments);
    console.log(`Successfully inserted ${result.length} apartments`);
    mongoose.disconnect();
  } catch (error) {
    mongoose.disconnect();
  }
};

seedDatabase();