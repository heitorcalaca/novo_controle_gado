"use client";
import ListaMatrizes from "@/components/ListaMatrizes";
import { GiCow } from "react-icons/gi";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient, useMutation } from "react-query";
import { deleteMatriz, getMatrizes } from "@/lib/helper";
import { deleteAction, modalOpenAction, updateAction } from "@/redux/reducer";
import Sucesso from "@/components/sucesso";
import FormEditaMatriz from "@/components/FormEditaMatriz";
import FormNovaMatriz from "@/components/FormNovaMatriz";

Modal.setAppElement("#__next");

export default function Matrizes() {
  const deleteId = useSelector((state) => state.app.client.deleteId);

  const modalEditaIsOpen = useSelector(
    (state) => state.app.client.modalEditaIsOpen
  );

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalNovaIsOpen, setModalNovaIsOpen] = useState(false);

  const openDeleteModal = () => {
    setModalDeleteIsOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDeleteIsOpen(false);
  };

  const closeEditaModal = () => {
    dispatch(modalOpenAction());
    dispatch(updateAction(null));
  };

  const openNovaModal = () => {
    setModalNovaIsOpen(true);
  };

  const closeNovaModal = () => {
    setModalNovaIsOpen(false);
  };

  useEffect(() => {
    if (deleteId) {
      openDeleteModal();
    }
  }, [deleteId]);

  const UpdateMutation = useMutation(
    (newData) => updateMatriz(formId, newData),
    {
      onSuccess: async (data) => {
        queryClient.prefetchQuery("matriz", getMatrizes);
      },
    }
  );

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMatriz(deleteId);
      await queryClient.prefetchQuery("matriz", getMatrizes);
      await dispatch(deleteAction(null));
    }
  };

  const handleCancel = async () => {
    await dispatch(deleteAction(null));
    closeDeleteModal();
  };

  const onNova = () => {
    openNovaModal();
  };

  if (UpdateMutation.isSuccess) {
    return <Sucesso message={"Matriz Editada com Sucesso!"}></Sucesso>;
  }

  return (
    <div>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button
            onClick={onNova}
            className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-slate-400"
          >
            Nova Matriz{" "}
            <span className="pl-2">
              {" "}
              <GiCow size={23} />{" "}
            </span>
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <ListaMatrizes />
      </div>

      {deleteId && (
        <ComponenteDelete
          modalDeleteIsOpen={modalDeleteIsOpen}
          closeDeleteModal={closeDeleteModal}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      )}

      {
        <FormEditaMatriz
          modalEditaIsOpen={modalEditaIsOpen}
          closeEditaModal={closeEditaModal}
        />
      }

      {
        <FormNovaMatriz
          modalNovaIsOpen={modalNovaIsOpen}
          closeNovaModal={closeNovaModal}
        ></FormNovaMatriz>
      }
    </div>
  );
}

function ComponenteDelete({
  modalDeleteIsOpen,
  closeDeleteModal,
  handleDelete,
  handleCancel,
}) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(150, 150, 150, 0.75)",
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
    },
  };
  return (
    <Modal
      isOpen={modalDeleteIsOpen}
      onRequestClose={closeDeleteModal}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={false}
    >
      <div>
        <div>
          <h1 className="font-bold text-center text-red-600 text-xl ">
            Tem certeza que deseja excluir a Matriz?
          </h1>
        </div>
        <div className="flex gap-10 justify-center mt-6">
          <button
            className="flex bg-red-500 text-white px-6 py-2 rounded-md border-2 border-red-700 hover:bg-red-400 hover:font-bold"
            onClick={handleDelete}
          >
            Sim
          </button>
          <button
            className="flex bg-green-500 text-white px-6 py-2 rounded-md border-2 border-green-700 hover:bg-green-400 hover:font-bold"
            onClick={handleCancel}
          >
            Não
          </button>
        </div>
      </div>
    </Modal>
  );
}
