# valid-student

Using JetBrains' [swot](https://github.com/JetBrains/swot) to validate a student email address.

## Description

This is a quick project using the REQ_EMAIL environment variable to validate a student email address.

## Usage

```bash
docker run -e REQ_EMAIL="your@student.email" --rm ghcr.io/pepperdot/valid-student:latest
```