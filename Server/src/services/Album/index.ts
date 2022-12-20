import express, { Request, Response } from "express";
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.send({ data: 'Album' });
})
// export {...controllers }
export default router 