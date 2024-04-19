import React, { useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { ModalContext } from "../../context/ModalContext";
import { createPortal } from "react-dom";
import { ModalContent } from "./ModalContent";
import { MovieDetails } from "../../types";

function Modal() {
  const { closeModal, modalStatus, loading, error, details } =
    useContext<{
      closeModal : any,
      modalStatus  : any,
      loading : boolean,
      error : boolean,
      details : MovieDetails
    }>(ModalContext);
  const modalContainer = document.getElementById(
    "modalContainer"
  ) as HTMLElement;

  function close(event: any) {
    event.stopPropagation();
    closeModal();
  }

  return (
    <AnimatePresence>
      {modalStatus.open ? (
        <>
          {createPortal(
            <ModalContent
              onClose={close}
              loading={loading}
              error={error}
              details={details}
            />,
            modalContainer
          )}
        </>
      ) : null}
    </AnimatePresence>
  );
}

export { Modal };
