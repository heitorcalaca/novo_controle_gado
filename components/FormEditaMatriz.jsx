"use client";
import { getMatriz, getMatrizes, updateMatriz } from "@/lib/helper";
import { useReducer, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import Sucesso from "./sucesso";
import Modal from "react-modal";
import { modalOpenAction } from "@/redux/reducer";

const customStyles = {
  content: {
    position: "absolute",
    top: "14%",
    left: "25%",
    right: "25%",
    bottom: "14%",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  },
};

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function FormEditaMatriz({ modalEditaIsOpen, closeEditaModal }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const formId = useSelector((state) => state.app.client.formId);
  const [formData, setFormData] = useReducer(formReducer, {});

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["matriz", formId],
    {
      refetchOnWindowFocus: true,
    },
    () => {
      if (!formId) return Promise.resolve(null); // Evitar consulta vazia
      console.log("blalvalça");
      return getMatriz(formId);
    }
  );

  const updateMutation = useMutation(
    (newData) => updateMatriz(formId, newData),
    {
      onSuccess: async (data) => {
        if (data.success) {
          queryClient.prefetchQuery("matriz", getMatrizes);
          dispatch(modalOpenAction());
        } else {
          console.log("Erro", data.error);
        }
      },
    }
  );

  // Verificar se formId está definido e data está carregado
  if (!formId || isLoading) return <div></div>;

  if (isError) {
    console.log(error);
    return <div>Erro no carregamento...</div>;
  }

  const {
    numero,
    nome,
    caracteristica,
    dataNascimento,
    proprietario,
    situacao,
    nomePai,
    situacaoMae,
    nomeMae,
  } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updated = Object.assign({}, data, formData);
      await updateMutation.mutate(updated);
    } catch (error) {
      console.error("Erro", error);
    }
  };

  const formattedDate = dataNascimento
    ? new Date(dataNascimento).toISOString().split("T")[0]
    : "";

  return (
    <Modal
      isOpen={modalEditaIsOpen}
      onRequestClose={closeEditaModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>
        <h1 className="text-center font-bold text-2xl py-2 mb-7 bg-zinc-300 rounded-lg">
          Editar Matriz
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 w-auto gap-4">
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
                defaultValue={numero}
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
                defaultValue={nome}
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
                  defaultValue={caracteristica}
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
                defaultValue={formattedDate}
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
                defaultValue={proprietario}
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
                  defaultValue={situacao}
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
                defaultValue={nomePai}
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
                  defaultValue={situacaoMae}
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
                defaultValue={nomeMae}
                name="nomeMae"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Nome da Mãe"
              />
            </div>
          </div>
          <div className="w-auto pt-4">
            <button className="justify-center text-md w-full bg-green-500 border rounded py-3 px-2 text-white">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
