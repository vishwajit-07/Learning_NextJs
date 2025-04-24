import EditSnippetForm from '@/components/EditForm'
import { prisma } from '@/lib/prisma'
import React from 'react'
const EditPageSnippet = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = parseInt((await params).id);
    const snippet = await prisma.snippet.findUnique({
        where: {
            id,
        },
    })
    if (!snippet) {
        return <h2>Snippet now found!</h2>
    }
    return (
        <div>
            <EditSnippetForm snippet={snippet} />
        </div>
    )
}

export default EditPageSnippet
