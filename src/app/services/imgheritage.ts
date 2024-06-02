import {ImgHeritage} from "../../db";
import uploads from "../../extensions/uploads";
import { Op, where } from 'sequelize';


const create = async (file:any, data: any) => {
	const {heritageId, description} = data;
	if (!file) {
		throw new Error('No file uploaded');
	}

	const img = await ImgHeritage.findOne({ where: { heritageId } });

	if(img){
		await uploads.process.remove(`/img/${file.filname}`);
		throw new Error("");
	}

	await uploads.process.caculate_crc(heritageId, 2048);

	return await ImgHeritage.create({
		heritageId,
		url: `/imgs/${file.filename}`,
		description,
	  });

};

const update = async (id:number,file: any, data: any) => {
	const { heritageId, description } = data;

	const img = await ImgHeritage.findOne({ where: { heritageId } });

	if (!img) {
		throw new Error('Heritage image not found');
	}

	if (file) {
		// Remove the old file if a new file is uploaded
		await uploads.process.remove(img.url);
		// Update the image URL with the new file
		img.url = `/imgs/${file.filename}`;
	}

	if (description) {
		img.description = description;
	}

	await uploads.process.caculate_crc(heritageId, 2048);

	return await img.save();
};

const remove = async (id: number) => {
	const img = await ImgHeritage.findOne({ where: { id } });

	if (!img) {
		throw new Error('Heritage image not found');
	}

	// Remove the file from the file system
	await uploads.process.remove(img.url);

	// Remove the entry from the database
	return await img.destroy();
};

const getAll = async () => {
	return await ImgHeritage.findAll();
};

export default{
	create,
	update,
	remove,
	getAll
}