import React, { useEffect, useState } from "react";

interface Patient {
  timestamp: number;
  id: string;
  number: string;
  age: string;
  sex: string;
  houseAddress: string;
  maritalStatus: string;
  occupation: string;
  religion: string;
  ethnicity: string;
}

function PatientTable({ getAllPatient }: { getAllPatient: () => Promise<any[]> }) {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Fetch the patient data when the component mounts
    getAllPatient()
      .then((data) => setPatients(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Timestamp
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Number
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Age
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sex
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            House Address
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Marital Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Occupation
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Religion
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ethnicity
          </th>
     
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(patient.timestamp * 1000).toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.number}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.sex}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.houseAddress}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.maritalStatus}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.occupation}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.religion}</td>
            <td className="px-6 py-4 whitespace-nowrap">{patient.ethnicity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientTable;
