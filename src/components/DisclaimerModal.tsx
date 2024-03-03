import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

const DisclaimerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <ModalOverlay />
            <ModalContent bg='#272D33' color='#FFF'>
                <ModalHeader>免責事項</ModalHeader>
                <ModalCloseButton />
                <ModalBody maxH='75vh' overflowY='auto'>
                    <Text>
                        This web application provides a service that automatically generates email
                        content based on the information provided by the user, through the API
                        provided by OpenAI.
                    </Text>
                    <Text>
                        No guarantees are made regarding the accuracy, appropriateness, or
                        usefulness of the generated email content or any other content.
                    </Text>
                    <Text>
                        The service and its developers bear no responsibility for any direct or
                        indirect damage, disadvantage, or issues arising from the use of the
                        generated content.
                    </Text>
                    <Text>
                        Users are advised to use the service at their own discretion and risk.
                    </Text>
                    <Text>
                        Content generated by the AI should be considered as a reference only, and
                        users should verify and adjust the content before its final use.
                    </Text>
                    <Text>
                        All responsibilities related to legal issues, third-party rights
                        infringement, or inappropriate expressions in the generated content fall
                        upon the user.
                    </Text>
                    <Text mb={4}>
                        The developers bear no responsibility for any problems arising from the use
                        of this service.
                    </Text>

                    <Box borderBottomWidth='1px' borderBottomColor='white' my={4} />

                    <Text>
                        本ウェブアプリケーションは、ユーザーが入力した情報を基にOpenAI社が提供するAPIを通してメール本文を自動生成するサービスを提供しています。
                    </Text>
                    <Text>
                        生成されたメール本文やその他のコンテンツについて、その正確性、適切さ、有用性などに関して一切の保証を行うものではありません。
                    </Text>
                    <Text>
                        また、生成された内容を利用したことによる直接的または間接的な損害、不利益、トラブルなどについて、当サービスおよび開発者は一切の責任を負いません。
                    </Text>
                    <Text>ユーザー自身の判断と責任においてサービスをご利用ください。</Text>
                    <Text>
                        AIによって生成されたコンテンツは、あくまで参考程度としてお考えいただき、最終的な使用前には内容の確認と適宜の修正を行ってください。
                    </Text>
                    <Text>
                        法律上の問題、第三者の権利侵害、不適切な表現など、生成された内容に関する一切の責任は利用者に帰属します。
                    </Text>
                    <Text>
                        本サービスの利用により生じたいかなる問題についても、開発者は責任を負いません。
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default DisclaimerModal;
