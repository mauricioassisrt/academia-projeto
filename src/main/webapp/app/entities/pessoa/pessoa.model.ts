import dayjs from 'dayjs/esm';

export interface IPessoa {
  id?: number;
  cpf?: string;
  dataNascimento?: dayjs.Dayjs;
  telefone?: string;
  rua?: string;
  numero?: string | null;
  bairro?: string;
  cep?: string;
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
    public cep?: string
  ) {}
}

export function getPessoaIdentifier(pessoa: IPessoa): number | undefined {
  return pessoa.id;
}
