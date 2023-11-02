"use client";
import Link from "next/link";
import { GiCow } from "react-icons/gi";
import { BiEdit, BiTrash } from "react-icons/bi";
import { getMatrizes } from "@/lib/helper";
import { useQuery } from "react-query";

export default function ListaMatrizes() {
  const { isLoading, isError, data, error } = useQuery("matriz", getMatrizes);

  if (isLoading) return <div className="">Carregando Matrizes...</div>;
  if (isError) return <div>Algo deu errado!</div>;

  return (
    <div>
      <div>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <Link
              href="/novaMatriz"
              className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-slate-400"
            >
              Nova Matriz{" "}
              <span className="pl-2">
                {" "}
                <GiCow size={23} />{" "}
              </span>
            </Link>
          </div>
        </div>
      </div>
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
          <button className="cursor">
            {" "}
            <BiEdit size={25} color="rgb(34,197,94)" />
          </button>
        </Link>
        <button className="cursor">
          {" "}
          <BiTrash size={25} color="rgb(244,63,94)" />{" "}
        </button>
      </td>
    </tr>
  );
}
