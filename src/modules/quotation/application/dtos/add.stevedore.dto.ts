import { IsInt, IsNotEmpty } from 'class-validator';

export class AddStevedoreDto {
    @IsInt()
    @IsNotEmpty()
    stevedoreId: number;
}