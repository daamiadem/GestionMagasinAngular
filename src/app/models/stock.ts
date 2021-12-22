import { Produit } from "./produit";

export class Stock {
  idStock:number;
  qteStock:number;
  qteMin:number;
  libelleStock:string;
  produits: Produit[];
}
