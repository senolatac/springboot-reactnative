export default class Transaction {
  constructor(user, product, purchaseDate, id){
    this.user = user;
    this.product = product;
    this.purchaseDate = purchaseDate;
    this.id = id;
  }
}
