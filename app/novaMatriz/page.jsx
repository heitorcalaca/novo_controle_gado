"use client";
import FormNovaMatriz from "@/components/FormNovaMatriz";

export default function NovaMatriz() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className="container mx-auto">
        <button
          className="justify-center mb-10 text-md w-1/12 bg-yellow-400 rounded py-3 px-2 text-gray-500 border-0 font-bold"
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>
      <div className="container mx-auto">
        <FormNovaMatriz />;
      </div>
    </div>
  );
}
