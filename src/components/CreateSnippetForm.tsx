'use client';

import { useActionState, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import * as actions from '@/actions';

const CodeEditor = dynamic(() => import('@/components/CodeEditor'), { ssr: false });

const CreateSnippetForm = () => {
  const [code, setCode] = useState(''); // <-- Control the code
  const hiddenTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [formState, formAction] = useActionState(actions.createSnippet, {
    message: '',
  });

  return (
    <form action={formAction} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <Label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Code</Label>
        <Textarea
          ref={hiddenTextAreaRef}
          name="code"
          id="code"
          className="hidden"
          value={code}
          readOnly
        />
        <CodeEditor
          value={code}
          onChange={(val) => {
            if (val !== undefined) {
              setCode(val);
            }
          }}
        />
      </div>

      {formState.message && (
        <p className="p-3 font-semibold text-red-700 bg-red-100 border border-red-400 rounded-md">
          {formState.message}
        </p>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          className="text-white p-2 rounded-md bg-gray-800 hover:bg-gray-600 transition-colors"
        >
          Create Snippet
        </Button>
      </div>
    </form>

  );
};

export default CreateSnippetForm;
