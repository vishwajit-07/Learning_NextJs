'use client';

import React, { useState } from 'react'
import type { Snippet } from '@prisma/client'
import { Editor } from '@monaco-editor/react'
import { Button } from './ui/button'
import { saveSnippet } from '@/actions'
const EditForm = ({ snippet }: { snippet: Snippet }) => {
    const [code, setCode] = useState(snippet.code);
    const changeEventHandler = (value: string = "") => {
        setCode(value);
    }
    // you cant use server action inside the client component
    // for update code 
    // async function saveSnippet (){
    //     "use server"
    // }

    const saveSnippetAction = saveSnippet.bind(null, snippet.id, code)

    return (
        <div className='flex flex-col gap-4'>
            <form action={saveSnippetAction} className='flex items-center justify-between'>
                <h1 className='font-bold text-xl'>Your code editor!</h1>
                <Button type='submit'>Save</Button>
            </form>
            <Editor
                height="40vh"
                theme='vs-dark'
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={changeEventHandler}
            />
        </div>
    )
}

export default EditForm
