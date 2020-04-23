# microservice
This application serves two purposes.

1) Create PreSignedPost to upload file to S3.

2) Generate PreSignedUrl to download file input from S3.

By running this application, you will have the ability to upload files to an assigned S3 bucket. To confirm the file was uploaded properly, you can immediately download it by clicking the download link that appears.

## Run the App
There are two separate projects to run.

1) To start the Koa server
    npm install
    npm start

2) To use the UI control that allows you to test   the functionality
    npm install
    npm start

## Tests

Tests can be run in either project folder using npm test.




