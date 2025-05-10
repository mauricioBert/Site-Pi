import Sugestao from '../models/sugestao.js';

class SugestaoService {
  async createSugestao(sugestaoData) {
    const sugestao = new Sugestao(sugestaoData);
    return await sugestao.save();
  }

  async getAllSugestoes() {
    return await Sugestao.find(); // Para trazer os dados do usuário, se necessário
  }

  async getSugestaoById(id) {
    return await Sugestao.findById(id);
  }

  async updateSugestao(id, updateData) {
    return await Sugestao.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteSugestao(id) {
    return await Sugestao.findByIdAndDelete(id);
  }
}

export default new SugestaoService();