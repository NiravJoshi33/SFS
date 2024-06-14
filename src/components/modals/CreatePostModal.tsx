
// 'use client';`	
import React, { useContext, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline, imageOutline, videocamOutline, happyOutline, locationOutline, ellipsisHorizontal } from 'ionicons/icons';
import { useTonConnectUI } from '@tonconnect/ui-react';


interface CreatePostModalProps {
    isOpen: boolean;
    toggleModal: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, toggleModal }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [submittedData, setSubmittedData] = useState<{ title: string; description: string; image: string } | null>(null);


    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Create a URL for the uploaded file (for demonstration purposes)
        const imageUrl = file ? URL.createObjectURL(file) : '';

        // Store the form data in the state
        const data = {
            title,
            description,
            image: imageUrl,
        };
        setSubmittedData(data);

        console.log(data, '----data');
        // Reset the form
        setTitle('');
        setDescription('');
        setFile(null);
        toggleModal();
    };

    const [tonConnectUI] = useTonConnectUI();


    async function handlePost() {
        if (!tonConnectUI.connected) {
            alert("Please connect your wallet first.");
            return;
        }
        let destinationAddress = "0QDc7k2UluUJpa_So9sRpxZjE7WZVXUt1XD67AjQPlW31hD_";
        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: destinationAddress,
                    amount: (0.0011 * 1e9).toString(),
                },
            ],
        };

        try {
            await tonConnectUI.sendTransaction(transaction);
            alert("Post created successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    }





    return (
        <div className="fixed inset-0 z-[99] flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-sm" onClick={toggleModal}></div>
            <div className="bg-white dark:bg-dark3 p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 lg:w-1/3 z-10">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Create Post</h2>
                    <button onClick={toggleModal} className="text-xl">
                        <IonIcon icon={closeOutline} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Title of the NFT"
                        className="w-full p-2 border border-gray-300 rounded mb-4 resize-none bg-gray-100"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description of the NFT"
                        className="w-full p-2 border border-gray-300 rounded mb-4 resize-none bg-gray-100"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex items-center justify-center w-full mb-4">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>

                    <div className="flex items-center justify-center">

                        <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
