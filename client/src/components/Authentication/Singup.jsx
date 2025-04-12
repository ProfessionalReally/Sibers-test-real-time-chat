import {Button, FileInput, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import signupSchema from "../../schemes/signupSchema.js";

export default function Singup() {
    const [visible, { toggle }] = useDisclosure(false);

    const {
        control,
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput
                    label='Name'
                    placeholder='Enter Your Name'
                    withAsterisk
                    {...register('name')}
                    error={errors.name?.message}
                />
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
                <PasswordInput
                    label="Confirm password"
                    placeholder='Confirm password'
                    visible={visible}
                    onVisibilityChange={toggle}
                    withAsterisk
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                />
                <Controller
                    name="picture"
                    control={control}
                    render={({ field }) => (
                        <FileInput
                            label="Upload your picture"
                            placeholder="Upload your picture"
                            accept="image/*"
                            clearable
                            {...field}
                            error={errors.picture?.message}
                        />
                    )}
                />
                <Button mt={20} type='submit' fullWidth>
                    Sign up
                </Button>
            </Stack>
        </form>
    )
}

