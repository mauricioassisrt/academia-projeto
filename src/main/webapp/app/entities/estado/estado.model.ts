export interface IEstado {
  id?: number;
  nomeEstado?: string;
  sigla?: string;
}

export class Estado implements IEstado {
  constructor(public id?: number, public nomeEstado?: string, public sigla?: string) {}
}

export function getEstadoIdentifier(estado: IEstado): number | undefined {
  return estado.id;
}
