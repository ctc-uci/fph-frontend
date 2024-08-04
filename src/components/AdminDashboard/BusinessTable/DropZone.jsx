import { useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

import UploadCSV from '../../../utils/uploadCSV';

import 'boxicons';

import { PropTypes } from 'prop-types';

const DropZone = ({ onClose }) => {
  const [contents, setContents] = useState('');
  const [file, setFile] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: async ([file]) => {
      setFile(file);
      var reader = new FileReader();
      reader.onload = async function (e) {
        setContents(e.target.result);
      };
      reader.readAsText(file);
    },
  });

  const handleUpload = async () => {
    await UploadCSV(contents);
  };

  return (
    <Flex className="container" gap={4} flexDirection={'column'}>
      <Flex
        {...getRootProps({ className: 'dropzone' })}
        p={5}
        bg="#f3fafa"
        border={'1px dashed teal'}
        borderRadius={4}
        gap={4}
        textAlign="center"
        cursor="pointer"
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Input {...getInputProps()} />
        <Text fontFamily={'Inter'} as={'b'} color={'gray.600'}>
          Drag files here, or
        </Text>
        <Button colorScheme="teal" variant={'outline'} w={40}>
          <box-icon name={'upload'} color={'teal'}></box-icon>
          <Text marginLeft={2}>Upload File</Text>
        </Button>
      </Flex>
      {file && (
        <Box bg={'#f3fafa'} p={4} borderRadius={4} textAlign={'center'}>
          {file.name}
        </Box>
      )}
      <Flex gap={4} width={'100%'} justifyContent={'flex-end'}>
        <Button colorScheme="teal" onClick={handleUpload}>
          Upload
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Flex>
    </Flex>
  );
};

DropZone.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DropZone;
