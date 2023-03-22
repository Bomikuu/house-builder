import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchSpecifications, createSpecification, updateSpecificationById, deleteSpecificationById } from '../SpecificationsSlice';
import { Specification } from '../../types/specification';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface SpecificationsListProps {
  type?: string;
}

export const SpecificationsList: React.FC<SpecificationsListProps> = ({ type }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpecifications());
  }, [dispatch]);

  const [filteredSpecifications, setFilteredSpecifications] = useState<Specification[]>([]);
  const specifications = useSelector((state: RootState) => {
    if (type) {
      return state.specifications.specifications.filter((specification) => specification.type === type);
    } else {
      return state.specifications.specifications;
    }
  });

  useEffect(() => {
    setFilteredSpecifications(specifications);
  }, [specifications]);

  const handleCreateSpecification = () => {
    dispatch(
      createSpecification({
        id: Math.floor(Math.random() * 10000),
        name: 'New Specification',
        type: '',
        description: '',
        image: '',
      })
    );
  };

  const handleUpdateSpecification = (specification: Specification) => {
    dispatch(updateSpecificationById(specification));
  };

  const handleDeleteSpecification = (id: number) => {
    dispatch(deleteSpecificationById(id));
  };

  return (
    <div>
      <Button variant="contained" onClick={handleCreateSpecification}>Create Specification</Button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredSpecifications.map((specification) => (
          <Card key={specification.id} sx={{ maxWidth: 345, marginBottom: '20px' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {specification.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {specification.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                Type: {specification.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                Image: {specification.image}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" startIcon={<EditIcon />} onClick={() => handleUpdateSpecification(specification)}>Edit</Button>
              <Button size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteSpecification(specification.id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};