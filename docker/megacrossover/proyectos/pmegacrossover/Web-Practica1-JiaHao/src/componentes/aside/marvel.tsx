import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const marvelHeroes: string[] = [
  'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow', 
  'Spider-Man', 'Doctor Strange', 'Black Panther', 'Groot', 'Wolverine',
  'Deadpool', 'Ant-Man', 'Vision', 'Scarlet Witch', 'Falcon', 'Winter Soldier'
];

const MarvelSelect: React.FC = () => {

  return (
    <Autocomplete
      disablePortal
      id="marvel-autocomplete"
      options={marvelHeroes} 
      sx={{ width: '100%' }} 
      renderInput={(params: any) => <TextField {...params} label="Selecciona un Héroe" />}
    />
  );
};

export default MarvelSelect;