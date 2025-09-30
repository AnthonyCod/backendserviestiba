// src/modules/user/application/dtos/create-user.dto.ts

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()   
  phone: string;  

  @IsString()
  @IsNotEmpty()  
  address: string;  

  @IsString()
  @IsNotEmpty() 
  password: string;
}
