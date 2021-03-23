import { Response, Request } from 'express'

class IndexController {
  public index = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ achievement: 'easter egg :pogchamp:', name: 'wkm-server', author: 'Paweł Wojtasiński' })
  }
}

export default IndexController
