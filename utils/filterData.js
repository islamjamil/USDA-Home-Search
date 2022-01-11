export const filterData = [
  {
    items: [
      { name: "Snohomish County", value: "Snohomish County, WA" },
      { name: "King County", value: "King County, WA" },
      { name: "Pierce County", value: "Pierce County, WA" },
      { name: "Spartanburg County", value: "Spartanburg County, SC" }
    ],
    placeholder: "County",
    queryName: "county",
  },
  {
    items: [
      { name: '100,000', value: '100000' },
      { name: '200,000', value: '200000' },
      { name: '300,000', value: '300000' },
      { name: '400,000', value: '400000' },
      { name: '500,000', value: '500000' },
      { name: '600,000', value: '600000' },
    ],
    placeholder: 'Min Price',
    queryName: 'minPrice',
  },
  {
    items: [
      { name: '200,000', value: '200000' },
      { name: '250,000', value: '250000' },
      { name: '300,000', value: '300000' },
      { name: '350,000', value: '350000' },
      { name: '400,000', value: '400000' },
      { name: '450,000', value: '450000' },
      { name: '500,000', value: '500000' },
      { name: '550,000', value: '550000' },
      { name: '600,000', value: '600000' },
      { name: '650,000', value: '650000' },
    ],
    placeholder: 'Max Price',
    queryName: 'maxPrice',
  },
  {
    items: [
      { name: '500', value: '500' },
      { name: '1,000', value: '1000' },
      { name: '1,500', value: '1500' },
      { name: '2,000', value: '2000' },
    ],
    placeholder: 'Min Area (sqft)',
    queryName: 'minSqft',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
    ],
    placeholder: 'Bedrooms',
    queryName: 'bedsMin',
  },
  {
    items: [
      { name: '1', value: '1' },
      { name: '2', value: '2' },
      { name: '3', value: '3' },
      { name: '4', value: '4' },
      { name: '5', value: '5' },
    ],
    placeholder: 'Baths',
    queryName: 'bathsMin',
  },
  {
    items: [
      { name: 'Price (Low to High)', value: 'Price_Low_High' },
      { name: 'Price (High to Low)', value: 'Price_High_Low' },
      // { name: 'Newest', value: 'Newest' },
      { name: 'Bedrooms', value: 'Bedrooms' },
      { name: 'Bathrooms', value: 'Bathrooms' },
      { name: 'Square Footage', value: 'Square_feet' },
      { name: 'Lot Size', value: 'Lot_Size' },
    ],
    placeholder: 'Sort by',
    queryName: 'sort',
  },
];

export const getFilterValues = (filterValues) => {
  const {
    minPrice,
    maxPrice,
    bedsMin,
    bathsMin,
    minSqft,
    county,
    sort,
  } = filterValues;

  const values = [
    {
      name: 'minPrice',
      value: minPrice,
    },
    {
      name: 'maxPrice',
      value: maxPrice,
    },
    {
      name: 'bedsMin',
      value: bedsMin,
    },
    {
      name: 'bathsMin',
      value: bathsMin,
    },
    {
      name: 'minSqft',
      value: minSqft,
    },
    {
      name: "county",
      value: county
    },
    {
      name: "sort",
      value: sort
    }
  ];

  return values;
};
