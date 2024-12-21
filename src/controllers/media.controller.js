import multer from "multer";
import httpStatus from "http-status";
import path from "path";
import repositories from "../repositories";
import config from "../config/config";
const { media } = repositories;

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { mediaType, mediaFor } = req.params;
        cb(null, `public/uploads/${mediaType}/${mediaFor}/`);
    },

});
const uploadfiles = multer({
    storage: config.app.mediaStorage === 'local' ? storage : null,
    fileFilter: (request, file, callback) => {
        const ext = path.extname(file.originalname);
        let fileFormate = [];
        if (request.params.mediaType === 'image')
            fileFormate = ['.img', '.jpeg', '.jpg', '.gif'];
        else if (request.params.mediaType === 'video')
            fileFormate = ['.mp4', '.mkv'];
        else if (request.params.mediaType === 'audio')
            fileFormate = ['.mp3', '.aac', '.m4a'];
        else if (request.params.mediaType === 'file')
            fileFormate = ['.pdf', '.doc', '.docx'];
        else if (request.params.mediaType === 'media')
            fileFormate = [
                '.png',
                '.jpg',
                '.gif',
                '.aac',
                '.m4a',
                '.mp3',
                '.jpeg',
                '.pdf',
                '.doc',
                '.docx',
                '.mp4',
            ]
        if (!fileFormate.indexOf(ext.toLocaleLowerCase()) === -1) {
            return callback(new Error(`Allowed file formate ${fileFormate.toString()}`))
        }
        callback(null, true);
    }
})


export default {
    async uploadMedia(request, response, next) {
        try {
            const { params } = request;
            const { mediaType } = params;
            const {mediaFor} = params;
            params.mediaType = mediaType;
            params.mediaFor = mediaFor;
            uploadfiles.single('image')(request, response, async (error) => {
                if (!error) {
                    const result = await media.createFile(request);
                    response.status(httpStatus.OK).json({data : result,message : "success"});
                }else{
                }
                next();
            });
        } catch (error) {
            throw Error(error);
        }
    }
}