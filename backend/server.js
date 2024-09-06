import express from 'express';
import cors from 'cors';
import fs from 'node:fs';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const path = "../data/data.json";
app.get('/possession', (req, res) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        const jsonData = JSON.parse(data);
        const possessions = jsonData
            .filter(item => item.model === "Patrimoine")
            .flatMap(item => item.data.possessions);
        res.send(possessions);
    });
});

app.get('/possession/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile(path, "utf8", (err, data) => {
        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        const poss = patrimoine.data.possessions.find(possession => String(possession.id) === String(id));
        res.status(200).send(poss);
    });
});

app.put('/possession/:id', (req, res) => {
    const { id } = req.params;
    const updatedPossession = req.body;
    fs.readFile(path, "utf8", (err, data) => {
        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        let possessionFound = false;
        patrimoine.data.possessions = patrimoine.data.possessions.map(possession => {
            if (String(possession.id) === String(id)) { // Convertir en chaîne pour comparaison
                possessionFound = true;
                return { ...possession, ...updatedPossession };
            }
            return possession;
        });
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            res.status(200).send("Possession mise à jour avec succès");
        });
    });
});


app.delete('/possession/:libelle', (req, res) => {
    const { libelle } = req.params;
    fs.readFile(path, "utf8", (err, data) => {
        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        patrimoine.data.possessions = patrimoine.data.possessions.filter(
            possession => !(possession.libelle === libelle)
        );
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            res.status(200).send("Possession supprimée avec succès");
        });
    });
});


app.post('/possession/', (req, res) => {
    const newPossession = req.body;
    fs.readFile(path, "utf8", (err, data) => {
        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        const newId = patrimoine.data.possessions.length + 1;
        const possesseur = patrimoine.data.possesseur;
        const possessionWithId = { id: newId, possesseur, ...newPossession };
        patrimoine.data.possessions.push(possessionWithId);

        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.status(201).send("Possession ajoutée avec succès");
        });
    });
});

app.patch('/possession/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    console.log('Received request to close possession with libelle:', req.params.libelle);
    const currentDate = new Date().toISOString(); // Get the current date
    fs.readFile(path, "utf8", (err, data) => {
        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        patrimoine.data.possessions = patrimoine.data.possessions.map(possession => {
            if (possession.libelle === libelle
            ) {
                return { ...possession, dateFin: currentDate }; // Update the dateFin to the current date
            }
            return possession;
        });
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            res.status(200).send("Possession closed successfully");
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

