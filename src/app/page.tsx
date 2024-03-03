'use client';
import {
    Box,
    Button,
    HStack,
    Heading,
    Text,
    Textarea,
    VStack,
    Select,
    Input,
    FormControl,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
    // メールの種類の状態を追跡
    const [mailType, setMailType] = useState('');

    return (
        <Box p={0} minH='100vh' bg='#161918'>
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
                    placeholder='メールの種類を選択'
                    variant='filled'
                    color='gray.700'
                    onChange={(e) => setMailType(e.target.value)}
                >
                    <option value='sales'>営業メール</option>
                    <option value='support'>カスタマーサポート/サービスメール</option>
                    <option value='newsletter'>ニュースレター</option>
                    <option value='thankYou'>感謝や祝賀のメール</option>
                    <option value='invitation'>招待メール</option>
                    <option value='other'>その他</option>
                </Select>

                {/* 「その他」が選択された場合のテキスト入力 */}
                {mailType === 'other' && (
                    <Input placeholder='メールの種類を入力' variant='filled' color='gray.700' />
                )}

                {/* 受信者の属性入力 */}
                <Input placeholder='業界' variant='filled' color='gray.700' />
                <Input placeholder='年齢' variant='filled' color='gray.700' type='number' />
                <Input placeholder='役職' variant='filled' color='gray.700' />

                <Textarea placeholder='メールの概要を簡潔に教えてください...' />
                <Button colorScheme='gray' size='lg'>
                    生成
                </Button>
            </VStack>
        </Box>
    );
}
