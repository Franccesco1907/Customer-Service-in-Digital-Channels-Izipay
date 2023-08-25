import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Ticket, TicketRegister } from 'src/app/interfaces/ticket-interface';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { RegisterTicketComponent } from '../register-ticket/register-ticket.component';
import { TicketService } from 'src/app/services/ticket.service';


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
  ticketList: Ticket[] = [];

  newTicket!: TicketRegister;

  priorityOptions: any[] = [
    {id: 1, value: 'Alta'},
    {id: 2, value: 'Media'},
    {id: 3, value: 'Baja'},
  ]

  dataSource = new MatTableDataSource<Ticket>;

  quantity: number = 0 ;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private ticketService: TicketService) {
    this.getTickets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTickets(){
      this.ticketService.getTickets().subscribe(response =>{
        this.ticketList = response.body;
        console.log(this.ticketList);
        this.quantity = this.ticketList.length;
        this.dataSource = new MatTableDataSource(this.ticketList);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterTicketComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newTicket = result;
      console.log(this.newTicket);
      this.ticketService.postTicket(this.newTicket).subscribe(()=>{
        this.getTickets();
      });
    });
  }

}
