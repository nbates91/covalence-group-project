import { Router } from 'express';
import * as cloudinary from 'cloudinary';
import { config } from '../config';
import Table from '../table';
import { user } from '../config/passport';
import { tokenMiddleware } from '../middleware/auth.mw';
import { callProcedure } from '../config/db';

let router = Router();
const imagesTable = new Table('images');
const userImagesTable = new Table('usersimages');

cloudinary.config({
    cloud_name: "hxkggeeaw",
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
})

router.use(tokenMiddleware);

router.post('/', (req, res) => {
    console.log('before Cloudinary')
    cloudinary.uploader.upload(req.body.url)
        .then(results => {
            console.log(results)
            return imagesTable
                .insert({ url: results.secure_url })
        }).then((results) => {
            return userImagesTable
                .insert({ userid: req.user.id, imageid: results.id })
        }).then(() => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/:user_id', (req, res) => {
    callProcedure()
})

// router.get('/:img_id', (req, res) => {
//     cloudinary.url(req.params.img_id)
//         .then(results => {
//             res.json(results);
//             console.log(results);
//         })
//         .catch(err => {
//             console.log(err);
//             res.sendStatus(500);
//         })
// })

export default router;