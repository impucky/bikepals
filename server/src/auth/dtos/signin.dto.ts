import {
  IsString,
  IsEmail,
  ValidateIf,
  IsNotEmpty,
  IsOptional,
  IsDefined,
} from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @ValidateIf(
    (dto) => (!dto.email && !dto.username) || (dto.email && dto.username),
  )
  @IsDefined({ message: 'Provide either a username or email, and not both' })
  protected readonly combinedCheck: undefined;

  @IsString()
  @IsNotEmpty()
  password: string;
}
