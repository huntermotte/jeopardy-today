"use client";

import {useEffect, useState} from "react";
import {Skeleton} from "@nextui-org/skeleton";

export default function ClueCard() {
    const [jeopardyQuestion, setJeopardyQuestion] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRandomRow();
    }, []);

    const fetchRandomRow = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/read-local-csv');

            if (!response.ok) {
                throw new Error('Failed to fetch random row');
            }

            const result = await response.json();
            if (result.randomRow) {
                console.log(result.randomRow);
                setJeopardyQuestion(result.randomRow);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const revealAnswer = () => {
        setShowAnswer(true);
    }

    return (
        <div className="clue-container w-full text-center border-2 bg-jeopardy-blue p-6 py-20 font-OPTIKorinnaAgency uppercase tracking-wider cursor-pointer
        lg:p-10 lg:min-h-80 lg:flex lg:justify-center lg:items-center lg:text-4xl lg:w-screen"
            onClick={revealAnswer}>
            {jeopardyQuestion ? (
                <div className="lg:w-3/4">
                    {!showAnswer && <h3 className="mb-8 lg:text-2xl">{jeopardyQuestion.Category}</h3>}
                    <h1 className="text-white">{!showAnswer ? jeopardyQuestion.Question : jeopardyQuestion.Answer}</h1>
                </div>
            ) : (
                <h1 className="text-white lg:w-3/4">Loading a good question...</h1>
            )}
        </div>
    )
}
