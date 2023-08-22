import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Ticket } from 'src/app/interfaces/ticket-interface';
import {MatSort, MatSortModule} from '@angular/material/sort';

const ELEMENT_DATA: Ticket[] = [
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
  {DNI: 746413254, phoneNumber: 987456123, name: 'Angel', state: 'H'},
];

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements AfterViewInit {
  displayedColumns: string[] = ['DNI', 'phoneNumber', 'name', 'state', 'detail'];
  dataSource = new MatTableDataSource<Ticket>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
