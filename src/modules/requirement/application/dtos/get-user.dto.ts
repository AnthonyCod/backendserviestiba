// src/modules/user/application/dtos/get-user.dto.ts

import { IsInt, IsPositive } from 'class-validator';

export class GetUserDto {
  @IsInt()           // Verifica que el id sea un número entero
  @IsPositive()      // Asegura que el id sea un número positivo
  id: number;        // El campo id será un número
}
