import { IsString, IsOptional, IsUUID } from 'class-validator';

export class UpdateWalletDto {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  chainId?: string;
}
