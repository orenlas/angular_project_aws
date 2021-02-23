export interface CovidByCountry {
    country: string;
    countryInfo:[{
        flag:string
    }];
    cases: number;
    todayCases: number;
    deaths: string;
	todayDeaths: string;
    recovered: number;
    active: number;
    critical: string;
	casesPerOneMillion?: number;
    deathsPerOneMillion?: number;
    tests: string;
	testsPerOneMillion?:string;
}