import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CovidService } from '../covid.service';
import { CovidByCountry } from '../interfaces/covid-by-country';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  resp;
  hasError:Boolean = false;
  errorMessage:string;
  ELEMENT_DATA: CovidByCountry[] = [];
  displayedColumns: string[] = ['flag','country','cases','todayCases','deaths','todayDeaths','recovered','active','critical','tests'];
  dataSource = new MatTableDataSource<CovidByCountry>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
  @ViewChild(MatSort,{static:true}) sort:MatSort;

  getCovidData(){
    this.resp = this.covidService.getCovidData().subscribe(
      data => this.dataSource.data = data as CovidByCountry[]
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private covidService:CovidService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCovidData();
    console.log(this.dataSource);
  }
}
