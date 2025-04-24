import { prisma } from '@/lib/prisma';
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as actions from '@/actions'
import { notFound } from 'next/navigation';


const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = parseInt((await params).id);
  await new Promise((r) => { setTimeout(r, 200) });
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  if (!snippet) notFound();

  const deleteSnippetActions = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-between'>
        <h2 className='font-bold'>{snippet.title}</h2>
        <div className='flex items-center gap-2'>
          <Link href={`/snippet/new/${snippet.id}/edit`}><Button>Edit</Button></Link>
          <form action={deleteSnippetActions}>
            <Button variant={'destructive'}>Delete</Button>
          </form>
        </div>
      </div>
      <pre className='p-3 bg-gray-200 rounded border-gray-200 '>
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}

export default DetailsPage
