import type { MailTarget } from '@/types';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';

// NOTE: openai-edge使うなら必要
export const runtime = 'edge';
// NOTE: next build時にバックエンドのコードを実行させないための宣言
export const dynamic = 'force-dynamic';

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    }),
);

export async function POST(req: NextRequest) {
    try {
        const reqBody: MailTarget = await req.json();
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            temperature: 0.9,
            messages: [
                {
                    role: 'system',
                    content:
                        'これからとても優秀なメールマーケティングのプロとして振る舞ってください。',
                },
                {
                    role: 'user',
                    content: `以下に受信者の属性やメールの目的を箇条書します。
                    あなたには以下の情報をもとに魅力的なメールの本文を生成していただきたいです。
                    私はあなたがとても優秀なであり、この指示を理解し、適切に対応してくれる能力があることを知っています!!
                    \n\n
                    - メールの種類: ${reqBody.type}
                    - 業界: ${reqBody.industry}
                    - 年齢: ${reqBody.age}
                    - メール受信者の主な役職や属性: ${reqBody.position}
                    - メールの大まかな概要: ${reqBody.summary}

                    \n生成されたメール本文:`,
                },
            ],
        });
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);
    } catch (e: any) {
        console.error('🔥🔥🔥 An error occurred while generating email text 🔥🔥🔥');
        console.error(e);
        return NextResponse.json('Internal server error', { status: 500 });
    }
}
