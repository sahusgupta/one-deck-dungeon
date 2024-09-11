import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[2px]"
      onClose={onClose}>
        {/* Center it verticlaly and horizontally */}
        <div className='flex items-center justify-center min-h-screen'>
        {/* <div className="flex items-center justify-center min-h-screen
        pt-4 px-4 pb-20 text-center sm:block sm:p-0 absolute
        center it vertically"> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          </Transition.Child>
          <div className="inline-block align-bottom rounded-lg
           bg-lightbg dark:bg-darkbg
            px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
            transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900
            dark:text-lightbg">
              {title}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-md text-gray-500 mb-3 dark:text-light3">
                {content}
              </p>
              {children}
          </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;