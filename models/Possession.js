class Possession{
    constructor(date, type) {
        this.date = date;
        this.type = type;
    }
    getValuePerType() {
        return this.type.value;
    }
    getLibelle() {
        return this.type.libelle;
    }
    // get type() {
    //     return this.type;
    // }
}

module.exports = Possession;