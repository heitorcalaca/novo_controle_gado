"use client";
import ListaMatrizes from "@/components/ListaMatrizes";
import Link from "next/link";
import { GiCow } from "react-icons/gi";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { deleteMatriz, getMatrizes } from "@/lib/helper";
import { deleteAction } from "@/redux/reducer";

Modal.setAppElement("#__next");

const customStyles = {
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

export default function Matrizes() {
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (deleteId) {
      openModal();
    }
  }, [deleteId]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMatriz(deleteId);
      await queryClient.prefetchQuery("matriz", getMatrizes);
      await dispatch(deleteAction(null));
    }
  };

  const handleCancel = async () => {
    await dispatch(deleteAction(null));
    closeModal();
  };

  return (
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

      <div className="container mx-auto">
        <ListaMatrizes />
      </div>

      {deleteId && (
        <ComponenteDelete
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

function ComponenteDelete({
  modalIsOpen,
  openModal,
  closeModal,
  handleDelete,
  handleCancel,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
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
