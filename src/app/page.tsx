'use client';
import DisclaimerModal from '@/components/DisclaimerModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import type { MailTarget } from '@/types';
import {
    Box,
    Button,
    HStack,
    Input,
    Select,
    Spacer,
    Stack,
    Text,
    Textarea,
    VStack,
    useClipboard,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

const samples: MailTarget[] = [
    {
        type: 'sales',
        industry: 'IT',
        age: '20代後半から40代前半',
        position: 'エンジニア',
        summary: '最新のクラウドソリューションをご紹介',
    },
    {
        type: 'support',
        industry: '製造業',
        age: '30代後半から50代前半',
        position: '製品開発マネージャー',
        summary: '製品不具合のお詫びと対応策のご案内',
    },
    {
        type: 'newsletter',
        industry: '教育',
        age: '30代前半',
        position: '教育コンサルタント',
        summary: '最新の教育技術トレンドレポート',
    },
];

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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { onCopy, hasCopied } = useClipboard(result);
    const toast = useToast();

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
            toast({
                title: 'エラーが発生しました',
                description: 'メールの生成に失敗しました。もう一度お試しください。',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            throw new Error('メールの生成に失敗しました。もう一度お試しください。');
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

    const resetFormState = () => {
        setFormState({
            type: '',
            industry: '',
            age: '',
            position: '',
            summary: '',
        });
    };

    const generateMailFromSample = (sample: MailTarget) => {
        setFormState(sample);
        handleSubmit();
    };

    return (
        <>
            <DisclaimerModal isOpen={isOpen} onClose={onClose} />
            <Box minH='100vh' bg='#161918'>
                <Header onReset={resetFormState} />
                <Box pt={20}>
                    <Stack
                        direction={{ base: 'column', md: 'row' }}
                        p={8}
                        spacing={6}
                        align='start'
                    >
                        <VStack spacing={4} flex='1' w='100%'>
                            <Select
                                name='type'
                                placeholder='メールの種類を選択'
                                bg='#272D33'
                                color='#F7FAFC'
                                borderColor='#4A5568'
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
                                    bg='#272D33'
                                    color='#FFF'
                                    borderColor='#4A5568'
                                    value={formState.type}
                                    onChange={handleChange}
                                />
                            )}
                            <Input
                                name='industry'
                                placeholder='業界(例: IT、金融、製造業)'
                                bg='#272D33'
                                color='#FFF'
                                borderColor='#4A5568'
                                value={formState.industry}
                                onChange={handleChange}
                            />
                            <Input
                                name='age'
                                placeholder='年齢 (例: 20代後半から30代前半)'
                                bg='#272D33'
                                color='#FFF'
                                borderColor='#4A5568'
                                value={formState.age}
                                onChange={handleChange}
                            />
                            <Input
                                name='position'
                                placeholder='受信者の役職/属性（例：マネージャー、エンジニア、学生）'
                                bg='#272D33'
                                color='#FFF'
                                borderColor='#4A5568'
                                value={formState.position}
                                onChange={handleChange}
                            />
                            <Textarea
                                name='summary'
                                placeholder='メールの概要を簡潔に入力してください。'
                                bg='#272D33'
                                color='#FFF'
                                borderColor='#4A5568'
                                resize='none'
                                rows={4}
                                value={formState.summary}
                                onChange={handleChange}
                            />
                            <HStack w='full'>
                                <Spacer />
                                <Button
                                    colorScheme='gray'
                                    size='lg'
                                    isDisabled={
                                        reading ||
                                        (!formState.type &&
                                            !formState.age &&
                                            !formState.industry &&
                                            !formState.position &&
                                            !formState.summary)
                                    }
                                    onClick={handleSubmit}
                                >
                                    生成する
                                </Button>
                            </HStack>
                            <Box
                                borderColor='#4A5568'
                                bg='#272D33'
                                p={4}
                                borderRadius='md'
                                w='100%'
                            >
                                <Text color='#FFF' pb={4}>
                                    サンプルから生成してみる
                                </Text>
                                {samples.map((sample, i) => (
                                    <Button
                                        key={i}
                                        bg='gray.700'
                                        color='white'
                                        _hover={{ bg: 'gray.800' }}
                                        minH={12}
                                        w='100%'
                                        onClick={() => generateMailFromSample(sample)}
                                        my={1}
                                    >
                                        <Text>{sample.summary}</Text>
                                    </Button>
                                ))}
                            </Box>
                        </VStack>
                        <Box flex='1' borderColor='#4A5568' bg='#272D33' p={4} borderRadius='md'>
                            <HStack borderColor='#4A5568'>
                                <Text fontSize='lg' fontWeight='bold' color='#FFF'>
                                    生成結果:
                                </Text>
                                <Spacer />
                                <Button onClick={onCopy}>{hasCopied ? 'Copied!' : 'Copy'}</Button>
                            </HStack>
                            <Text whiteSpace='pre-wrap' color='#FFF'>
                                {result}
                            </Text>
                        </Box>
                    </Stack>
                </Box>
                <Footer onOpen={onOpen} />
            </Box>
        </>
    );
}
