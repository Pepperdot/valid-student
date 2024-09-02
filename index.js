const fs = require('fs');
const child_process = require('child_process');
const path = require('path');
require('dotenv').config();

function log(json) {
    console.log("Response")
    console.log(JSON.stringify(json, null, 2));
}

async function swotFolder() {
    const folderExists = fs.existsSync('./swot');
    if (!folderExists) {
        // make it not log the output
        await child_process.execSync('git clone https://github.com/JetBrains/swot.git', {stdio: 'ignore'});
    }
    await child_process.execSync('git -C swot pull', {stdio: 'ignore'});
}

async function lookForDomain(domain, endings, fullDomain) {
    const mainFolder = path.join(__dirname, 'swot', 'lib', 'domains', ...endings);
    const txtFile = path.join(mainFolder, `${domain}.txt`);
    const fileExists = fs.existsSync(txtFile);
    if (!fileExists) {
        const newMainFolder = path.join(__dirname, 'swot', 'lib', 'domains', endings[0]);
        let domainWithoutEndings = fullDomain.split('.');
        endings.pop();
        domainWithoutEndings = domainWithoutEndings.filter(e => !endings.includes(e));
        const newTxtFile = path.join(newMainFolder, `${domainWithoutEndings[domainWithoutEndings.length-1]}.txt`);
        const newFileExists = fs.existsSync(newTxtFile);
        if(newFileExists) {
            const data = fs.readFileSync(newTxtFile, 'utf8');
            return {
                name: data
            }
        }
        return {
            error: 'Domain not found'
        }
    }
    const data = fs.readFileSync(txtFile, 'utf8');
    return {
        name: data
    }
}

async function main() {
    if(process.env.REQ_EMAIL === undefined || process.env.REQ_EMAIL === '') {
        log({error: 'Please provide REQ_EMAIL in .env file'});
        return;
    }
    await swotFolder();
    const EmailToCheck = process.env.REQ_EMAIL;
    const fullDomain = EmailToCheck.split('@')[1];
    const domain = fullDomain.split('.')[0];
    const endings = fullDomain.split('.').slice(1).reverse();
    const response = await lookForDomain(domain, endings, fullDomain);
    if(response.error) {
        log({
            valid: false,
        });
        return;
    }
    log({
        valid: true,
        domain: fullDomain,
        name: response.name
    });
}

main();
