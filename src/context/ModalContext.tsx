import { PropsWithChildren, createContext, useState } from "react";

// Define the shape of the context
type ModalContextType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context with a default value of undefined
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

// ModalProvider component to provide the context to its children
export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(
    "Estas seguro de eliminar este producto?"
  );

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        message,
        setMessage,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
