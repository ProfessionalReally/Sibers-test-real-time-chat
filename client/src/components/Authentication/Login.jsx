import {Button, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

export default function Login() {
    const [visible, { toggle }] = useDisclosure(false);

    return (
        <form>
            <Stack>
                <TextInput
                    label='Email'
                    placeholder='Enter Your Email Address'
                    withAsterisk
                />
                <PasswordInput
                    label="Password"
                    placeholder='Enter Password'
                    visible={visible}
                    onVisibilityChange={toggle}
                    withAsterisk
                />
                <Button mt={20} type='submit' fullWidth>
                    Login
                </Button>
                <Button color="teal" fullWidth>
                    Get Guest User Credentials
                </Button>
            </Stack>
        </form>
    )
}

