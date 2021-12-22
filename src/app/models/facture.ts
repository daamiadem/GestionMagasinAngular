import { Client } from "./client";
import { DetailFacture } from "./detailFacture";

export class Facture {
  idFacture !: number;
  montantRemise!: number;
  montantFacture!: number;
  dateFacture !: Date;
  active!: Boolean;
  client !: Client;
  detailFacture !: Array<DetailFacture>;
}


