import mongoose from "mongoose";

const sugestaoSchema = new mongoose.Schema({
    idUser: { type: Number, required: true }, // Corrigido aqui
    url: { type: String, required: true },
    motivo: { type: String, required: true },
    tipo: { type: String, required: true },
    situacao: { type: Boolean },
    foto: { type: String },
});

const Sugestao = mongoose.model('sugestao', sugestaoSchema);

export default Sugestao;
