import { IEstado } from 'app/entities/estado/estado.model';
import { IUser } from 'app/entities/user/user.model';

export interface ICidade {
  id?: number;
  nomeCidade?: string;
  observacao?: string | null;
  estado?: IEstado | null;
  user?: IUser | null;
}

export class Cidade implements ICidade {
  constructor(
    public id?: number,
    public nomeCidade?: string,
    public observacao?: string | null,
    public estado?: IEstado | null,
    public user?: IUser | null
  ) {}
}

export function getCidadeIdentifier(cidade: ICidade): number | undefined {
  return cidade.id;
}
