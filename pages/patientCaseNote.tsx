import Modal from "react-modal";
import { useState } from "react";
import { validatePhoneNumber } from "../services/twilio";

export default function PatientCaseNoteModal({
    isOpen,
    onDismiss,
    getPatientCaseNotes,
    initialNumber,
    updateCaseNote
}: {
    isOpen: boolean;
    onDismiss: () => void;
    initialNUmber,
    getPatientCaseNotes: (number: string) => any,
    updateCaseNote: (number: string, title: string, caseNote: string, pinataCID: string, timestamp: string) => any,
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [number, setNumber] = useState(initialNumber);
    const [title, setTitle] = useState("");
    const [pinataCID, setPinataCID] = useState("");
    const [caseNote, setCaseNote] = useState("");
    const [timestamp, setTimestamp] = useState(new Date().toISOString());
    const [invalidInput, setInvalidInput] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    function editNumber(input: string) {
        setInvalidInput(false);
        setNumber(input);
    }


    async function checkPhoneNumber() {
        if (!validatePhoneNumber(number)) {
            setInvalidInput(true);
            return;
        }
        setInvalidInput(false);
        setActiveIndex(1);
    }

    async function editPinataCID(event: { target: { files: (string | Blob)[]; }; }) {
        if (event.target.files[0]) {
            setIsUploading(true);
            const data = new FormData();
            data.append('file', event.target.files[0]);
            data.append('pinataOptions', JSON.stringify({ wrapWithDirectory: false }));

            const response = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                    method: "POST",
                    headers: {
                        pinata_api_key: process.env.PINATA_API_KEY,
                        pinata_secret_api_key: process.env.PINATA_API_SECRET,
                    },
                    body: data,
                }
            );


            try {
                const result = await response.json();
                const newPinataCID = result.IpfsHash;
                setPinataCID(newPinataCID);
                setIsUploading(false);
            } catch (error) {
                console.error('Error uploading to Pinata:', error);
                setIsUploading(false);
            }
        } else {
            console.log('No  file selected');
        }
    };
    async function handleUpdateCaseNote() {
        if (!title || (!pinataCID && !caseNote)) {
            setInvalidInput(true);
            return;
        }

        setInvalidInput(false);
        setDoneLoading(false);
        setActiveIndex(2);

        try {
            await updateCaseNote(number, title, caseNote, pinataCID, timestamp);
            setDoneLoading(true);
        } catch (error) {
            console.error("Error updating case note:", error);
        }
    }

    function closeModal() {
        setActiveIndex(0);
        setNumber("");
        setDoneLoading(false);
        setInvalidInput(false);
        onDismiss();
    }

    const customStyles = {
        content: {
            margin: "10%",
            borderRadius: "0px",
            padding: "0",
            boxShadow: "0",
            background: "#FCF6F1",
            border: "1px solid #CCCCCC",
            height: "fit-content",
            maxHeight: "70vh",
            overflowY: "auto",
        },
    };

    return (
        <Modal isOpen={isOpen} style={customStyles}>
            {activeIndex === 0 && (
                <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            New Patient Case Note
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Input the patient phone number to begin
                        </p>
                    </div>
                    <div className="mt-2 px-2 py-5">
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className={`${invalidInput ? "border-red-500" : ""
                                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    placeholder="E.g. +234805678900"
                                    onChange={(e) => editNumber(e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-red-600" id="email-error">
                                {invalidInput
                                    ? "Invalid phone number. Ensure it's in E.164 format."
                                    : ""}
                            </p>
                        </div>
                    </div>

                    <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            onClick={() => {
                                checkPhoneNumber();
                                getPatientCaseNotes(number);
                            }}
                            className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            {activeIndex === 1 && (
                <div>    <div>
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Create a Case Note
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Input the case note details and upload the corresponding document
                        </p>
                    </div>
                    <div className="mt-2 px-2 py-5">
                        <div>
                            <input
                                type="text"
                                name="number"
                                id="number"
                                value={number}
                                readOnly
                                onChange={(e) => editNumber(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                            />
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    defaultValue={title}
                                    className={`${invalidInput ? "border-red-500" : ""
                                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
   <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Review  Note
                            </label>
                                <textarea
                                    name="caseNote"
                                    id="caseNote"
                                    defaultValue={caseNote}
                                    className={`${invalidInput ? "border-red-500" : ""
                                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    onChange={(e) => setCaseNote(e.target.value)}
                                />

                            </div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Or Upload Document
                            </label>
                            <div className="field">
                                <label htmlFor="pinataCID">Pinata CID: </label>
                                <input
                                    type="text"
                                    id="pinataCID"
                                    value={isUploading ? 'Retrieving PinataCID...' : pinataCID}
                                    readOnly
                                />
                            </div>
                            <input type="file" accept="image/*,.pdf, .doc, .docx" onChange={editPinataCID} className="image" />
                            <button type="submit" disabled={isUploading || !pinataCID} className="button">Add Documents</button>
                        </div>


                        <label
                            htmlFor="timestamp"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Timestamp
                        </label>
                        <input
                            type="text"
                            name="timestamp"
                            id="timestamp"
                            value={timestamp}
                            readOnly
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />

                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {invalidInput ? "Ensure all fields are filled and a file is selected." : ""}
                        </p>
                    </div>
                </div>

                    <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            onClick={handleUpdateCaseNote}
                            className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
            {activeIndex === 2 && (
                <div className="px-4 py-5 sm:px-6">
                    {doneLoading ? (
                        <div>
                            <div className="mt-3 sm:mt-0 sm:ml-4 text-right">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Patient Case Note Update Successful
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        The patient case note has been updated successfully.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
            )}
            <button
                className="mt-5 mr-3 absolute top-2 right-3 py-2 px-4 text-md font-medium text-black"
                onClick={closeModal}
            >
                Close
            </button>
        </Modal>
    );
}
