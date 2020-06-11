export class Ticket {
  public codigo: number;
  public estado: number;
  public escritorio?: string;

  constructor(codigo: number) {
    this.codigo = codigo;
    this.estado = 1;
    this.escritorio = '';
  }
}
