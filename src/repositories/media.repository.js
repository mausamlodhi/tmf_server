import fs from 'fs';
import path from "path";
import models from '../models';
const { media } = models;
export default {
    async createFile({ params, file, headers, connection }) {
        try {
            let result ='';
            const mediaType = params.mediaType;
            const mediaFor = params.mediaFor;
            const imageDir = path.join(__dirname, `../../${file.path}`);
            const HTTPs = connection.encrypted === undefined ? 'http' : 'httpStatus';
            const mediaData = {
                name: file.filename || file.originalname,
                basePath: file.path,
                imagePath: imageDir,
                mediaType,
                mediaFor,
            }
            result = await media.create(mediaData);
            return result;
        } catch (error) {
            throw Error(error);
        }
    }
}