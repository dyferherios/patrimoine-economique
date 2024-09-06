import Possession from "../../../models/possessions/Possession.js";
import Flux from "../../../models/possessions/Flux.js";
import Argent from '../../../models/possessions/Argent.js';

export const calculateValue = (possession, selectedDate) => {
    const dateToUse = selectedDate ? new Date(selectedDate) : new Date(Date.now());

    if (possession.type === "BienMateriel") {
        const newPossession = new Possession(
            possession.possesseur,
            possession.libelle,
            possession.valeur,
            new Date(possession.dateDebut),
            dateToUse,
            possession.tauxAmortissement
        );
        return newPossession.getValeur(dateToUse);
    }
    else if (possession.type === "Flux") {
        const newFlux = new Flux(
            possession.possesseur,
            possession.libelle,
            possession.valeurConstante ? possession.valeurConstante : possession.valeur,
            new Date(possession.dateDebut),
            dateToUse,
            possession.tauxAmortissement,
            possession.jour);
        return newFlux.getValeur(dateToUse);
    } else {
        const newArgent = new Argent(
            possession.possesseur,
            possession.libelle,
            possession.valeur,
            new Date(possession.dateDebut),
            dateToUse,
            possession.tauxAmortissement);
        return newArgent.getValeur(dateToUse);
    }
};

export const calculateTotalValeurActuelle = (possessions, selectedDate) => {
    const total = possessions.reduce((sum, possession) => sum + calculateValue(possession, selectedDate), 0);
    return total;
};
