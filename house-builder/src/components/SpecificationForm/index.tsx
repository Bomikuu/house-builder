import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Specification } from '../../types/specification';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface SpecificationFormProps {
  onSubmit: (specification: Specification) => void;
  onCancel: () => void;
}

export const SpecificationForm: React.FC<SpecificationFormProps> = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Specification>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result?.toString());
      };
    } else {
      setPreviewImage(undefined);
    }
  };

  const handleFormSubmit = (data: Specification) => {
    onSubmit({
      ...data,
      image: previewImage ?? '',
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField label="Name" variant="outlined" fullWidth margin="normal" {...register('name', { required: true })} error={!!errors.name} helperText={errors.name ? 'Name is required' : ''} />
      <TextField label="Type" variant="outlined" fullWidth margin="normal" {...register('type', { required: true })} error={!!errors.type} helperText={errors.type ? 'Type is required' : ''} />
      <TextField label="Description" variant="outlined" fullWidth margin="normal" {...register('description', { required: true })} error={!!errors.description} helperText={errors.description ? 'Description is required' : ''} />
      <input type="file" onChange={handleImagePreview} accept="image/*" />
      {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <Button type="submit" variant="contained" sx={{ marginTop: '10px' }}>Create Specification</Button>
      <Button variant="outlined" onClick={onCancel} sx={{ marginLeft: '10px', marginTop: '10px' }}>Cancel</Button>
    </form>
  );
};