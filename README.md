# valid-student

Using JetBrains' [swot](https://github.com/JetBrains/swot) to validate a student email address.

## Description

This is a quick project using the REQ_EMAIL environment variable to validate a student email address.

## Usage

```bash
docker run -e REQ_EMAIL="your@student.email" --rm ghcr.io/pepperdot/valid-student:latest
```

## Node.JS usage

```js
const { exec } = require('child_process');

// Replace with your actual student email
const email = "your@student.email";

// Docker command to run
const command = `docker run --pull always -e REQ_EMAIL="${email}" --rm ghcr.io/pepperdot/valid-student:latest`;

// Validity check
let valid = false;

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }
    let response = stdout.split("Response")[1];
    let parsed = JSON.parse(response);
    if(parsed.valid === true) {
        valid = true;
    }
});
```
