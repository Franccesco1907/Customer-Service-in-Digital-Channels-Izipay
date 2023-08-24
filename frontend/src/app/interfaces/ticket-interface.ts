export interface Ticket{
  id: string,
  DNI: number,
  name: string,
  date: Date,
  priority: string,
  state: string,
}

export interface TicketComment{
  name:string,
  comment:string,
  state:string
}
