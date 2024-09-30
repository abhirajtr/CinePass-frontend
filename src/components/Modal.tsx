// Modal.tsx
import React from 'react';

interface ModalProps {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;  // Accepting a function for confirm action
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, confirmText, cancelText, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-text-50 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-4 text-text-50">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-400 text-text-950 rounded" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
