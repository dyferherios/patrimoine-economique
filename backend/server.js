import express from 'express';
import cors from 'cors'; 
import fs from 'node:fs';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); 

const path = "../data/data.json";

app.get('/possesseur', (req, res) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const personneData = jsonData.filter(data => data.model === "Personne");
        res.send(personneData);
    });
});

app.get('/possessions/:nom', (req, res) => {
    const { nom } = req.params;
    fs.readFile(path, "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");
        const jsonData = JSON.parse(data);
        const possessions = jsonData
            .filter(item => item.model === "Patrimoine")
            .flatMap(item => item.data.possessions)
            .filter(possession => possession.possesseur.nom === nom);
        console.log(possessions); 
        res.send(possessions);
    });
});


// app.get('/possessions', (req, res) => {
//     fs.readFile(path, "utf8", (err, data) => {
//         if (err) throw err;
//         const jsonData = JSON.parse(data);
//         const patrimoineData = jsonData.filter(data => data.model === "Patrimoine");
//         res.send(patrimoineData);
//     });
// });





app.put('/possession/:nom/:id', (req, res) => {
    const { nom, id } = req.params;
    const updatedPossession = req.body;
    const parsedId = parseInt(id);

    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        let possessionFound = false;
        patrimoine.data.possessions = patrimoine.data.possessions.map(possession => {
            if (possession.possesseur.nom === nom && possession.id === parsedId) {
                possessionFound = true;
                return { ...possession, ...updatedPossession };
            }
            return possession;
        });

        if (!possessionFound) {
            return res.status(404).send("Possession not found");
        }

        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(200).send("Possession mise à jour avec succès");
        });
    });
});

app.delete('/possession/:nom/:id', (req, res) => {
    const { nom, id } = req.params;   
    const parsedId = parseInt(id);
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        patrimoine.data.possessions = patrimoine.data.possessions.filter(
            possession => !(possession.possesseur.nom === nom && possession.id === parsedId)
        );
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(200).send("Possession supprimée avec succès");
        });
    });
});


app.post('/possession/:nom', (req, res) => {
    const newPossession = req.body;
    const { nom } = req.params;

    fs.readFile(path, "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");
        
        if (!patrimoine) {
            return res.status(404).send("Patrimoine not found");
        }

        const newId = patrimoine.data.possessions.length+1;
        const possessionWithId = { id: newId, ...newPossession};
        patrimoine.data.possessions.push(possessionWithId);
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.status(201).send("Possession ajoutée avec succès");
        });
    });
});

app.post('/possession/:nom/:id/close', (req, res) => {
    const { nom, id } = req.params;
    const parsedId = parseInt(id);
    const currentDate = new Date().toISOString(); // Get the current date

    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        let jsonData = JSON.parse(data);
        const patrimoine = jsonData.find(item => item.model === "Patrimoine");

        if (!patrimoine) {
            return res.status(404).send("Patrimoine not found");
        }

        let possessionFound = false;
        patrimoine.data.possessions = patrimoine.data.possessions.map(possession => {
            if (possession.possesseur.nom === nom && possession.id === parsedId) {
                possessionFound = true;
                return { ...possession, dateFin: currentDate }; // Update the dateFin to the current date
            }
            return possession;
        });

        if (!possessionFound) {
            return res.status(404).send("Possession not found");
        }

        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(200).send("Possession closed successfully");
        });
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

