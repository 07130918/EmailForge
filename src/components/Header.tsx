import Image from 'next/image';
import { HStack, Text } from '@chakra-ui/react';

const Header = ({ onReset }: { onReset: () => void }) => {
    return (
        <HStack
            as='header'
            width='full'
            bgGradient='linear(135deg, #00c8ff, #1f7bc2, #00155c)'
            p={4}
            justifyContent='space-between'
            alignItems='center'
            position='fixed'
            top={0}
            zIndex='banner'
        >
            <Text
                fontSize='xl'
                color='white'
                fontWeight='bold'
                pl={5}
                cursor='pointer'
                onClick={onReset}
            >
                EmailForge
            </Text>
            <HStack>
                <Text color='white'>Creating awesome emails are not rocket science 🚀</Text>
                <Image
                    src='/OpenAI.jpeg'
                    alt='OpenAI'
                    width={160}
                    height={160}
                    objectFit='contain'
                />
            </HStack>
        </HStack>
    );
};

export default Header;
