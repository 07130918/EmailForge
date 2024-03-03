import { Box, Button, Link, Stack } from '@chakra-ui/react';
import Image from 'next/image';

const Footer = ({ onOpen }: { onOpen: () => void }) => {
    return (
        <Box mt={20} py={4} borderColor='#FFF' borderTopWidth='1px' bg='#161918'>
            <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justifyContent='flex-start'
                alignItems='center'
                pl={4}
            >
                <Link
                    href='https://hi-there-this-is-kota.vercel.app'
                    isExternal
                    color='#FFF'
                    fontSize='sm'
                    _hover={{ color: '#00c8ff' }}
                >
                    Developer&apos;s Website
                </Link>
                <Link
                    href='https://github.com/07130918/EmailForge/issues/new'
                    isExternal
                    color='#FFF'
                    fontSize='sm'
                    _hover={{ color: '#00c8ff' }}
                >
                    Report a Bug
                </Link>
                <Button
                    p={0}
                    color='#FFF'
                    variant='ghost'
                    size='sm'
                    _hover={{ color: '#00c8ff' }}
                    onClick={onOpen}
                >
                    免責事項/Disclaimer
                </Button>
                <Image
                    src='/OpenAI.jpeg'
                    alt='OpenAI'
                    width={160}
                    height={160}
                    objectFit='contain'
                />
            </Stack>
        </Box>
    );
};

export default Footer;
