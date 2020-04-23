import React, { useState } from 'react';
import download from 'downloadjs';
import './App.css';
import { Card, Table } from './elements';
import { Input, CircularProgress } from '@material-ui/core';

function App() {
  const [ uploadedFiles, setUploadedFiles] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const downloadDocument = (link) => {
    download(link);
  };

  const uploadDocument = (evt) => {
    const fileToUpload = evt.target.files[0];

    if(fileToUpload) {
      fetch('/file', {
        method: 'POST',
        body: JSON.stringify({
          fileName: fileToUpload.name
      })
      }).then((r) => r.json()).then((data) => {
        let formToSend = new FormData();

        for(var k in data.s3Post.fields) {
          formToSend.append(k, data.s3Post.fields[k]);
        }

        formToSend.append('file', fileToUpload, fileToUpload.name);

        try {
          setLoading(true);
          fetch(data.s3Post.url, {
            method: 'POST',
            body: formToSend
          }).then(() => {
            fetch(`fileUrl`, {
              method: 'POST',
              body: JSON.stringify({
                Key: data.s3Post.fields.key
              })
            }).then((t) => t.json())
              .then((p) => {
              const newState = [...uploadedFiles, {
                name: fileToUpload.name,
                url: p.url  
              }]

              setUploadedFiles(newState);
              setLoading(false);
            })
          })
      }

      catch(error) {
        console.log('Error: ', error);
        setLoading(false);
      }
    })
  }
}

  return (
    <div className="App">
      <div className='App-header'>
        <Card>
            <Input
              type='file'
              id='TestInput'
              disableUnderline
              fullWidth
              onChange={uploadDocument}
            />
            {loading ?
              <CircularProgress />
              :
            <Table
              data={uploadedFiles}
              onClick={downloadDocument}
            />
            }
        </Card>
      </div>
    </div>
  );
}

export default App;
