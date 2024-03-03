'use client';
import type { MailTarget } from '@/types';
import {
    Box,
    Button,
    HStack,
    Input,
    Select,
    Stack,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

export default function Home() {
    const [result, setResult] = useState<string>('');
    const [reading = false, setReading] = useState<boolean>(false);
    // メールの種類の状態を追跡
    const [formState, setFormState] = useState<MailTarget>({
        type: '',
        industry: '',
        age: '',
        position: '',
        summary: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setResult('');
        setReading(true);
        // NOTE: fetchじゃないとストリームを受け取れない
        const response = await fetch('/api/email-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
        if (!response.ok || response.body == null) {
            throw new Error('Network error');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        // ストリームの読み取り
        reader.read().then(function processText({ done, value }): Promise<void | undefined> | void {
            if (done) {
                setReading(false);
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            setResult((prev) => prev + chunk);
            return reader.read().then(processText);
        });
    };

    // bg='#161918'
    return (
        <Box minH='100vh'>
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

            <Stack direction={{ base: 'column', md: 'row' }} p={8} spacing={6} align='start'>
                <VStack spacing={4} flex='1'>
                    <Select name='type' placeholder='メールの種類を選択' onChange={handleChange}>
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
                            onChange={handleChange}
                        />
                    )}
                    <Input name='industry' placeholder='業界' onChange={handleChange} />
                    <Input name='age' placeholder='年齢' type='number' onChange={handleChange} />
                    <Input name='position' placeholder='役職' onChange={handleChange} />
                    <Textarea
                        name='summary'
                        placeholder='メールの概要を簡潔に教えてください。'
                        onChange={handleChange}
                    />
                    <Button colorScheme='gray' isDisabled={reading} onClick={handleSubmit}>
                        生成
                    </Button>
                </VStack>

                <Box flex='1' bg='gray.50' p={4} borderRadius='md'>
                    <Text fontSize='lg' fontWeight='bold'>
                        生成結果:
                    </Text>
                    <Text whiteSpace='pre-wrap'>{result}</Text>
                </Box>
            </Stack>
        </Box>
    );
}
