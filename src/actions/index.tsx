"use server"
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation';

export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippet.update({
        where: {
            id
        },
        data: {
            code
        }
    });
    redirect(`/snippet/new/${id}`);
}

export const deleteSnippet = async (id: number,) => {
    await prisma.snippet.delete({
        where: {
            id
        }
    });
    redirect('/');
}

export async function createSnippet(
    prevState: { message: string },
    formData: FormData
) {
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== "string" || title.length < 4) {
        return { message: "Title must be required and descriptive" };
    }

    if (typeof code !== "string" || code.length < 8) {
        return { message: "Code must be required and must be longer" };
    }

    const snippet = await prisma.snippet.create({
        data: {
            title,
            code,
        },
    });

    console.log(snippet);
    redirect('/'); // You can redirect to a snippet list page later
}
// export async function createSnippet(prevState: { message: string }, formData: FormData) {
//     const title = formData.get('title');
//     const code = formData.get('code');
//     if (typeof title !== "string" || title.length < 4) {
//         return { message: "Title must be required and descriptive" }
//     }
//     if (typeof code !== "string" || code.length < 8) {
//         return { message: "Code must be required and must be longer" }
//     }
//     const snippet = await prisma.snippet.create({
//         data: {
//             title,
//             code,
//         },
//     });
//     console.log(snippet);
//     redirect('/');
// }



