import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { TicketRegister } from 'src/app/interfaces/ticket-interface';

@Component({
  selector: 'app-register-ticket',
  templateUrl: './register-ticket.component.html',
  styleUrls: ['./register-ticket.component.scss']
})
export class RegisterTicketComponent {
  priorityOptions: any[] = [
    {id: 1, value: 'Alta'},
    {id: 2, value: 'Media'},
    {id: 3, value: 'Baja'},
  ]
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RegisterTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketRegister,
    private formBuilder: FormBuilder
  ) {
    this.reactiveForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  reactiveForm(){
    this.form = this.formBuilder.group({
      DNI: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      priority: [null, Validators.required],
      responsible: [null, Validators.required],
      comment: [null, Validators.required],
    });
  }

}
