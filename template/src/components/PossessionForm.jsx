import React from 'react';
import Form from 'react-bootstrap/Form';

// function PossessionForm({ possession, onChange }) {
//     return (
//         <Form>
//             <Form.Group className="mb-3" controlId="formLibelle">
//                 <Form.Label>Libelle</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={possession.libelle}
//                     onChange={(e) => onChange('libelle', e.target.value)}
//                     autoFocus
//                 />
//             </Form.Group>
//             {possession.type === 'Flux' ? (
//                 <Form.Group className="mb-3" controlId="formValeurConstante">
//                     <Form.Label>Valeur Constante</Form.Label>
//                     <Form.Control
//                         type="number"
//                         value={possession.valeurConstante}
//                         onChange={(e) => onChange('valeurConstante', e.target.value)}
//                     />
//                 </Form.Group>
//             ) : (
//                 <Form.Group className="mb-3" controlId="formValeur">
//                     <Form.Label>Valeur</Form.Label>
//                     <Form.Control
//                         type="number"
//                         value={possession.valeur}
//                         onChange={(e) => onChange('valeur', e.target.value)}
//                     />
//                 </Form.Group>
//             )}
//             <Form.Group className="mb-3" controlId="formDateDebut">
//                 <Form.Label>Date Début</Form.Label>
//                 <Form.Control
//                     type="date"
//                     value={possession.dateDebut}
//                     onChange={(e) => onChange('dateDebut', e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formDateFin">
//                 <Form.Label>Date Fin</Form.Label>
//                 <Form.Control
//                     type="date"
//                     value={possession.dateFin}
//                     onChange={(e) => onChange('dateFin', e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formTauxAmortissement">
//                 <Form.Label>Taux d'Amortissement</Form.Label>
//                 <Form.Control
//                     type="number"
//                     value={possession.tauxAmortissement}
//                     onChange={(e) => onChange('tauxAmortissement', e.target.value)}
//                 />
//             </Form.Group>
//         </Form>
//     );
// }

function PossessionForm({ possession, onChange }) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formLibelle">
                <Form.Label>Libelle</Form.Label>
                <Form.Control
                    type="text"
                    value={possession.libelle}
                    onChange={(e) => onChange('libelle', e.target.value)}
                    autoFocus
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formDateFin">
                <Form.Label>Date Fin</Form.Label>
                <Form.Control
                    type="date"
                    value={possession.dateFin}
                    onChange={(e) => onChange('dateFin', e.target.value)}
                />
            </Form.Group>
        </Form>
    );
}


export default PossessionForm;
