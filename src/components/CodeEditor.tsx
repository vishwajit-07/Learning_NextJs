'use client';

import { Editor } from '@monaco-editor/react';
import React from 'react';

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
};

const CodeEditor = ({ value, onChange }: Props) => {
  return (
    <Editor
      height="40vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={value}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
