import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { AbstractDocument } from "src/common/database";

export class CreateTicketDto extends AbstractDocument {
  @IsString()
  @IsNotEmpty()
  documentNumber: string;
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
  @IsEmail()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  query: string;
  @IsString()
  @IsNotEmpty()
  priority: string;
  @IsString()
  responsible: string;
}
