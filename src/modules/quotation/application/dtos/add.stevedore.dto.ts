import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class AddStevedoresDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    stevedoreIds: number[];
}