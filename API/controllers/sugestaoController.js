import sugestaoService from "../services/sugestaoService";
const  createSujestao= async (req, res) => {
    try {
      const sugestao = await sugestaoService.createSugestao(req.body);
      res.status(201).json(sugestao);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  export default {
    createSujestao
  };