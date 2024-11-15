import { IsString, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  chainId: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
