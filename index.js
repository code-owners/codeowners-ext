const {Codeowner} = require('codeowners-api');

const getFiles = () => {
    const fileHeaders = document.querySelectorAll('div.file-header.js-file-header > div.file-info > a');
    const paths = [];
    fileHeaders.forEach(x => paths.push(x.text));

    return paths;
};

const getUser = () => document.querySelector('meta[name="user-login"]').content;

const start = async () => {
    const pathParts = window.location.pathname.split('/');

    const codeowner = new Codeowner(
        {
            owner: pathParts[1],
            repo: pathParts[2],
        },
        {
            type: 'token',
            token: '<token>',
        },
    );

    const files = getFiles();
    const user = getUser();

    console.log(await codeowner.filterForCodeOwner(files, user));
};

start();
