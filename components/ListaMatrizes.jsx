import { GiCow } from "react-icons/gi";

export default function ListaMatrizes() {
  return (
    <div>
      <div>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-slate-400">
              Nova Matriz{" "}
              <span className="pl-2">
                {" "}
                <GiCow size={23} />{" "}
              </span>
            </button>
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
      </table>
    </div>
  );
}
