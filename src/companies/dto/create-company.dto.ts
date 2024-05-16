import { IsOptional, MaxLength, MinLength } from "class-validator"


export class CreateCompanyDto {
  @MinLength(2)
  @MaxLength(100)
  name: string

  @MinLength(2)
  @MaxLength(100)
  location: string


  @MinLength(10)
  @MaxLength(10)
  NIP: string

  @MinLength(2)
  @MaxLength(100)
  sector: string

  @IsOptional()
  @MaxLength(10000)
  icon?: string
}
