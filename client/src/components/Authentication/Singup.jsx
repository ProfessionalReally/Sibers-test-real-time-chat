import {Button, FileInput, Loader, PasswordInput, Stack, TextInput} from "@mantine/core";
import {IconCheck, IconX} from '@tabler/icons-react';
import {useDisclosure} from "@mantine/hooks";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import signupSchema from "../../schemes/signupSchema.js";
import {notifications} from '@mantine/notifications';
import {useState} from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Singup() {
    const [visible, {toggle}] = useDisclosure(false);
    const [urlPicture, setUrlPicture] = useState();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
    });

    const validatePicture = (pics) => {
        if (!pics) {
            notifications.show({
                color: 'red',
                withCloseButton: true,
                title: 'File required',
                message: 'Please upload an image.',
                icon: <IconX size={18}/>,
                autoClose: 5000,
                position: 'bottom-right',
            });
            return false;
        }

        if (!pics?.type.startsWith('image/')) {
            notifications.show({
                color: 'red',
                withCloseButton: true,
                title: 'Invalid file type',
                message: 'Only image files are allowed.',
                icon: <IconX size={18}/>,
                autoClose: 5000,
                position: 'bottom-right',
            });
            return false;
        }

        if (pics?.size > MAX_FILE_SIZE) {
            notifications.show({
                color: 'red',
                withCloseButton: true,
                title: 'File size too large',
                message: `Max file size is 5MB. Your file is too large.`,
                icon: <IconX size={18}/>,
                autoClose: 5000,
                position: 'bottom-right',
            });
            return false;
        }

        return true;
    };

    const handlePictureUpload = (pics) => {
        setLoading(true);

        if (!validatePicture(pics)) {
            setLoading(false);
            return;
        }

        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', 'chat-real-time');
        data.append('cloud_name', 'dbueefkyc');
        fetch('https://api.cloudinary.com/v1_1/dbueefkyc/image/upload', {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                setUrlPicture(data.url.toString());
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const onSubmit = async (data) => {
        setLoading(true);

        if (!urlPicture) {
            notifications.show({
                color: 'red',
                withCloseButton: true,
                title: 'Invalid file',
                message: 'Please upload a valid image.',
                icon: <IconX size={18}/>,
                autoClose: 5000,
                position: 'bottom-right',
            });
            setLoading(false);
            return;
        }

        const {name, email, password} = data;

        try {
            const formData = {
                name,
                email,
                password,
                picture: urlPicture
            }
            const response = await fetch('/api/user', {
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
                    render={({field: {onChange}}) => (
                        <FileInput
                            label="Upload your picture"
                            placeholder="Upload your picture"
                            accept="image/*"
                            clearable
                            onChange={(pics) => {
                                handlePictureUpload(pics);
                            }}
                            disabled={loading}
                            error={errors.picture?.message}
                        />
                    )}
                />
                <Button mt={20} type='submit' fullWidth disabled={loading}>
                    {loading ? <Loader size={20}/> : 'Sign up'}
                </Button>
            </Stack>
        </form>
    )
}

