import React, { memo, useState } from 'react';
import { Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Node } from 'reactflow';
import { useDropzone } from 'react-dropzone';

interface FileInputProps {
  node_id: string;
  handleNodeDataUpdate: (value: Node) => void;
  handleSubmitFile: (file: FormData) => void;
}
const FileInput = ({ node_id, handleSubmitFile }: FileInputProps) => {
  const [fileList, setFileList] = useState<any>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
    },
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();
      formData.append('video_file', acceptedFiles[0]);

      setFileList(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      handleSubmitFile(formData);
    },
  });

  const thumbs = fileList.map((file: any) =>
    file.type.includes('image') ? (
      <div
        style={{
          display: 'inline-flex',
          borderRadius: 2,
          border: '1px solid #eaeaea',
          marginBottom: 8,
          width: 120,
          height: 100,
          padding: 4,
          boxSizing: 'border-box',
        }}
        key={file.name}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            // overflow: 'hidden',
          }}
        >
          <img
            src={file.preview}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            alt="img"
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      </div>
    ) : (
      <Typography variant="caption">{file.name}</Typography>
    )
  );

  return (
    <div>
      <label htmlFor="upload-file">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Fab
            color="secondary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
            sx={{ fontSize: '10px', margin: '8px 0px' }}
          >
            <AddIcon /> Upload file
          </Fab>
        </div>
        <aside
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16,
          }}
        >
          {thumbs}
        </aside>
      </label>

      {/* <input
          style={{ display: 'none' }}
          id="upload-file"
          name="upload-file"
          type="file"
          accept="video/*,image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;

            setSelectedFile(e.target.files[0]);
          }}
        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
          sx={{ fontSize: '10px', margin: '8px 0px' }}
        >
          <AddIcon /> Upload file
        </Fab>
      </label>
      {fileUrl &&
        selectedFile &&
        ((selectedFile as any).type.includes('image') ? (
          <Box mt={2} textAlign="center">
            <div>Image Preview:</div>
            <img
              src={URL.createObjectURL(selectedFile as File)}
              alt={fileUrl}
              style={{
                width: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                margin: '3px 0px',
              }}
              height="100px"
            />
          </Box>
        ) : (
          <Box mt={2} textAlign="center">
            <div>File Preview:</div>
            <Typography
              variant="caption"
              style={{
                width: '100%',
                wordWrap: 'break-word',
              }}
            >
              {(selectedFile as any).name}
            </Typography>
          </Box>
        ))} */}
    </div>
  );
};

export default memo(FileInput);
