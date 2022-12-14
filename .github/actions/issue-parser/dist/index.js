/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 79:
/***/ ((module) => {

async function reportError (github, core, octokit, message) {
    core.debug(`=========== Context ===========`);
    core.debug(JSON.stringify(github.context));
    core.debug(`=========== Context ===========`);

    //Set the error
    core.setFailed(message);
    await reportToUser(github, octokit, message);
}

async function reportToUser (github, octokit, message) {
    //Send the message
    const payload = github.context.payload;
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const issueNumber = payload.issue.number;
    const params = {
        owner,
        repo,
        issue_number: issueNumber,
        body: message
    };
    await octokit.issues.createComment(params)
}

function normalizeCapabilityName(name) {
    return name.toLowerCase()
        .trim()
        .replace(/ /g, '-');
}

// Retrieve array of users from paginated response
async function getUsersFromTeam(adminOctokit, org, teamName) {
    console.log(`Retrieving members for team ${teamName}...`)
    const params = {
      org,
      team_slug: teamName,
      per_page: 100,
    };
    let teamUsers = [];
    for await (const response of adminOctokit.paginate.iterator(
      adminOctokit.teams.listMembersInOrg, 
      params
    )) {
      teamUsers = teamUsers.concat(response.data.map((item) => item.login.toLowerCase()));
    }
    return teamUsers;
}

module.exports = {
    reportError,
    reportToUser,
    normalizeCapabilityName,
    getUsersFromTeam
};

/***/ }),

/***/ 418:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 96:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 737:
/***/ ((module) => {

module.exports = eval("require")("yaml");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(418);
const github = __nccwpck_require__(96);
const { reportError, normalizeCapabilityName } = __nccwpck_require__(79);
const YAML = __nccwpck_require__(737);

async function run() {
  try {
    const { context } = github;
    let body = context.payload.issue.body;
    let org = context.payload.organization.login;
    let variables = YAML.parse(body);
    const {name, description, action} = variables;
    const adminToken = core.getInput('admin_token');
    const octokit = new github.GitHub(adminToken);

    console.log(`Parameters parsed: name - ${name}, description - ${description}, action - ${action}`)

    if(!action || action.trim().length === 0){
      await reportError(github, core, octokit, "⚠️ Validation error: The action name does not exist. Follow the template");
      return;
    }

    // Validate the name exists
    if(!name || name.trim().length === 0) {
      await reportError(github, core, octokit, "⚠️ Validation error: Missing name in the yaml config");
      return;
    }

    // Validate the capability contains a description
    if(!description || description.trim().length === 0) {
      await reportError(github, core, octokit, "⚠️ Validation error: Missing description in the yaml config");
      return;
    }

    // Validate repository to be created does not exist already
    let capabilityRepoName = normalizeCapabilityName(name);
    let repositoryExists = false;
    try {
      await octokit.repos.get({
        owner: org,
        repo: capabilityRepoName
      });
      core.debug(`The repository ${capabilityRepoName} request didn't fail which means the repo exists`);
      repositoryExists = true;
    }catch (e) {
      if (e.status === 404) {
        repositoryExists = false;
      }else {
        await reportError(github, core, octokit, "There was an error while obtaining the repository data. Try again later");
        return;
      }
    }

    core.debug(`The repository ${capabilityRepoName} exists: ${repositoryExists}`);
    if(repositoryExists){
      await reportError(github, core, octokit, `⚠️ Validation error: The repository ${capabilityRepoName} already exists`);
      return;
    }

    // Set the output to use in the rest of the actions
    core.setOutput('action', action);
    core.setOutput('name', capabilityRepoName);
    core.setOutput('description', description);
  } catch (error) {
    await reportError(github, core, octokit, error.message);
  }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;