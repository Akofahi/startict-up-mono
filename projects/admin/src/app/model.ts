export interface Startup{
    id?: string;
    ceo: string;
    companyName: string;
    sector: Sector;
}

export interface Sector{
    sectorName: string;
}