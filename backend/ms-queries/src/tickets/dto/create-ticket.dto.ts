import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { AbstractDocument } from "src/common/database";

export class CreateTicketDto extends AbstractDocument {
  @IsString()
  @IsNotEmpty()
  documentNumber: string;
  @IsString()
  code: string;
  @IsString()
  query: string;
  @IsString()
  priority: string;
  @IsString()
  state: string;
  @IsBoolean()
  isClosedByIa: boolean;
  @IsString()
  solution: string;
  @IsString()
  responsible: string;
}
