
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


const routes = (router, admin) => {

    const db = admin.firestore();
    async function getPlantedTress()
    {
        let locations = []
        const snapshot = await db.collection('tree-locations').get();
        snapshot.forEach((doc) => {
            locations.push(
                {id:doc.id, data:doc.data()}
            );
        });
        return locations;
    }

    router.get('/trees', async  (req, res) => {   
        const trees = await getPlantedTress()
        res.send(JSON.stringify(trees));
    });

    router.post('/trees', async (req, res) => {

        try{
            const result = await db.collection('tree-locations').add(req.body);              
              
            const newItem = await db.collection('tree-locations').doc(result.id).get()
            res.status(200).send(JSON.stringify({id:newItem.id, data:newItem.data()}));
        }
        catch(error)
        {
            res.status(500).send('Data could not be saved.' + error);
        }                
    });

    return router;
}

module.exports = routes;