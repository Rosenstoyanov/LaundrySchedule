export class Laundry {

    constructor(
        public _id: String,
        public title: String,
        public description: String,
        public booked: Boolean,
        public userId: Number,
        public bookedAt: Number,
        public expiresAt: number,
        public bookedMessage: String
    ) {
        this.bookedMessage = this.generateBookMessage()
     }

    public generateBookMessage(): string {
        if (this.booked) {
            return 'Booked until' + this.getFormattedDate(new Date(this.expiresAt));
        } else {
            return 'Available for booking'
        }
    }

    private getFormattedDate(date: Date): string {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        let monthStr = (month < 10 ? "0" : "") + month;
        let dayStr = (day < 10 ? "0" : "") + day;
        let hourStr = (hour < 10 ? "0" : "") + hour;
        let minStr = (min < 10 ? "0" : "") + min;
        let secStr = (sec < 10 ? "0" : "") + sec;

        var str = date.getFullYear() + "-" + month + "-" + day + "_" + hour + ":" + min + ":" + sec;

        return str;
    }
}