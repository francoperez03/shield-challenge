import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateWalletDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  chainId: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
