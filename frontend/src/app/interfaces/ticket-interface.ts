export interface Ticket{
  _id: string,
  documentNumber: string,
  phoneNumber: string,
  email: string,
  fullName: string,
  query: string,
  priority: string,
  code: number,
  state: string,
  solution: string,
  responsible: string,
  createdAt: string
}

export interface TicketRegister{
  documentNumber: string,
  phoneNumber: string,
  email: string,
  fullName: string,
  query: string,
  priority: string,
  responsible: string,
}

export interface TicketComment{
  name:string,
  comment:string,
  state:string
}
