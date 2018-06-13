import { Router } from 'express';
import Table from '../table';
import { user } from '../config/passport';
import { tokenMiddleware } from '../middleware/auth.mw';
import { callProcedure } from '../config/db';

let router = Router();
const imagesTable = new Table('images');
const userImagesTable = new Table('usersimages');


router.use(tokenMiddleware);

// router.post('/', (req, res) => {
//    await cloudinary.v2.uploader.upload(req.body.url, function (error, result) { console.log(result); });
//     imagesTable.insert({
//         url: req.body.url
//     })
//     .then(results => {
//         res.json(results);
//     })
//     .then(idOfInsertedImage => {
//         userImagesTable.insert({
//             userid: req.body.userid,
//             imageid: idOfInsertedImage
//         })
//         .then(results => {
//             res.json(results);
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//     });
// });

router.post('/', (req, res) => {
    console.log('here');
    console.log(req.body);
    imagesTable.insert({ url: req.body.url })
        .then((results) => {
            console.log(user)
            return userImagesTable
                .insert({ userid: req.user.id, imageid: results.id })
        }).then(() => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/:user_id', (req, res) => {
    callProcedure('spGetImagesByUser', req.params.user_id)
        .then(results => {
            res.json(results[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
})

export default router;