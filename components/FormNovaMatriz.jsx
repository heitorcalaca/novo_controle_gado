"use client";
import { useReducer, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { addMatriz } from "@/lib/helper";
import Sucesso from "./sucesso";
import Erro from "./erro";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function FormNovaMatriz() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const addMutation = useMutation(addMatriz, {
    onSuccess: () => {
      console.log("Dados inseridos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0)
      return console.log("Não tem dados no fomulário");
    let {
      numero,
      nome,
      caracteristica,
      dataNascimento,
      proprietario,
      situacao,
      nomePai,
      situacaoMae,
      nomeMae,
    } = formData;

    const model = {
      numero,
      nome,
      caracteristica,
      dataNascimento,
      proprietario,
      situacao,
      nomePai,
      situacaoMae,
      nomeMae,
    };

    addMutation.mutate(model);
  };

  const handleBlurNumero = async (e) => {
    const numero = e.target.value;
    const response = await fetch(`/api/matrizes?numero=${numero}`);
    const data = await response.json();

    if (data.exists) {
      alert("Número já existe no banco de dados.");
      document.getElementById("numero").value = "";
    }
  };

  const handleBlurNome = async (e) => {
    const nome = e.target.value;
    const response = await fetch(`/api/matrizes?nome=${nome}`);
    const data = await response.json();

    if (data.exists) {
      alert("Nome já existe no banco de dados.");
      document.getElementById("nome").value = "";
    }
  };

  if (addMutation.isLoading) return <div>Loading...</div>;
  if (addMutation.isError)
    return <Erro message={addMutation.error.message}></Erro>;
  if (addMutation.isSuccess) {
    return <Sucesso message={"Matriz Adicionada com Sucesso!"}></Sucesso>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 w-4/6 gap-4">
          <div className="input-type">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="numero"
            >
              Número
            </label>
            <input
              id="numero"
              type="number"
              onChange={setFormData}
              onBlur={handleBlurNumero}
              name="numero"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Número"
            />
          </div>

          <div className="input-type">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              id="nome"
              type="text"
              onChange={setFormData}
              onBlur={handleBlurNome}
              name="nome"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Nome"
            />
          </div>

          <div>
            <div className="form-check">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="car"
              >
                Característica
              </label>
              <select
                id="car"
                name="caracteristica"
                onChange={setFormData}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <option defaultValue={0}>Selecione a Característica</option>
                <option value="Amarela">Amarela</option>
                <option value="Amarela Mocha">Amarela Mocha</option>
              </select>
            </div>
          </div>

          <div className="input-type">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Data de nascimento
            </label>
            <input
              id="date"
              type="date"
              onChange={setFormData}
              name="dataNascimento"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Nome"
            />
          </div>

          <div className="input-type">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="prop"
            >
              Proprietário
            </label>
            <input
              id="prop"
              type="text"
              onChange={setFormData}
              name="proprietario"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Nome do Proprietário"
            />
          </div>

          <div>
            <div className="form-check">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="sit"
              >
                Situação
              </label>
              <select
                id="sit"
                name="situacao"
                onChange={setFormData}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <option defaultValue={0}>Selecione a Situação</option>
                <option value="normal">Normal</option>
                <option value="morreu">Morreu</option>
                <option value="sumiu">Sumiu</option>
                <option value="vendeu">Vendeu</option>
              </select>
            </div>
          </div>

          <div className="input-type">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nomep"
            >
              Nome do Pai
            </label>
            <input
              id="nomep"
              type="text"
              onChange={setFormData}
              name="nomePai"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Nome da Mãe"
            />
          </div>

          <div>
            <div className="form-check">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="sitm"
              >
                Situação da mãe
              </label>
              <select
                id="sitm"
                name="situacaoMae"
                onChange={setFormData}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              >
                <option defaultValue={0}>Selecione a Situação</option>
                <option value="normal">Normal</option>
                <option value="morreu">Morreu</option>
                <option value="sumiu">Sumiu</option>
                <option value="vendeu">Vendeu</option>
              </select>
            </div>
          </div>

          <div className="input-type">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nomem"
            >
              Nome da mãe
            </label>
            <input
              id="nomem"
              type="text"
              onChange={setFormData}
              name="nomeMae"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Nome da Mãe"
            />
          </div>
        </div>
        <div className="w-4/6 pt-4">
          <button className="justify-center text-md w-full bg-green-500 border rounded py-3 px-2 text-white">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
