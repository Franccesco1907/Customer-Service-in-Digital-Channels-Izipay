import { IsString } from "class-validator";
import { AbstractDocument } from "src/common/database";

export class CreateQueryDto extends AbstractDocument{
  @IsString()
  query: string;
}
