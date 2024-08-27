import express from 'express';
import cors from 'cors';  // Assurez-vous que cette ligne est correcte
import fs from 'node:fs';

const app = express();
const port = 5000;

// Middleware pour le parsing du JSON
app.use(express.json());
app.use(cors()); // Ajoutez ce middleware pour gérer les CORS

const path = "../data/data.json";

app.get('/possession', (req, res) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

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


app.get('/possessions', (req, res) => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        const patrimoineData = jsonData.filter(data => data.model === "Patrimoine");
        res.send(patrimoineData);
    });
});

app.delete('/possession/:nom/:id', (req, res) => {
    const { nom, id } = req.params;
    console.log(nom, id);
    
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
        console.log(id);
        
        fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.status(200).send("Possession supprimée avec succès");
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

