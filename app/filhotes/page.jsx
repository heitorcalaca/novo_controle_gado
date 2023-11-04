import { getMatrizNome } from "@/lib/helper";

export default function Filhotes() {
  return <h1>Hello</h1>;
}

const nomeMatriz = "Manhosa";
getMatrizNome(nomeMatriz)
  .then((json) => {
    console.log("Matriz Encontrada:", json);
  })
  .catch((error) => {
    console.error("Erro na busca:", error);
  });
