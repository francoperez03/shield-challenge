import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateWalletDto {
  @IsUUID()
  walletId: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUUID()
  chainId?: string;
}
