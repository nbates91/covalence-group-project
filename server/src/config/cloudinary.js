import * as cloudinary from 'cloudinary';
import { config } from '../config';

cloudinary.config({
    cloud_name: "hxkggeeaw",
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
})

function pushImg(imgFile) {
    cloudinary.uploader.upload(imgFile, (res) => {
        console.log(res);
    })
}

function getImg(public_id, alt) {
    cloudinary.image(public_id, alt);
}

export { pushImg, getImg };