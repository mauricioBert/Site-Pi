import express from 'express'
import sugestaoController from '../controllers/sugestaoController.js'
// import sugestaoController from '../controllers/sugestaoController'
import Auth from '../middleware/Auth.js'
const router = express.Router()


router.get('/sugestao', sugestaoController.getAllSugestao)
router.get('/sugestao/:id', Auth,sugestaoController.getOneSugestao)
router.put('/sugestao/:id', Auth,sugestaoController.updateSugestao)
export default router;