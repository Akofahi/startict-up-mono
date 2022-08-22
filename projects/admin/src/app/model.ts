export interface Startup {
  id?: string;
  startupName: string;
  logoImg: string;
  images: string[];
  designColor: string;
  city: string;
  founderName: string;
  numberOfEmployees: string;
  yearOfEstablishment: string;
  websiteURL: string;
  email: string;
  sectors: Sector[];
}

export enum Categorys{
  Software = 0,
  DevicesInfrastucture = 1,
  ITBusinessServices = 2,
  EmergingTech = 3,
  TelecomServices = 4
}



export interface Sector {
  id?: string;
  sectorName: string;
  sectorLogo: string;
  designColor: string;
  startups: Startup[];
  category: Categorys;

}
