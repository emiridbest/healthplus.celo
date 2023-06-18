import Modal from "react-modal";
import { useState } from "react";

export default function AdminModal({
  isOpen,
  onDismiss,
  assignRole,
  revokeRole,
}: {
  isOpen: boolean;
  onDismiss: () => void;
  assignRole(address: string, role: any);
  revokeRole(address: string, role: any);
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const [address, setAddress] = useState();
  const [role, setRole] = useState("");

  const [invalidInput, setInvalidInput] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  function editAddress(input: string) {
    setInvalidInput(false);
    setAddress(input);
  }

  function editRole(input: string) {
    setInvalidInput(false);
    setRole(input);
  }

  async function handleAssignRole() {
    if (!address || !role) {
      setInvalidInput(true);
      return;
    }

    setInvalidInput(false);
    setDoneLoading(false);
    setActiveIndex(2);

    try {
      assignRole(address, role);
      setDoneLoading(true);
    } catch (error) {
      console.error("Error assigning roles:", error);
    }
  }

  async function handleRevokeRole() {
    if (!address || !role) {
      setInvalidInput(true);
      return;
    }

    setInvalidInput(false);
    setDoneLoading(false);
    setActiveIndex(2);

    try {
      revokeRole(address, role);
      setDoneLoading(true);
    } catch (error) {
      console.error("Error revoking roles", error);
    }
  }

  function closeModal() {
    setActiveIndex(0);
    setAddress("");
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
      border: "1px solid #CCCCCC",
      height: "fit-content",
      maxHeight: "70vh", // Set a fixed height for the modal content
      overflowY: "auto", // Enable vertical scrolling
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className="">
        <div className="p-20">
          <h2 className="py-5">Assign Role To User</h2>
          <input
            type="string"
            name="string"
            id="string"
            value={address}
            onChange={(e) => editAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm"
          />
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="Admin"
              name="role"
              value="Admin"
              checked={role === "Admin"}
              onChange={(e) => editRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="admin" className="mr-4">
              Admin
            </label>

            <input
              type="radio"
              id="LicencedUser"
              name="role"
              value="LicencedUser"
              checked={role === "LicencedUser"}
              onChange={(e) => editRole(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="LicencedUser">Licensed User</label>
          </div>

          {invalidInput && (
            <small>Please complete all data fields</small>
          )}
        </div>

        <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
            onClick={handleAssignRole}
          >
            Assign Role
          </button>
        </div>

        <div className="object-bottom bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
            onClick={handleRevokeRole}
          >
            Revoke Role
          </button>
        </div>
      </div>

      {activeIndex === 1 ? (
        <div className="flex flex-col items-center">
          <h2 className="py-5">Assigning Role {address}</h2>
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
      ) : null}

      <button
        className="mt-5 mr-3 absolute top-2 right-3 py-2 px-4 text-md font-medium text-black"
        onClick={closeModal}
      >
        Close
      </button>
    </Modal>
  );
}
