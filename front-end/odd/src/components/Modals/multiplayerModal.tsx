import React from 'react';
import Modal from './index';
import { Link } from 'react-router-dom';

type MultiplayerModal = {
isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onAction: () => void;
  actionLabel: string;
  children?: React.ReactNode;
}

const MultiplayerModal: React.FC<MultiplayerModal> = ({ isOpen, onClose, title, content, onAction, actionLabel, children }) => {
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={title} content={content}>
        <div className="mt-4">
          <input className="inline-flex justify-center bg-white bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none"></input>
          <button
            type="button"
            className={`inline-flex justify-center rounded-md border border-transparent
            shadow-sm px-4 py-2 text-base font-medium text-white
            focus:outline-none focus:ring-2 focus:ring-offset-2
            mr-3 w-full`}
            onClick={onAction}
          >
            {actionLabel}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border
              border-transparent shadow-sm px-4 py-2 text-base font-medium
              text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2
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
  
  export default MultiplayerModal;