"use client";
import React, { use, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { getMatrizes } from "@/lib/helper";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { updateAction, deleteAction, modalOpenAction } from "@/redux/reducer";
import { useRouter } from "next/router";

export default function ListaMatrizes() {
  const { isLoading, isError, data, error } = useQuery("matriz", getMatrizes);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <div className="">Carregando Matrizes...</div>;
  if (isError) return <div>Algo deu errado!</div>;

  const filteredData = data.filter(
    (matriz) =>
      matriz.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matriz.numero.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className=" ">
        <form>
          <input
            className="w-full px-3 py-2 mb-3 mt-3 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            type="search"
            placeholder="Pesquisa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-600">
              <th className="px-16 py-2">
                <span className="text-gray-200">Numero</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-200">Nome</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-200">Proprietário</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-200">Situação</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-200">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            {filteredData.map((obj, i) => (
              <Tr {...obj} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tr({ _id, numero, nome, proprietario, situacao }) {
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(modalOpenAction(_id));
    dispatch(updateAction(_id));
  };

  const onDelete = () => {
    dispatch(deleteAction(_id));
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          {numero || "Unknown"}
        </span>
      </td>
      <td className="px-16 py2">
        <span>{nome || "Unknown"}</span>
      </td>
      <td className="px-16 py2">
        <span>{proprietario || "Unknown"}</span>
      </td>
      <td className="px-16 py2">
        <span>{situacao || "Unknown"}</span>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          {" "}
          <BiEdit size={25} color="rgb(34,197,94)" />
        </button>

        <button className="cursor" onClick={onDelete}>
          {" "}
          <BiTrash size={25} color="rgb(244,63,94)" />{" "}
        </button>
      </td>
    </tr>
  );
}
