import express, { Request, Response } from "express";
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.send({ data: 'qwd12312' });
})
// export {...controllers }
export default router