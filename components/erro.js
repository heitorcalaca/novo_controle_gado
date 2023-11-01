import { BiError } from "react-icons/bi";

export default function Erro({ message }) {
  return (
    <div className="success container mx-auto">
      <div className="flex justify-center mx-auto border border-red-200 bg-red-400 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5">
        {message} <BiError size={25} color="rgb(244,63,94)" />
      </div>
    </div>
  );
}
