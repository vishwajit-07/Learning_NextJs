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
    <form action={formAction}>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title" id="title"/>
      </div>

      <div className="mt-4">
        <Label htmlFor="code">Code</Label>
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
        <p className="text-red-500 mt-2">{formState.message}</p>
      )}

      <Button type="submit" className="mt-6">
        Create Snippet
      </Button>
    </form>
  );
};

export default CreateSnippetForm;
