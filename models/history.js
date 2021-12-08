import moment from "moment";

class History {
  constructor(id, idFrom, idTo, amount, name, date, type, service, status) {
    this.id = id;
    this.idFrom = idFrom;
    this.idTo = idTo;
    this.amount = amount;
    this.name = name;
    this.date = date;
    this.type = type;
    this.service = service;
    this.status = status;
  }

  get toDate() {
    return moment(this.date).format("hh:mm:ss, DD-MM-YYYY ");
  }
}
export default History;
