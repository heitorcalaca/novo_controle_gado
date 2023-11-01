import { Schema, models, model } from "mongoose";

const matrizSchema = new Schema({
  numero: Number,
  nome: String,
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
