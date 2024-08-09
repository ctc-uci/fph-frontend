import { useState } from 'react';
import { Box, Button, HStack, Icon, Stack, Text, VStack } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { BiUpload } from 'react-icons/bi';

import { useBackend } from '../../../contexts/BackendContext';
import { uploadCSV } from '../../../utils/uploadCSV';

interface CsvDropzoneProps {
  onClose: () => unknown;
}

export const CsvDropzone = ({ onClose }: CsvDropzoneProps) => {
  const { backend } = useBackend();

  const [contents, setContents] = useState('');
  const [file, setFile] = useState<File>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    onDrop: async ([file]) => {
      setFile(file);

      var reader = new FileReader();
      reader.onload = async function (e) {
        setContents(e.target.result as string);
      };
      reader.readAsText(file);
    },
  });

  const handleUpload = async () => {
    console.log('hit');
    await uploadCSV({ contents, backend });
  };

  return (
    <Stack spacing={4}>
      <VStack
        {...getRootProps({ className: 'dropzone' })}
        p={5}
        bg="#f3fafa"
        border={'1px dashed teal'}
        borderRadius={'md'}
        spacing={2}
        cursor="pointer"
      >
        <input {...getInputProps()} />

        <Text fontWeight={'semibold'} color={'gray.600'}>
          Drag files here, or
        </Text>

        <Button colorScheme="teal" variant={'outline'}>
          <HStack spacing={2}>
            <Icon as={BiUpload} color={'teal'} />
            <Text>Upload File</Text>
          </HStack>
        </Button>
      </VStack>

      {file ? (
        <Box bg={'#f3fafa'} p={4} borderRadius={'md'} textAlign={'center'}>
          {file.name}
        </Box>
      ) : null}

      <HStack spacing={2} justifyContent={'flex-end'}>
        <Button onClick={onClose}>Cancel</Button>
        <Button colorScheme="teal" onClick={handleUpload} isDisabled={!contents}>
          Upload
        </Button>
      </HStack>
    </Stack>
  );
};
