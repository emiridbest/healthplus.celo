import Modal from "react-modal";
import { useState, useEffect } from "react";
import { validatePhoneNumber } from "../services/twilio";

const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_API_SECRET;
export default function OpenCaseNoteModal({
    isOpen,
    onDismiss,
    initialNumber,
    addPatient
}: {
    isOpen: boolean;
    onDismiss: () => void;
    initialNumber,
    addPatient: (number: string, age: string, sex: string, houseAddress: string, maritalStatus: string, occupation: string, religion: string, ethnicity: string, timestamp: string) => any,
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [houseAddress, setHouseAddress] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [occupation, setOccupation] = useState("");
    const [religion, setReligion] = useState("");
    const [ethnicity, setEthnicity] = useState("");
    const [timestamp, setTimestamp] = useState(new Date().toISOString());
    const [number, setNumber] = useState<string>(initialNumber);
    const [invalidInput, setInvalidInput] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);

    function editNumber(input) {
        setInvalidInput(false);
        setNumber(input);
    }

    function editAge(input) {
        setAge(input);
    }


    function editSex(input) {
        setSex(input);
    }


    async function checkPhoneNumber() {
        if (!validatePhoneNumber(number)) {
            setInvalidInput(true);
            return;
        }
        // TODO: choose from linked addresses
        setInvalidInput(false);
        setActiveIndex(1);
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
            background: "#FCF6F1", //O2568c//7ec4d1
            border: '1px solid #CCCCCC',
            height: "fit-content",
            maxHeight: "70vh", // Set a fixed height for the modal content
            overflowY: "auto", // Enable vertical scrolling
        },
    };
    useEffect(() => {
        setTimestamp(new Date().toISOString());
    }, [isOpen]);
    return (
        <Modal isOpen={isOpen} style={customStyles}>
            {activeIndex === 0 ? (
                <div className="">
                    <div className="p-20">
                        <h2 className="py-5">Recipient phone number</h2>
                        <label
                            htmlFor="number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone number
                        </label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            value={number}
                            onChange={(e) => editNumber(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
                        {invalidInput && (
                            <small>
                                Not a valid phone number! Make sure you include the country code
                            </small>
                        )}
                    </div>

                    <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6 ">
                        <button
                            className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
                            onClick={checkPhoneNumber}
                        >
                            Open New Case Note
                        </button>
                    </div>
                </div>
            ) : activeIndex === 1 ? (
                <div className="">
                    <div className="p-20">
                        <h2 className="py-5">Add Patient Biodata</h2>
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
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Age
                        </label>
                        <input
                            type="text"
                            name="age"
                            id="age"
                            value={age}
                            onChange={(e) => editAge(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />

                        <label
                            htmlFor="sex"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Sex
                        </label>
                        <input
                            type="text"
                            name="sex"
                            id="sex"
                            value={sex}
                            onChange={(e) => editSex(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
                        <label
                            htmlFor="houseAddress"
                            className="block text-sm font-medium text-gray-700"
                        >
                            House Address
                        </label>
                        <input
                            type="text"
                            name="houseAddress"
                            id="houseAddress"
                            value={houseAddress}
                            onChange={(e) => setHouseAddress(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
                        <label
                            htmlFor="maritalStatus"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Marital Status
                        </label>
                        <input
                            type="text"
                            name="maritalStatus"
                            id="maritalStatus"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
                        <label
                            htmlFor="occupation"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Occupation
                        </label>
                        <input
                            type="text"
                            name="occupation"
                            id="occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
                        <label
                            htmlFor="religion"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Religion
                        </label>
                        <input
                            type="text"
                            name="religion"
                            id="religion"
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
                        <label
                            htmlFor="ethnicity"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Ethnicity
                        </label>
                        <input
                            type="text"
                            name="ethnicity"
                            id="ethnicity"
                            value={ethnicity}
                            onChange={(e) => setEthnicity(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
                        />
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

                        {invalidInput && (
                            <small>
                                Please Complete  all Data feed
                            </small>
                        )}
                    </div>

                    <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6 ">
                        <button
                            className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
                            onClick={(event) => {
                                event.preventDefault();
                                addPatient(
                                    number,
                                    age,
                                    sex,
                                    houseAddress,
                                    maritalStatus,
                                    occupation,
                                    religion,
                                    ethnicity,
                                    timestamp
                                );
                            }}
                        >
                            Add New Patient
                        </button>

                    </div>
                </div>
            ) : activeIndex === 1 ? (
                <div className="flex flex-col items-center">
                    <h2 className="py-5">Adding New Patient {number}</h2>
                    {!doneLoading ? (
                        <svg
                            aria-hidden="true"
                            className="mr-2 my-10 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 self-center"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    ) : (
                        <p className="my-10">Done!</p>
                    )}
                </div>
            ) : null
            }

            <button
                className="mt-5 mr-3 absolute top-2 right-3 py-2 px-4 text-md font-medium text-black"
                onClick={closeModal}
            >
                Close
            </button>
        </Modal >
    );
}
