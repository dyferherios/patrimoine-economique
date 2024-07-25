const Possession = require("./Possession");
class Patrimoine {
    constructor(owner) {
        this.owner = owner;
        this.possessions = [];
    }

    getPossessions(libelle) {
        this.possessions.forEach(p => {
            if (p.getLibelle() == libelle) {
                console.log(p);
            }
        });
    }

    getAllActualValue() {
        return this.possessions.reduce((sum, p) => (sum += p.getValuePerType()), 0)
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
    }

    removePossession(libelle) {
        return this.possessions.filter(p => p.type.libelle != libelle)
    }
}

module.exports = Patrimoine;
