import React from "react";
import Modal from "./index";
import { useState } from "react";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import { Util } from "../../middle-end/Util/Util";

type EncounterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onAction: (encounter?: Encounter, index?: number) => void;
  actionLabel: string;
  children?: React.ReactNode;
  encounter: Encounter;
};

const EncounterModal: React.FC<EncounterModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  onAction,
  actionLabel,
  children,
  encounter,
}) => {
  const [inputValue, setInputValue] = useState("");

  const renderButtons = () => {
    if (encounter.type >= 2) {
      // Peril-style encounter
      return (
        <>
          <div className="flex flex-col items-center">
            <img
              src={`/Encounters/${encounter.name}.jpg`}
              alt={encounter.name}
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
            <span className="text-sm">{encounter.name}</span>
          </div>
          {encounter.boxes.slice(0, 2).map((box, index) => (
            <button
              key={index}
              type="button"
              className={`inline-flex justify-center rounded-md border border-transparent
              shadow-sm px-4 py-2 text-base font-medium text-black bg-${
                Util.diceTypeToFacesAndClasses(box.type)[1]
              }-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2 w-full`}
              onClick={() => onAction(encounter, index)}
            >
              Encounter DiceBox {index + 1}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex justify-center rounded-md border
            border-transparent shadow-sm px-4 py-2 text-base font-medium bg-gray-800
            text-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-gray-500 w-full mt-2"
            onClick={onClose}
          >
            Stay
          </button>
        </>
      );
    } else {
      // Combat or Boss encounter
      return (
        <>
          <div className="flex flex-col items-center">
            <img
              src={`/Encounters/${encounter.name}.jpg`}
              alt={encounter.name}
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
            <span className="text-sm">{encounter.name}</span>
          </div>
          <button
            type="button"
            className={`inline-flex justify-center rounded-md border border-transparent
            shadow-sm px-4 py-2 text-base font-medium text-black bg-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2 w-full`}
            onClick={() => onAction()}
          >
            {actionLabel}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border
            border-transparent shadow-sm px-4 py-2 text-base font-medium bg-gray-800
            text-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-gray-500 w-full mt-2"
            onClick={onClose}
          >
            Stay
          </button>
        </>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} content={content}>
      <div className="mt-4 flex flex-col justify-center items-center">
        {renderButtons()}
        <div>{children}</div>
      </div>
    </Modal>
  );
};

export default EncounterModal;
