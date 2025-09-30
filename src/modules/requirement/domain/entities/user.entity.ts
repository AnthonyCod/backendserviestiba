// Estructura User como en la base de datos
export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  dni: string | null;
}
