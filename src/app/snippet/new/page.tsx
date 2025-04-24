import CreateSnippetForm from '@/components/CreateSnippetForm';

export default function NewSnippetPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-semibold mb-4">New Snippet</h1>
            <CreateSnippetForm />
        </main>
    );
}
