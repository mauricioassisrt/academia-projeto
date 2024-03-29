import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { ICidade } from 'app/entities/cidade/cidade.model';

export interface IPessoa {
  id?: number;
  cpf?: string;
  dataNascimento?: dayjs.Dayjs;
  telefone?: string;
  rua?: string;
  numero?: string | null;
  bairro?: string;
  cep?: string;
  user?: IUser | null;
  cidade?: ICidade | null;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public cpf?: string,
    public dataNascimento?: dayjs.Dayjs,
    public telefone?: string,
    public rua?: string,
    public numero?: string | null,
    public bairro?: string,
    public cep?: string,
    public user?: IUser | null,
    public cidade?: ICidade | null
  ) {}
}

export function getPessoaIdentifier(pessoa: IPessoa): number | undefined {
  return pessoa.id;
}
