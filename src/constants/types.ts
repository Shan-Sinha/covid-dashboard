export type AllCasesData = {
  cases: Record<string, number>
  death: Record<string, number>
  recovered: Record<string, number>
}

export type CountryData = {
  // Define the expected structure of country data
  country: string;
  active: number;
  recovered: number;
  deaths: number;
  // ... add other properties as needed
  countryInfo: { lat: number; long: number }; // Add coordinates for markers
}
