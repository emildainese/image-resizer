import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const FileInput = ({ fileUploadHandler, fileChangeHandler }) => {
  const { fileName } = useSelector((state) => state.resizer);

  return (
    <Button
      className="w-100"
      variant="primary"
      type="button"
      onClick={fileName ? fileUploadHandler : () => {}}
    >
      {fileName ? (
        <label>
          <i className="fas fa-upload ml-3"></i> Upload {fileName}
        </label>
      ) : (
        <label htmlFor="file-upload" className="w-100">
          <i className="fas fa-camera"></i> Choose an image
        </label>
      )}
      {!fileName && (
        <input
          id="file-upload"
          type="file"
          className="position-absolute"
          style={{ opacity: 0, zIndex: -1 }}
          onChange={fileChangeHandler}
          accept="image/*"
        />
      )}
    </Button>
  );
};

export default FileInput;
