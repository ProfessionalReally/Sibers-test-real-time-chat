import {Button, Loader, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconCheck, IconX} from '@tabler/icons-react';
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {notifications} from '@mantine/notifications';
import {useState} from "react";
import loginSchema from "../../schemes/loginSchema.js";


export default function Login() {
    const [visible, { toggle }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        setValue,
        register,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const fillGuestData = () => {
        setValue("email", "guest@example.com");
        setValue("password", "123456");
    }

    const onSubmit = async (data) => {
        setLoading(true);

        const {email, password} = data;

        try {
            const formData = {
                email,
                password,
            }
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Unknown error occurred');
            }

            localStorage.setItem("userInfo", JSON.stringify(result));

            notifications.show({
                color: 'teal',
                withCloseButton: true,
                title: 'Registration Successful',
                message: 'You have signed up successfully',
                icon: <IconCheck size={18}/>,
                autoClose: 5000,
                position: 'bottom-right',
            });
        } catch (e) {
            console.log(e);
            notifications.show({
                color: 'red',
                withCloseButton: true,
                title: 'Registration Failed',
                message: e.message || 'Something went wrong',
                icon: <IconX size={18}/>,
                autoClose: 5000,
                position: 'bottom-right',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    label='Email'
                    placeholder='Enter Your Email Address'
                    withAsterisk
                    {...register('email')}
                    error={errors.email?.message}
                />
                <PasswordInput
                    label="Password"
                    placeholder='Enter Password'
                    visible={visible}
                    onVisibilityChange={toggle}
                    withAsterisk
                    {...register('password')}
                    error={errors.password?.message}
                />
                <Button mt={20} type='submit' fullWidth disabled={loading}>
                    {loading ? <Loader size={20}/> : 'Login'}
                </Button>
                <Button color="teal" fullWidth disabled={loading}
                    onClick={fillGuestData}
                >
                    {loading ? <Loader size={20}/> : 'Get Guest User Credentials'}
                </Button>
            </Stack>
        </form>
    )
}

