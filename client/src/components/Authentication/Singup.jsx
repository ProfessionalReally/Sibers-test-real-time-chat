import {Button, FileInput, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

export default function Singup() {
    const [visible, { toggle }] = useDisclosure(false);

    return (
        <form>
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Enter Your Name'
                    withAsterisk
                />
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
                <PasswordInput
                    label="Confirm password"
                    placeholder='Confirm password'
                    visible={visible}
                    onVisibilityChange={toggle}
                    withAsterisk
                />
                <FileInput
                    clearable
                    accept="image/*"
                    label="Upload your Picture"
                    placeholder="Upload your Picture"
                />
                <Button mt={20} type='submit' fullWidth>
                    Sign up
                </Button>
            </Stack>
        </form>
    )
}

