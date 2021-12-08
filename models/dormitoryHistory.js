import moment from "moment";

class DorHistory {
  constructor(id, studentId, date, type ) {
    this.id = id;
    this.studentId = studentId;
    this.date = date;
    this.type = type;
  }

  get toDate() {
    return moment(this.date).format("hh:mm:ss, DD-MM-YYYY ");
  }
}
export default DorHistory;
