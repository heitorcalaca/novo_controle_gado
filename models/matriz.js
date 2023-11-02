import { Schema, models, model } from "mongoose";

const matrizSchema = new Schema({
  numero: { type: Number, unique: true },
  nome: { type: String, unique: true },
  caracteristica: String,
  dataNascimento: Date,
  proprietario: String,
  situacao: String,
  nomePai: String,
  situacaoMae: String,
  nomeMae: String,
});

const Matrizes = models.matriz || model("matriz", matrizSchema);
export default Matrizes;
