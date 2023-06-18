import React, { useEffect, useState } from "react";

interface CaseNote {
  timestamp: number;
  id: string;
  number: string;
  title: string;
  review: string;
}

function CaseNotes({ getPatientCaseNotes }: { getPatientCaseNotes: (number: string) => Promise<CaseNote[]> }) {
  const [caseNotes, setCaseNotes] = useState<CaseNote[]>([]);
  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    const fetchCaseNotes = async () => {
      try {
        const fetchedCaseNotes = await getPatientCaseNotes(number);
        setCaseNotes(fetchedCaseNotes);
      } catch (error) {
        console.error("Failed to fetch patient case notes:", error);
      }
    };

    fetchCaseNotes();
  }, [getPatientCaseNotes, number]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Time Of Review
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Number
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Case Note
          </th>

        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {caseNotes.map((caseNote) => (
          <tr key={caseNote.id}>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(caseNote.timestamp * 1000).toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap">{caseNote.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{caseNote.number}</td>
            <td className="px-6 py-4 whitespace-nowrap">{caseNote.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{caseNote.review}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CaseNotes;
