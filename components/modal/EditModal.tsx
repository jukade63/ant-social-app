import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            image: '',
            coverImage: '',
            bio: ''
        },
    });

    const image = watch('image');
    const coverImage = watch('coverImage');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            setIsLoading(true);

            await axios.patch('/api/edit', data);
            mutateFetchedUser();

            toast.success('Updated');

            editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload onChange={(value) => setCustomValue('image', value)} value={image} label="upload profile image" />
            <ImageUpload onChange={(value) => setCustomValue('coverImage', value)} value={coverImage} label="upload cover image" />
            <Input
                id='name'
                placeholder="Name"
                register={register}
                disabled={isLoading}
                errors={errors}
            />
            <Input
                id="bio"
                placeholder="Bio"
                disabled={isLoading}
                errors={errors}
                register={register}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
}

export default EditModal;