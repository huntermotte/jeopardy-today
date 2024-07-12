"use client";

import {useState} from "react";

export default function ClueCard() {
    const [jeopardyQuestion, setJeopardyQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRandomRow = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/read-local-csv');

            if (!response.ok) {
                throw new Error('Failed to fetch random row');
            }

            const result = await response.json();
            setJeopardyQuestion(result.randomRow);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="clue-container w-full text-center border-2 bg-jeopardy-blue p-6 py-20 font-OPTIKorinnaAgency uppercase tracking-wider cursor-pointer
        lg:p-10 lg:min-h-80 lg:flex lg:justify-center lg:items-center lg:text-4xl"
            onClick={fetchRandomRow}>
            <h1 className="text-white lg:w-3/4">This quarterback was famous for the dab</h1>
        </div>
    )
}
