import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

let router = Router();

let tableName = new Table('Locations');

router.get('/', (req, res) => {
	callProcedure('spGetAllLocations')
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.get('/:locationid', (req, res) => {
	callProcedure('spGetLocation', [req.params.locationid])
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.post('/', (req, res) => {
	tableName
		.insert(req.body)
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.put('/:locationid', (req, res) => {
	tableName
		.update(req.params.locationid, req.body)
		.then(results => {
			res.json(results);
			console.log(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.delete('/:locationid', (req, res) => {
	tableName
		.delete(req.params.locationid)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

export default router;
