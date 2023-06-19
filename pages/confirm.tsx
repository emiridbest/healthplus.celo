import Web3 from "web3";
import AdminModal from "./roles";
import PatientCaseNoteModal from "./patientCaseNote";
import OpenCaseNoteModal from "./openCaseNote";
import { contractABI, contractAddress } from "../services/utils";
import React, { useState, useEffect, useCallback } from 'react';
import { validatePhoneNumber } from "../services/twilio";
import PatientTable from "./allPatients";
import CaseNotes from "./allCaseNotes";
import { OdisUtils } from '@celo/identity'
import {
  AuthSigner,
  getServiceContext,
  OdisContextName,
} from "@celo/identity/lib/odis/query";
import { FA_CONTRACT, FA_PROXY_ADDRESS } from "../services/constants";
declare global {
  interface Window {
    celo: any;
    web3: any;
  }
}
interface Patient {
  id: string;
  number: string;
  age: number;
  sex: string;
  houseAddress: string;
  maritalStatus: string;
  occupation: string;
  religion: string;
  ethnicity: string;
  timestamp: number;
}
const ISSUER_PRIVATE_KEY = process.env.NEXT_PUBLIC_ISSUER_PRIVATE_KEY;
const DEK_PRIVATE_KEY = process.env.NEXT_PUBLIC_DEK_PRIVATE_KEY;
interface CaseNote extends Patient {
  title: string;
  review: string;
  timestamp: number;
}

export default function Contract(): React.ReactElement {


  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [contract, setContractInstance] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isOpenCaseNoteModalOpen, setIsOpenCaseNoteModalOpen] = useState(false);
  const [isPatientPageModalOpen, setIsPatientPageModalOpen] = useState(false);
  const [number, setNumber] = useState<string>("");
  const [consult, setConsult] = useState(false);
  const [kit, setKit] = useState(null);
  const [invalidInput, setInvalidInput] = useState(false); // Add this if you want to track invalid input
  const [web3, setWeb3] = useState(null);


  useEffect(() => {
    connectToCelo();
  }, []);

  const connectToCelo = async () => {
    if (window.celo) {
      const web3: Web3 = new Web3(window.celo);
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      setWeb3(web3);
      setKit(kit);
      setCurrentAccount(currentAccount);
      setContractInstance(contract);

    } else {
      console.error('Celo wallet not detected');
    }
  };

  async function checkPhoneNumber() {
    if (!validatePhoneNumber(number)) {
      setInvalidInput(true);
      setConsult(false); // If the phone number is not valid, ensure that `consult` is set to `false`
    } else {
      setInvalidInput(false);
      setConsult(true); // Only set `consult` to `true` if the phone number is valid
    }
  }
  /*
  let issuer = process.env.NEXT_PUBLIC_ISSUER_PUBLIC_KEY;
  let authSigner: AuthSigner = {
      authenticationMethod: OdisUtils.Query.AuthenticationMethod.ENCRYPTION_KEY,
      rawKey: DEK_PRIVATE_KEY
  }
  const serviceContext = getServiceContext(OdisContextName.ALFAJORES);
 const federatedAttestationsContract = new web3.eth.Contract(
    FA_CONTRACT.abi,
    FA_PROXY_ADDRESS
);
  async function lookupAddresses(number: string){
    // get identifier from phone number using ODIS
    const identifier = (await OdisUtils.Identifier.getObfuscatedIdentifier(
      number,
      OdisUtils.Identifier.IdentifierPrefix.PHONE_NUMBER,
      issuer,
      authSigner,
      serviceContext
    )).obfuscatedIdentifier    

    // query onchain mappings
    const registered = await federatedAttestationsContract.methods
        .lookupAttestations(identifier, [issuer])
        .call();

    return registered.accounts
}
**/
  function editNumber(input: string) {
    setInvalidInput(false);
    setNumber(input);
  }

  async function handleConsult() {
    checkPhoneNumber();
    if (!validatePhoneNumber(number)) {
      setInvalidInput(true);
      return;
    }
    getAllPatient();
    /*const registered = await lookupAddresses(number);
        if (!registered) {
      return;
    }**/
  }

  async function assignRole(address: string, role: string) {
    try {
      if (!contract) {
        throw new Error("Contract is not initialized");
      }
      const transaction = await contract.methods.assignRole(address, role).send({ from: currentAccount, gasLimit: 2000000 });
      console.log("Role assigned. Transaction hash:", transaction.transactionHash);
    } catch (error) {
      console.error("Failed to assign role:", error);
      throw error; // Re-throw the error to propagate it up the call stack if needed
    }
  }

  async function revokeRole(address: string, role: string) {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
      await contract.methods.revokeRole(address, role).send({ from: currentAccount, gasLimit: 2000000 });
    } catch (error) {
      throw `Failed to revoke role: ${error}`;
    }
  }

  async function updateCaseNote(number: any, title: any, caseNote: any, pinataCID: any, timestamp: any) {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
      const now = new Date();
      timestamp = Math.floor(now.getTime() / 1000);
      await contract.methods.updateCaseNote(number, title, caseNote, pinataCID, timestamp).send({ from: currentAccount, gasLimit: 2000000 });

    } catch (error) {
      throw `Failed to update case note: ${error}`;
    }
  }

  async function addPatient(number: any, age: any, sex: any, houseAddress: any, maritalStatus: any, occupation: any, religion: any, ethnicity: any, unixTime: any) {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
      const now = new Date();
      unixTime = Math.floor(now.getTime() / 1000);
      await contract.methods.addPatient(number, age, sex, houseAddress, maritalStatus, occupation, religion, ethnicity, unixTime).send({ from: currentAccount, gasLimit: 2000000 });

    } catch (error) {
      throw `Failed to add patient: ${error}`;
    }
  }

  async function getPatientCaseNotes(number: string) {
    try {
      if (!contract) {
        console.error("Contract is not initialized");
        return;
      }
      const thisPatient = await contract.methods.getPatientCaseNotes(number).call();
      console.log("Case Note:", thisPatient);

      const formattedCaseNotes: CaseNote[] = thisPatient.map((caseNote: any) => ({
        id: caseNote.id,
        number: caseNote.number,
        title: caseNote.title,
        review: caseNote.review,
        timestamp: parseInt(caseNote.timestamp),
      }));

      return formattedCaseNotes;
    } catch (error) {
      throw `Failed to get patient case notes: ${error}`;
    }
  }

  async function getAllPatient(): Promise<Patient[]> {
    try {
      if (!contract) {
        throw new Error("Contract is not initialized");
      }

      const allPatients = await contract.methods.getAllPatient().call();
      // Map the patient data to the desired fields
      const formattedPatients: Patient[] = allPatients.map((patient: any) => ({
        id: patient.id,
        number: patient.number,
        age: parseInt(patient.age),
        sex: patient.sex,
        houseAddress: patient.houseAddress,
        maritalStatus: patient.maritalStatus,
        occupation: patient.occupation,
        religion: patient.religion,
        ethnicity: patient.ethnicity,
        timestamp: parseInt(patient.timestamp),
      }));

      return formattedPatients;
    } catch (error) {
      console.error(`Failed to get all patient: ${error}`);
      throw error;
    }
  }

  return (
    <main>
      <br />
      {consult && number ? (

        <div>
          <div className="my-0 sm:mt-0">
            <div className="overflow-hidden">
              <div className="bg-fig border-x border-t border-b border-lavender px-4 py-5 text-center sm:px-6">
                <button
                  className="mr-3 inline-flex justify-center py-2 px-4 text-sm font-medium text-white hover:text-sand"
                  onClick={() => setIsPatientPageModalOpen(true)}
                >
                  Review Patient Case Note
                </button>
              </div>
            </div>
          </div>


          <div className="my-0 sm:mt-0">
            <div className="overflow-hidden">
              <div className="bg-fig border-x border-t border-b border-lavender px-4 py-5 text-center sm:px-6">
                <button
                  className="mr-3 inline-flex justify-center py-2 px-4 text-sm font-medium text-white hover:text-sand"
                  onClick={() => setIsOpenCaseNoteModalOpen(true)}
                >
                  Open Case Note For New Patient
                </button>
              </div>
            </div>
          </div>

          <div className="my-0 sm:mt-0">
            <div className="overflow-hidden">
              <div className="bg-fig border-x border-t border-b border-lavender px-4 py-5 text-center sm:px-6">
                <button
                  className="mr-3 inline-flex justify-center py-2 px-4 text-sm font-medium text-white hover:text-sand"
                  onClick={() => setIsAdminModalOpen(true)}
                >
                  Assign Roles
                </button>
              </div>
            </div>
          </div>

          <OpenCaseNoteModal
            isOpen={isOpenCaseNoteModalOpen}
            onDismiss={() => setIsOpenCaseNoteModalOpen(false)}
            addPatient={addPatient} initialNumber={undefined} />
          <PatientCaseNoteModal
            isOpen={isPatientPageModalOpen}
            onDismiss={() => setIsPatientPageModalOpen(false)}
            getPatientCaseNotes={getPatientCaseNotes}
            updateCaseNote={updateCaseNote} initialNumber={""}
          />
          <AdminModal
            isOpen={isAdminModalOpen}
            onDismiss={() => setIsAdminModalOpen(false)}
            assignRole={assignRole}
            revokeRole={revokeRole}
          />
          <div>
            <h1>CaseNotes</h1>
            <CaseNotes getPatientCaseNotes={getPatientCaseNotes} />
          </div>
          <div>
            <h1>Patients</h1>
            <PatientTable getAllPatient={getAllPatient} /> 
          </div>
        </div>)
        : (

          <><div className="">
            <input
              type="text"
              name="number"
              id="number"
              value={number}
              placeholder="Enter Patient Phone Number"
              onChange={(e) => editNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-celo-green focus:ring-celo-green sm:text-sm" />
            <button
              className="inline-flex items-center rounded-full border border-wood bg-prosperity py-2 px-10 text-md font-medium text-black hover:bg-snow"
              onClick={handleConsult}
            >
              Consult
            </button>
          </div></>
        )}

    </main>
  );
}


