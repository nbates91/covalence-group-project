import { Router } from 'express';
import Table from '../table';
import { callProcedure } from '../config/db';

let router = Router();
const routesTable = new Table('routes');

// get all routes
router.get('/', (req, res) => {
	callProcedure('spGetAllRoutes')
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// get name and detail of just one route
router.get('/:routeid', (req, res) => {
	callProcedure('spGetSingleRoute', req.params.routeid)
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// get all stops related to one route by id
router.get('/stops/:routeStopsId', (req, res) => {
	callProcedure('spGetRouteLocations', [req.params.routeStopsId])
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// post a new route (will need to simultaniously post to locations to update the routeStops table)
router.post('/', (req, res) => {
	routesTable
		.insert(req.body)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// edits the name/description of one route.
router.put('/:putRouteId', (req, res) => {
	routesTable
		.update(req.params.putRouteId, req.body)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

//deletes the id/name/desc for one route
router.delete('/:delRouteId', (req, res) => {
	routesTable
		.delete(req.params.delRouteId)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

export default router;
