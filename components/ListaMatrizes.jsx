"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import { BiEdit, BiTrash } from "react-icons/bi";
import { deleteMatriz, getMatrizes } from "@/lib/helper";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateAction, deleteAction } from "@/redux/reducer";

export default function ListaMatrizes() {
  const { isLoading, isError, data, error } = useQuery("matriz", getMatrizes);

  if (isLoading) return <div className="">Carregando Matrizes...</div>;
  if (isError) return <div>Algo deu errado!</div>;

  return (
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
          {data.map((obj, i) => (
            <Tr {...obj} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tr({ _id, numero, nome, proprietario, situacao }) {
  const dispatch = useDispatch();

  const onUpdate = () => {
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
        <Link href="/editaMatriz">
          <button className="cursor" onClick={onUpdate}>
            {" "}
            <BiEdit size={25} color="rgb(34,197,94)" />
          </button>
        </Link>
        <button className="cursor" onClick={onDelete}>
          {" "}
          <BiTrash size={25} color="rgb(244,63,94)" />{" "}
        </button>
      </td>
    </tr>
  );
}
