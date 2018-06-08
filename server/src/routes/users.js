import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { callProcedure } from '../config/db';
import { generateHash } from '../utils/bcrypt'

let router = Router();
const usersTable = new Table('users');

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
	res.json(req.user);
});

// Get all users
router.get('/', (req, res) => {
	usersTable
		.getAll()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// Get one user by id
router.get('/:id', (req, res) => {
	usersTable
		.getOne(req.params.id)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// Get all of the user's images
router.get('/:userid/images', (req, res) => {
	callProcedure('spGetImagesByUser', req.params.userid)
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// Get one of the user's images
router.get('/:userid/image/:imageid', (req, res) => {
	callProcedure('spGetOneUserImage', [req.params.userid, req.params.imageid])
		.then(results => {
			res.json(results[0]);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

// creates a user
router.post('/', (req, res) => {
	generateHash(req.body.hash).then(hash => {
		usersTable.insert({
			email: req.body.email,
			hash: hash,
			role: 'user',
			level: 0,
			numberofcheckins: 0,
			activerouteid: null
		})
			.then(results => {
				res.json(results);
			})
			.catch(err => {
				console.log(err);
				res.sendStatus(500);
			});
	}).catch(err => {
		console.log(err);
		res.sendStatus(500);
	});
});

router.put('/:id', async (req, res) => {
	let usersHash = req.body.hash;
	if (req.body.password) {
		let hash = await generateHash(req.body.password);
		usersHash = hash;
	}
	usersTable
		.update(req.params.id, {
			email: req.body.email,
			hash: usersHash,
			role: req.body.role,
			level: req.body.level,
			numberofcheckins: req.body.numberofcheckins,
			activerouteid: req.body.activerouteid
		})
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);	
		});
});

// deletes user
router.delete('/:id', (req, res) => {
	usersTable
		.delete(req.params.id)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

export default router;
