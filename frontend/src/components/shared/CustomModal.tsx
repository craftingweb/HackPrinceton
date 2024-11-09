
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: JSX.Element;
  footer: JSX.Element;
  modalContent: JSX.Element;
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  modalContent,
  footer,
}) => {
  if (!isOpen) return null;

  // Lock scrolling when the modal is open
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden"; // Disable scrolling
  //   } else {
  //     document.body.style.overflow = ""; // Re-enable scrolling
  //   }

  //   // Cleanup on component unmount
  //   return () => {
  //     document.body.style.overflow = ""; // Re-enable scrolling if modal is closed or unmounted
  //   };
  // }, [isOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-3xl shadow-lg z-10">
        {header}
        {modalContent}
        <div className="">{footer}</div>
      </div>
    </div>
  );
};

export default CustomModal;
