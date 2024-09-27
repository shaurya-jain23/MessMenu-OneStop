import React, { useState } from 'react';
import { Box, Button, DropZone, Label, Loader, Message } from '@adminjs/design-system';
import { useHistory, useNotice } from 'adminjs';

const UploadCSV = () => {
    console.log("check");
  const [file, setFile] = useState(null); // Store the selected file
  const [isLoading, setIsLoading] = useState(false);
  const sendNotice = useNotice();
  const history = useHistory();

  const handleFileChange = (files) => {
    setFile(files[0]); // Set the first selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      sendNotice({
        message: 'Please select a file to upload.',
        type: 'error',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);

      const response = await fetch('/admin/resources/messMenu/actions/uploadCSV', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        sendNotice({
          message: 'CSV file uploaded successfully.',
          type: 'success',
        });
        history.push('/admin/resources/messMenu'); // Redirect after successful upload
      } else {
        throw new Error('Failed to upload the CSV file');
      }
    } catch (error) {
      sendNotice({
        message: error.message || 'Something went wrong.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p="xxl">
      <Label>Upload CSV File</Label>
      <DropZone onChange={handleFileChange} />
      {isLoading ? (
        <Loader />
      ) : (
        <Button type="submit" variant="primary" mt="lg">
          Upload
        </Button>
      )}
    </Box>
  );
};

export default UploadCSV;
