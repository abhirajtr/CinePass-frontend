/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../axiosInstance';
import Modal from './Modal';  // Import Modal component
import { useDebounce } from '../hooks/useDebounce';

interface ITheatre {
    theatreId: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    createdAt: string;
    isBlocked: boolean;
    isApproved: boolean;
}

const AdminTheatreList = () => {
    const [theatres, setTheatres] = useState<ITheatre[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const theatresPerPage = 10;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');
    const [modalAction, setModalAction] = useState<() => void>(() => { });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchValue = useDebounce(searchTerm, 500);    

    const fetchTheatres = async () => {
        try {
            const { data } = await axiosInstance.get<{ theatres: ITheatre[], totalTheatres: number }>("/admin/theatres", {
                params: {
                    page: currentPage,
                    limit: theatresPerPage,
                    searchTerm: debouncedSearchValue,
                }
            });
            setTheatres(data.theatres);
            setTotalPages(Math.ceil(data.totalTheatres / theatresPerPage));
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || 'Error fetching theatres');
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };
    useEffect(() => {
        fetchTheatres();
    }, [debouncedSearchValue, currentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((currentPage) => currentPage + 1);
    };
    const goToPreviousPage = () => {
        if (currentPage !== 1) setCurrentPage((currentPage) => currentPage - 1);
    };

    // Open modal with a specific action function
    const openModal = (action: () => void, title: string, message: string) => {
        setModalAction(() => action);  // Set the action to execute on confirm
        setModalTitle(title);
        setModalMessage(message);
        setShowModal(true);
    };


    // Handle Block Theatre action
    const handleBlockTheatre = async (theatre: ITheatre) => {
        try {
            const { data } = await axiosInstance.patch<{ updatedTheatre: ITheatre }>(`/admin/theatres/block/`, { theatreId: theatre.theatreId, isBlocked: !theatre.isBlocked });
            toast.success(`Theatre ${data.updatedTheatre.name} blocked successfully!`);
            setTheatres((prevTheatres) =>
                prevTheatres.map((t) =>
                    t.theatreId === data.updatedTheatre.theatreId ? { ...t, isBlocked: data.updatedTheatre.isBlocked } : t
                )
            )
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || 'Error fetching theatres');
            } else {
                toast.error('An error occurred while blocking the theatre.');
            }
        }
    };

    // Handle Approve Theatre action
    const handleApproveTheatre = async (theatre: ITheatre) => {
        try {
            const { data } = await axiosInstance.patch<{ updatedTheatre: ITheatre }>(`/admin/theatres/approve`, { theatreId: theatre.theatreId });
            toast.success(`Theatre ${theatre.name} approved successfully!`);
            console.log(data.updatedTheatre);

            setTheatres((prevTheatres) => (
                prevTheatres.map((t) => (
                    t.theatreId === data.updatedTheatre.theatreId
                        ? { ...t, isApproved: data.updatedTheatre.isApproved }
                        : t
                ))
            ));
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('An error occurred while approving the theatre.');
            }
        }
    };

    const cancelAction = () => {
        setShowModal(false);
    };

    return (
        <div className='p-4'>
            <h1 className='text-text-950 font-bold text-2xl'>Theatres</h1>
            <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                value={searchTerm}
                className='w-full mt-2 p-2 border border-accent-500 rounded-md bg-background-50'
                placeholder='Search by name or email'
            />
            <div className="overflow-x-auto mt-3 max-h-[33rem] min-h-[33rem] scrollbar scrollbar-thumb-scrollbar-thumb scrollbar-thumb-rounded-full scrollbar-track-scrollbar-bg">
                <table className="min-w-full bg-background-100 border border-accent-200 rounded-md table-fixed">
                    <thead className="bg-background-200">
                        <tr className='border-b border-accent-200'>
                            <th className="w-1/5 py-2 px-4 text-left">Name</th>
                            <th className="w-1/5 py-2 px-4 text-left">Email</th>
                            <th className="w-1/5 py-2 px-4 text-left">Phone</th>
                            <th className="w-1/5 py-2 px-4 text-left">Location</th>
                            <th className='w-1/5 py-2 px-4 text-left'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-background-100">
                        {theatres.map((theatre) => (
                            <tr key={theatre.theatreId} className="border-b border-accent-200 hover:bg-background-50">
                                <td className="py-2 px-4 font-medium">{theatre.name}</td>
                                <td className="py-2 px-4">{theatre.email}</td>
                                <td className="py-2 px-4">{theatre.phone}</td>
                                <td className="py-2 px-4">{theatre.location}</td>
                                <td className='py-2 px-4'>

                                    {theatre.isApproved
                                        ?
                                        <button
                                            className={`w-24 px-4 py-1 rounded ${theatre.isBlocked ? 'bg-green-500' : 'bg-red-500'}`}
                                            onClick={() =>
                                                openModal(
                                                    () => handleBlockTheatre(theatre),
                                                    `${theatre.isBlocked ? 'Unblock' : 'Block'} Theatre`,
                                                    `Are you sure you want to ${theatre.isBlocked ? 'unblock' : 'block'} the theatre "${theatre.name}"?`
                                                )
                                            }
                                        >
                                            {theatre.isBlocked ? "Unblock" : "Block"}
                                        </button>
                                        :
                                        <button
                                            className={`w-24 px-4 py-1 rounded bg-yellow-500`}
                                            onClick={() =>
                                                openModal(
                                                    () => handleApproveTheatre(theatre),  // Pass the approve function
                                                    `Approve Theatre`,
                                                    `Are you sure you want to approve the theatre "${theatre.name}"?`
                                                )
                                            }
                                        // disabled={theatre.isApproved}
                                        >
                                            {theatre.isApproved ? "Approved" : "Approve"}
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between items-center mt-4'>
                <button
                    className='bg-accent-500 px-3 py-1 rounded disabled:opacity-50'
                    disabled={currentPage === 1}
                    onClick={goToPreviousPage}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    className='bg-accent-500 px-3 py-1 disabled:opacity-50 rounded'
                    disabled={currentPage === totalPages}
                    onClick={goToNextPage}
                >
                    Next
                </button>
            </div>

            {showModal && (
                <Modal
                    title={modalTitle}
                    message={modalMessage}
                    confirmText="Confirm"
                    cancelText="Cancel"
                    onConfirm={() => {
                        modalAction();  // Call the action function (block/approve)
                        setShowModal(false);  // Close the modal
                    }}
                    onCancel={cancelAction}
                />
            )}
        </div>
    );
};

export default AdminTheatreList;
