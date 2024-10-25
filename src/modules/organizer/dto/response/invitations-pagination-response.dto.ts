import { IsArray, IsInt } from 'class-validator';
import { Invitation } from '../../model/invitation.model';

export class PaginationInvitiationsResponseDto {
  @IsArray()
  invitations: Invitation[];

  @IsInt()
  total_invitations: number;

  constructor(invitations: Invitation[], total_invitations: number) {
    this.invitations = invitations;
    this.total_invitations = total_invitations;
  }
}
