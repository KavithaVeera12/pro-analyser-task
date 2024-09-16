
import React, { useState, useRef } from 'react';
import { ProgressBar, Card, Row, Col,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import uploadicon from '../component/image/uploadicon.jpg.png';
import deleteicon from '../component/image/deleteicon.png';

function FileuploadComponent() {
  const [fileGroups, setFileGroups] = useState([[], [], [], []]);
  const fileInputRefs = useRef([]);

  
  const handleFileSelect = (event, columnIndex) => {
    const selectedFiles = Array.from(event.target.files || event.dataTransfer.files);

    const updatedFiles = selectedFiles.map(file => ({
      name: file.name,
      size: file.size,
      progress: 0,
      type: file.type,
      id: Math.random().toString(36).substring(2),
    }));

    setFileGroups(prev => {
      const newFileGroups = [...prev];
      newFileGroups[columnIndex] = [...newFileGroups[columnIndex], ...updatedFiles];
      return newFileGroups;
    });


    updatedFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
        } else {
          progress += 10; 
          setFileGroups(prevGroups => {
            const newFileGroups = [...prevGroups];
            newFileGroups[columnIndex] = newFileGroups[columnIndex].map(f =>
              f.id === file.id ? { ...f, progress } : f
            );
            return newFileGroups;
          });
        }
      }, 500);
    });
  };

  
  const getFileIcon = (type) => {
    if (type.includes('pdf')) {
      return '📄';
    } else if (type.includes('image')) {
      return '🖼️';
    } else if (type.includes('video')) {
      return '🎥';
    } else {
      return '📁';
    }
  };

  const handleUploadClick = (index) => {
    fileInputRefs.current[index].click();
  };

  return (
    <div className="container">
      <Row className="mt-5">
        {[...Array(4)].map((_, columnIndex) => (
          <Col lg={3} key={columnIndex}>
            <div
              className="upload-box"
              onClick={() => handleUploadClick(columnIndex)}
              onDrop={(event) => handleFileSelect(event, columnIndex)}
              onDragOver={(e) => e.preventDefault()}  >
              <input
                ref={(el) => (fileInputRefs.current[columnIndex] = el)}
                type="file"
                multiple
                onChange={(event) => handleFileSelect(event, columnIndex)}
                className="input"
                style={{ display: 'none' }}/>
              <img src={uploadicon} alt="Upload Icon" />
              <p>
                <span>Click to upload</span> or drag and drop
              </p>
              <p>(SVG, PNG, JPG, or GIF (max.800x400px))</p><br></br>


              <img src={uploadicon} alt="Upload Icon" />
              <p>
                <span>Click to upload</span> or drag and drop
              </p>
              <p>(SVG, PNG, JPG, or GIF (max.800x400px))</p>
               </div>



               




          
            <Row className="mt-4">
              {fileGroups[columnIndex].slice(0, 4).map((file, i) => (
                <Col key={i} lg={12} className="mb-4">
                  <Card className="card">
                    <Card.Body>
                      <div className="file-details">
                        <div style={{ fontSize: '2.5rem' }} className='file_imge' >{getFileIcon(file.type)}</div>
                            <div className="file-content">
                                <div className="file-details">
                                    <div className="mr-b0 file-name">{file.name}</div>
                                    {file.progress < 100 ? (<img src={deleteicon} alt="Delete Icon" className="delete-img" /> ) :(
                                    <Form.Check  type="checkbox" id={`default-checkbox`} defaultChecked="true"/> )  }
                                </div>
                                <div className="mr-b0 file-name mr-b5">
                                {(file.size / 1024).toFixed(2)} KB{' '}
                                </div>
                                <ProgressBar now={file.progress} label={`${file.progress}%`} />
                            </div>
                        </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            
          </Col>
        ))}
      </Row>
      
    </div>
  );
}

export default FileuploadComponent;
