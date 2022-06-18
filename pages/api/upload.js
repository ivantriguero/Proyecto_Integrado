import bodyParser from 'body-parser';
import multer from 'multer'
import nc from 'next-connect';


const handler=nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/public/imgs/proyectos')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
    
const upload = multer({ storage: storage })

let uploadFoto=upload.single("file")

handler.use(uploadFoto)
handler.post((req, res) => {
  res.status(200).send("Uploaded File")
})

export default handler
