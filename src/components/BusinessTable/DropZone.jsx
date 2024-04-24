import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, VStack } from '@chakra-ui/react';
import UploadCSV from '../../utils/uploadCSV';

const DropZone = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      UploadCSV(acceptedFiles[0]);
    }
  });

  return (
    <div className="container">
      <Box {...getRootProps({ className: 'dropzone' })} p={5} bg="gray.100" textAlign="center" cursor="pointer">
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </Box>
    </div>
  );
}

export default DropZone;
