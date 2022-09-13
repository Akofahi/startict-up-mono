export interface Startup {
  id?: string;
  startupName: string;
  description: string;
  logoImg: string;
  images: string[];
  designColor: string;
  city: string;
  founderName: string;
  numberOfEmployees: number;
  yearOfEstablishment: string;
  websiteURL: string;
  email: string;
  sectors: string[];
}

export enum Categorys{
  "Software" = 0,
  "Devices Infrastucture" = 1,
  "IT Business Services" = 2,
  "Emerging Tech" = 3,
  'TelecomServices' = 4
}



export interface Sector {
  id?: string;
  sectorName: string;
  sectorLogo: string;
  designColor: string;
  startups: Startup[];
  category: Categorys;

}

export interface Requests {
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
  sectors: string[];
  status : 'rejected' | 'approved' |'pending';
}
