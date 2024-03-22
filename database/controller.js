import Matrizes from "@/models/matriz";

// GET: http://localhost:3000/api/matrizes
export async function getMatrizes(req, res) {
  try {
    const matrizes = await Matrizes.find({});

    if (!matrizes || matrizes.length === 0) {
      return res.status(404).json({ error: "Dados não encontrados" });
    }

    res.status(200).json(matrizes);
  } catch (error) {
    console.error("Error while fetching data: ", error);
    res.status(500).json({ error: "Error While Fetching Data" });
  }
}

// GET: http://localhost:3000/api/matrizes/1
export async function getMatriz(req, res) {
  try {
    const { idMatriz } = req.query;

    if (idMatriz) {
      const matriz = await Matrizes.findById(idMatriz).catch((error) => {
        res.status(500).json({ error: "Erro ao buscar dados" });
      });

      if (!matriz) {
        return res.status(404).json({ error: "Matriz não encontrada" });
      }

      res.status(200).json(matriz);
    } else {
      res.status(400).json({ error: "Nenhuma matriz selecionada...!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Não foi possível encontrar a matriz...!" });
  }
}

export async function checkNumeroExists(req, res) {
  try {
    const { numero } = req.query;
    if (numero) {
      const matrizes = await Matrizes.find({ numero: numero });
      if (matrizes) {
        return res
          .status(200)
          .json({
            exists: true,
            message: "Número já existe no banco de dados",
          });
      } else {
        return res
          .status(200)
          .json({ exists: false, message: "Número disponível" });
      }
    }
  } catch (error) {
    console.error("Error while checking if number exists: ", error);
    res.status(500).json({ error: "Erro ao verificar se o número existe" });
  }
}

export async function checkNomeExists(req, res) {
  try {
    const { nome } = req.query;
    if (nome) {
      const matrizes = await Matrizes.find({ nome: nome });
      if (matrizes) {
        return res
          .status(200)
          .json({ exists: true, message: "Nome já existe no banco de dados" });
      } else {
        return res
          .status(200)
          .json({ exists: false, message: "Nome disponível" });
      }
    }
  } catch (error) {
    console.error("Error while checking if name exists: ", error);
    res.status(500).json({ error: "Erro ao verificar se o nome existe" });
  }
}

//POST: http://localhost:3000/api/matrizes
export async function postMatrizes(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res
        .status(400)
        .json({ error: "Dados de formulário não informados...!" });
    }

    try {
      await Matrizes.create(formData);
      res.status(200).json({ message: "Dados criados com sucesso" });
    } catch (error) {
      if (error.code === 11000) {
        // Código 11000 indica uma violação de unicidade (duplicação)
        const errorMessage = {};

        if (error.keyPattern.numero) {
          errorMessage.numero = "Número já existe no banco de dados.";
        }

        if (error.keyPattern.nome) {
          errorMessage.nome = "Nome já existe no banco de dados.";
        }

        console.log("errorMessage: ", errorMessage);

        return res.status(400).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: "Erro ao criar dados" });
      }
    }
  } catch (error) {
    console.error("Error while creating data: ", error);
    res.status(500).json({ error: "Erro ao criar dados" });
  }
}

// PUT: http://localhost:3000/api/matrizes/1
export async function putMatrizes(req, res) {
  try {
    const { idMatriz } = req.query;
    const formData = req.body;

    if (idMatriz && formData) {
      try {
        const updatedMatriz = await Matrizes.findByIdAndUpdate(
          idMatriz,
          formData,
          { new: true }
        );

        if (!updatedMatriz) {
          return res.status(404).json({ error: "Matriz não encontrada" });
        }

        res.status(200).json(updatedMatriz);
      } catch (error) {
        if (error.code === 11000) {
          // Código 11000 indica uma violação de unicidade (duplicação)
          const errorMessage = {};

          if (error.keyPattern.numero) {
            errorMessage.numero = "Número já existe no banco de dados.";
          }

          if (error.keyPattern.nome) {
            errorMessage.nome = "Nome já existe no banco de dados.";
          }

          return res.status(400).json({ error: errorMessage });
        } else {
          return res.status(500).json({ error: "Erro ao atualizar dados" });
        }
      }
    } else {
      res.status(400).json({ error: "Matriz não selecionada...!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar dados" });
  }
}

// DELETE: http://localhost:3000/api/matrizes/1
export async function deleteMatrizes(req, res) {
  try {
    const { idMatriz } = req.query;

    if (idMatriz) {
      const deletedMatriz = await Matrizes.findByIdAndDelete(idMatriz);

      if (!deletedMatriz) {
        return res.status(404).json({ error: "Matriz não encontrada" });
      }

      res.status(200).json({ deleted: idMatriz });
    } else {
      res.status(400).json({ error: "Matriz não selecionada...!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while deleting data" });
  }
}
