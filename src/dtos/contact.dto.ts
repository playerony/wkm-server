import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class ContactDataDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsString()
  @IsNotEmpty()
  public message: string

  @IsString()
  @IsNotEmpty()
  public firstname: string

  @IsString()
  @IsNotEmpty()
  public lastname: string
}
