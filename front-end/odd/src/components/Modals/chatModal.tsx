import React from 'react';
import Modal from './index';
import { Link } from 'react-router-dom';
import { useState } from "react";

type ChatModal = {
isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onAction: (inputValue:string) => void;
  actionLabel: string;
  children?: React.ReactNode;
}

const ChatModal: React.FC<ChatModal> = ({ isOpen, onClose, title, content, onAction, actionLabel, children }) => {
  const [inputValue, setInputValue] = useState("");
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={title} content={content}>
        <div className="mt-4 flex flex-col justify-center items-center">
          <input className="justify-center bg-white bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none mb-4" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
          <button
            type="button"
            className={`inline-flex justify-center rounded-md border border-transparent
            shadow-sm px-4 py-2 text-base font-medium text-black bg-white
            focus:outline-none focus:ring-2 focus:ring-offset-2
            mt-2 w-full`}
            onClick={() => onAction(inputValue)}
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
            Close
          </button>
          <div>
          {children}
          </div>
        </div>
      </Modal>
    );
  };
  
  export default ChatModal;