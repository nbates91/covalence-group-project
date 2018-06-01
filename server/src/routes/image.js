import { Router } from 'express';
// import { pushImg, getImg } from '../config/cloudinary';
import * as cloudinary from 'cloudinary';
import { config } from '../config';

let router = Router();

cloudinary.config({
    cloud_name: "hxkggeeaw",
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
})

router.post('/', (req, res) => {
    cloudinary.uploader.upload(req.body.url)
        .then(results => {
            res.json(results);
            console.log(results);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.get('/:img_id', (req, res) => {
    cloudinary.image(`http://res.cloudinary.com/hxkggeeaw/image/upload/v1527875689/${req.params.image_id}.jpg`)
        .then(results => {
            res.json(results);
            console.log(resutls);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

// cloudinary.uploader.upload("https://i.redd.it/5yerle592e111.jpg", (res) => {
//     console.log(res);
// })

// cloudinary.image(public_id, alt)

export default router;