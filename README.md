# GitHub Actions Demo: Repository Maker

Sample workflow for creating repositories from an issue template form.

## How to use
To create a new repository:
1. open a new issue and choose the `Create repository` template
2. **do not modify the content of line 1, nor `name:` on line 2, and `description:` on line 3**
3. on the 2nd line, update the value to the right of the colon with the name for the repository to be created, this must not be the name of an existing repository in the organization
3. on the 3rd line, update the value to the right of the colon with a description for the repository
4. click save

Once, the issue is created, it will trigger a workflow.  The issue will be updated with comments as the workflow processes the request and finally the issue will be closed once the repository has been created.

[Create a new repository](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/issues/new?assignees=&labels=automation&template=create-repo-and-teams.md&title=Create+repository)

> **Note:**
> There is a *beta* feature called [Issue Template Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms) which creates a form that would allow users only to edit appropriate values without accidentally overwriting value that are required to not be modified.  I am currently updating the process to leverage an issue form template but this is still a work-in-progress.

See the GitHub documentation for more information on [Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates).

## Components

File|Purpose
---|---
[.github/ISSUE_TEMPLATE/repo-request-form.yml](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/blob/main/.github/ISSUE_TEMPLATE/repo-request-form.md)|An issue template form for entering the details of the repository to be created.
[.github/workflows/create-repo.yml](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/blob/main/.github/workflows/create-repo.yml)|A workflow, triggered by the creation of an issue, which parses the issue and creates a repository based on the information provided.
