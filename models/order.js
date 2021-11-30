import moment from "moment";

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get toDate() {
    // return this.date.toLocaleDateString("en-US", {
    //   year: "numberic",
    //   month: "long",
    //   day: "numberic",
    //   hour: "numberic",
    //   minute: "numberic",
    // });
    return moment(this.date).format("YYYY-MM-DD  , hh:mm:ss");
  }
}
export default Order;
