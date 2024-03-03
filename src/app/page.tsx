import { Box, Button, HStack, Heading, Text, Textarea, VStack } from '@chakra-ui/react';

export default function Home() {
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
                <Textarea placeholder='ここに本文を入力してください...' />
                <Button colorScheme='gray' size='lg'>
                    生成
                </Button>
            </VStack>
        </Box>
    );
}
