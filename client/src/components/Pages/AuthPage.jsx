import {Container, Flex, Paper, Tabs, Title} from "@mantine/core";
import Signup from '../Authentication/Singup.jsx'
export default function AuthPage() {

    return (
        <Container mx='auto' size={480}
        >
            <Flex
                mih={50}
                mt={40}
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
            >
                <Paper bg='#141414'
                       p='xl'
                       bd='1px solid #2e2e2e'
                       shadow="md"
                       radius="lg"
                       w='100%'
                >
                    <Flex align='center' justify='center'>
                        <Title order={1} c='#fff'>
                            Chat Real-Time
                        </Title>
                    </Flex>
                </Paper>
                <Paper
                    bd='1px solid #2e2e2e'
                    shadow="md"
                    radius="lg"
                    bg='#141414'
                    p='xl'
                    w='100%'
                >
                    <Tabs variant="pills" radius="lg" defaultValue="login">
                        <Tabs.List mb='xs' grow justify="flex-start">
                            <Tabs.Tab value="login">
                                Login
                            </Tabs.Tab>
                            <Tabs.Tab value="sign-up">
                                Sign Up
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="login">
                            Login tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="sign-up">
                            <Signup/>
                        </Tabs.Panel>
                    </Tabs>
                </Paper>
            </Flex>

        </Container>
    )
}

