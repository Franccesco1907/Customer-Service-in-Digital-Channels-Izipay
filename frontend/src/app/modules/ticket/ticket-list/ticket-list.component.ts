import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Ticket } from 'src/app/interfaces/ticket-interface';
import {MatSort} from '@angular/material/sort';

const ELEMENT_DATA: Ticket[] = [
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
  {id: '00001000', DNI: 746413254, name: 'Angel', date: new Date(), priority: 'Alta', state: 'En espera'},
];

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','DNI', 'name', 'date', 'priority', 'state'];
  stateOptions: any[] = [
    {id: 1, value: 'Pendiente'},
    {id: 2, value: 'En progreso'},
    {id: 3, value: 'Terminado'},
  ];

  priorityOptions: any[] = [
    {id: 1, value: 'Alta'},
    {id: 2, value: 'Media'},
    {id: 3, value: 'Baja'},
  ]

  dataSource = new MatTableDataSource<Ticket>;

  quantity: number = 0 ;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.quantity = ELEMENT_DATA.length;
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
