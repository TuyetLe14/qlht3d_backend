import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: async (req: any, file: any, cb) => {
    cb(null, path.join(__dirname, '../../public/imgs'))
  },
  filename: async (req: any, file: any, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})

const img = multer({ storage })

export default img
