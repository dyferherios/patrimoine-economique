const Possession = require("./Possession");
class Patrimoine {
    constructor(owner) {
        this.owner = owner;
        this.possessions = [];
    }

    getPossessions(libelle) {
        return this.possessions.filter(p => p.getLibelle() == libelle);
    }

    getAllActualValue() {
        return this.possessions.reduce((sum, p) => (sum += p.getValuePerType()), 0);
    }

    getAllValueInThisDate(date) {
        return this.possessions.filter(p => p.date == date).reduce((sum, p) => (sum += p.getValuePerType()), 0);
    }

    getPourcentage(libelle, annee, taux) {
        let tmp = this.possessions.filter(p => p.getLibelle() == libelle);
        annee = annee.split('-').map(e => parseInt(e));
        let anneeDAjout = tmp[0].date.split('-').map(e => parseInt(e));
        function calculerInterval(annee, anneeDAjout) {
            return ((annee[0] - anneeDAjout[0] ) * 12) + (annee[1] - anneeDAjout[1]);
        }
        return (tmp[0].getValuePerType() * (taux/100)) * calculerInterval(annee, anneeDAjout);
    }

    tauxDAmortissage(libelle, annee, taux) {
        let tmp = this.possessions.filter(p => p.getLibelle() == libelle);
        for (let i = 0; i < this.possessions.length; i++) {
            if (tmp[0] == this.possessions[i]) {
                this.possessions[i].type.value = this.possessions[i].getValuePerType() - this.getPourcentage(libelle, annee, taux);
            }
        }
    }

    tauxDInteret(libelle,annee, taux) {
        let tmp = this.possessions.filter(p => p.getLibelle() == libelle);
        for (let i = 0; i < this.possessions.length; i++) {
            if (tmp[0] == this.possessions[i]) {
                this.possessions[i].type.value = this.possessions[i].getValuePerType() + this.getPourcentage(libelle, annee, taux);
            }
        }
    }

    addPossession(possession) {
        this.possessions.push(possession);
        if (possession.getLibelle() == "compte courant") {
            let poss = this.possessions.filter(p => p.type.constructor.name == "TrainDeVie");
            const val = poss.map(p => p.getValuePerType()).reduce((sum, i) => (sum += i), 0);
            this.possessions.filter(p => p.type.constructor.name == "TrainDeVie").map(p => p.type.value = 0);
            possession.type.value = possession.getValuePerType() - val;
        } else if(possession.type.constructor.name == "TrainDeVie") {
            let poss = this.possessions.filter(p => p.getLibelle() == "compte courant");
            if (poss[0].type.value - possession.getValuePerType() > 0) {
                poss[0].type.value =  poss[0].type.value - possession.getValuePerType();
                possession.type.value = 0;
            } else {
                this.removePossession(possession.getLibelle())
                return "Vous ne pouvez pas payer cela, votre argent est insuffisant !!!!"
            }
            
        }
    }

    removePossession(libelle) {
        this.possessions = this.possessions.filter(p => p.getLibelle() != libelle);
    }

}

module.exports = Patrimoine;
