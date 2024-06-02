import { Request, Response, NextFunction } from 'express'
import imgheritage from "../services/imgheritage"

const create = async (req: any, res: Response, next: NextFunction) => {
  if (!req.file) {
    const error = new Error('Please upload a firmware file')
    return next(error)
  }
  try {
    const ret = await imgheritage.create( req.file,req.body)
    return res.json({ data: ret })
  } catch (err) {
    err.status = err.status || 400
    return next(err)
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ret = await imgheritage.update(Number(req.params.id), req.file, req.body);
        return res.json({ data: ret });
    } catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await imgheritage.remove(Number(id));
        return res.json({ message: 'Heritage image deleted successfully' });
    } catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ret = await imgheritage.getAll();
        return res.json({ data: ret });
    } catch (err) {
        err.status = err.status || 400;
        return next(err);
    }
};

export default {
	create,
	update,
	remove,
	getAll
}
