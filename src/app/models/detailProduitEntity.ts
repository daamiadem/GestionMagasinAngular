import { Produit } from "./produit";

export class DetailProduitEntity {
  idDetailProduit: number;
  dateCreation: Date;
  dateDerniereModification: Date;
  categorieProduit: String;
  produit: Produit;

}
