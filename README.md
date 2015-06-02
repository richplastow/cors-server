initialtest-ookive
==================

#### Experimenting with JSON-P and CORS as part of a persistent archived storage solution 




Repo Setup
----------

This project has a GitHub repo (which is useful for storing and sharing code), and an OpenShift 
repo (which contains the code which actually runs). It uses three branches: 

- `gh-pages` used to display a static project page
- `dev` contains the latest unstable releases
- `master` contains stable production releases


#### The setup process:

1.  In GitHub, create a new repo named 'cors-server', and add 'dev' and 'gh-pages' branches
2.  Clone it to your local machine, `git clone https://github.com/richplastow/cors-server.git`
3.  Create the packages.json, `cd cors-server/; npm init`
4.  Add a field to the "scripts" section of packages.json, `"start": "supervisor index.js"`
5.  Create an initial index.js file, just enough to establish that the host's running (see below)
6.  Test locally, `node index.js`
7.  Add these files to master, and push to GitHub
8.  In the [Openshift Applications tab,](https://openshift.redhat.com/app/console/applications) 
    click 'Add Application'
9.  Choose 'Node.js 0.10'
10. Public URL 'http://cors-<your-namespace>.rhcloud.com/'
11. Source Code 'https://github.com/<your-username>/cors-server'
12. Branch/tag: 'master'
13. Click 'Create Application'
14. Browse to http://cors-ookive.rhcloud.com/ to test the host is running
15. `git remote add live -f ssh://556e32685004464267000014@cors-ookive.rhcloud.com/~/git/cors.git/`
16. `git merge live/master -s recursive -X ours`
17. Make a minor amend to index.js which will be visible when the server is updated and restarts
18. `git push live HEAD`, which should show a couple of dozen lines about build and deployment
19. After `remote: Deployment completed with status: success`, a browser refresh shows the update
20. Backup to GitHub, `git push`


#### The initial index.js file:

```javascript
//// Get OpenShift variables, if available. 
//// See https://developers.openshift.com/en/node-js-project-structure.html
var port = process.env.OPENSHIFT_NODEJS_PORT || 1337;
var ip   = process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1';

//// Start running a simple server. 
var http = require('http');
var tally = 0;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Request tally: ' + (++tally) + '\n');
}).listen(port, ip);
console.log('Server running at http://' + ip + ':' + port + '/');
```
