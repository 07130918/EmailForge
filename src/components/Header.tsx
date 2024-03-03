import { HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';

const Header = ({ onReset }: { onReset: () => void }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <HStack
            as='header'
            width='full'
            bgGradient='linear(to-r, blackAlpha.900, #1a202c, #2c5282)'
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
                {!isMobile && (
                    <Text color='white'>Creating awesome emails are not rocket science 🚀</Text>
                )}
                <Image src='/OpenAI.jpeg' alt='OpenAI' width={160} height={160} />
            </HStack>
        </HStack>
    );
};

export default Header;
