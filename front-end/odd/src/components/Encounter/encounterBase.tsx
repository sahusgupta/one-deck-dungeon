import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type EncounterBaseProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const EncounterBase: React.FC<EncounterBaseProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition show={isOpen} as="div">
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-[2px]"
      onClose={onClose}>
        {/* Center it verticlaly and horizontally */}
        <div className='flex items-center justify-center min-h-screen'>
        {/* <div className="flex items-center justify-center min-h-screen
        pt-4 px-4 pb-20 text-center sm:block sm:p-0 absolute
        center it vertically"> */}
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          </Transition.Child>
          <div className="inline-block align-bottom rounded-lg
           bg-black
            px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
            transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="mt-2">
            {children}
          </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EncounterBase;