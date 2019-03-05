const express = require('express');
const app = express();
const port = 4200;
const fetch = require('node-fetch');
const wildcard = require('wildcard-regex');
//You need to insert token from https://www.pivotaltracker.com/profile
const token = 'tokenhere'


//Get Data from pivotaltracker
fetch('https://www.pivotaltracker.com/services/v5/projects?token=' + token)
    .then(response => response.json())
    .then(data => {
        console.log('-------------');
        console.log('Pivotaltracker projects');
        console.log('-------------');
        for (i = 0; i < data.length; i++) {
            //Showing ID and projectname on same line
            console.log("Id is :" + data[i].id + " Project name : " + data[i].name);
            //Delete data with wildcard test projects
            if (data[i].name.match(wildcard.wildcardRegExp('test*'))) {
                fetch('https://www.pivotaltracker.com/services/v5/projects/' + data[i].id + '?token='+ token, {
                    method: 'DELETE',


                });
            }
        }
    })
    .catch(error => console.error(error));

//Server running Line
app.listen(port, () => console.log(`Example app listening on port ${port}!`))