import express, { Request, Response } from 'express'

const processRequest = async (req: Request, res: Response) => {
    res.status(200).json({ status: "200" })
}

const router = express.Router()

router.get('/api/tickets/test', processRequest)

export { router as testRouter }
