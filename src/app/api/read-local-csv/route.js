import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'JEOPARDY_CSV.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
            header: true,
            complete: (result) => {
                const data = result.data;
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomRow = data[randomIndex];
                resolve(NextResponse.json({ randomRow }));
            },
            error: (error) => {
                reject(NextResponse.json({ error: error.message }));
            }
        });
    });
}
