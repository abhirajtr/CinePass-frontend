import { FC } from 'react';

interface ConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({ onCancel, onConfirm, title, message }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-background-300 rounded-lg shadow-lg p-4 w-1/3">
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                {message && <p className="mb-4">{message}</p>} {/* Display message here */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
