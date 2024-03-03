'use client';
import type { MailTarget } from '@/types';
import {
    Box,
    Button,
    HStack,
    Heading,
    Input,
    Select,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useChat } from 'ai/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
// import type { ReadableStreamDefaultReadResult } from '@types/whatwg-streams';

export default function Home() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/email-text',
    });
    // console.log('🚀 ~ Home ~ messages:', messages);
    // console.log('🚀 ~ Home ~ input:', input);
    const [result, setResult] = useState<string>('');
    // メールの種類の状態を追跡
    const [formState, setFormState] = useState<MailTarget>({
        type: '', // メールの種類
        industry: '', // 業界
        age: '', // 年齢
        position: '', // 役職
        summary: '', // メールの概要
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit2 = async () => {
        // フォームデータをAPIに送信
        const response = await fetch('/api/email-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!response.ok || response.body == null) {
            throw new Error('Network response was not ok');
        }

        // レスポンスボディをストリームとして取得
        const reader = response.body.getReader();

        // テキストデコーダーの初期化
        const decoder = new TextDecoder();

        // ストリームの読み取りを開始
        reader.read().then(function processText({ done, value }): Promise<void | undefined> | void {
            if (done) {
                console.log('Stream complete');
                return;
            }

            // チャンクデータをテキストとしてデコード
            const chunk = decoder.decode(value, { stream: true });
            console.log(chunk);

            // UIの更新など、チャンクデータを使用した処理をここに記述
            console.log('🚀 ~ processText ~ chunk:', chunk);
            setResult((prev) => prev + chunk);

            // 次のチャンクを読み取り
            return reader.read().then(processText);
        });
    };

    return (
        <Box
            p={0}
            minH='100vh'
            // bg='#161918'
        >
            <HStack
                as='header'
                width='full'
                bgGradient='linear(135deg, #00c8ff, #1f7bc2, #00155c)'
                p={4}
                justifyContent='flex-start'
                alignItems='center'
            >
                <Text fontSize='xl' color='white' fontWeight='bold' pl={5}>
                    EmailForge
                </Text>
            </HStack>

            <VStack spacing={4} pt={6} px={4}>
                <Heading as='h2' size='xl' textAlign='center' color='#fff'>
                    メール本文生成
                </Heading>

                {/* メールの種類選択 */}
                <Select
                    name='type'
                    placeholder='メールの種類を選択'
                    variant='filled'
                    color='gray.700'
                    value={formState.type}
                    onChange={handleChange}
                >
                    <option value='sales'>営業メール</option>
                    <option value='support'>カスタマーサポート/サービスメール</option>
                    <option value='newsletter'>ニュースレター</option>
                    <option value='thankYou'>感謝や祝賀のメール</option>
                    <option value='invitation'>招待メール</option>
                    <option value='other'>その他</option>
                </Select>

                {formState.type === 'other' && (
                    <Input
                        name='mailType'
                        placeholder='メールの種類を入力'
                        variant='filled'
                        color='gray.700'
                        value={formState.type}
                        onChange={handleChange}
                    />
                )}

                {/* 受信者の属性入力 */}
                <Input
                    name='industry'
                    placeholder='業界'
                    variant='filled'
                    color='gray.700'
                    value={formState.industry}
                    onChange={handleChange}
                />
                <Input
                    name='age'
                    placeholder='年齢'
                    variant='filled'
                    color='gray.700'
                    value={formState.age}
                    onChange={handleChange}
                />
                <Input
                    name='position'
                    placeholder='役職'
                    variant='filled'
                    color='gray.700'
                    value={formState.position}
                    onChange={handleChange}
                />

                <Textarea
                    name='summary'
                    placeholder='メールの概要を簡潔に教えてください...'
                    value={formState.summary}
                    onChange={handleChange}
                />
                {/* <form onSubmit={handleSubmit}>
                    <input value={input} onChange={handleInputChange} />
                </form> */}
                <Button colorScheme='gray' size='lg' onClick={handleSubmit2}>
                    生成
                </Button>
                <Box>result: {result}</Box>
                {messages.map((m) => (
                    <div key={m.id}>{m.content}</div>
                ))}
            </VStack>
        </Box>
    );
}
