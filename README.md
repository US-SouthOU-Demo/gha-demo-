# GitHub Actions Demo: Repository Maker

Sample workflow for creating repositories from an issue template form.

## How to use
To create a new repository:
1. open a new issue and choose the `Create repository` template
2. **do not modify the first line**
3. update the values of the 2nd and 3rd line to the right of the colon (`name:`, `description:`) with the name and description for your repository
4. click save

The issue will be updated with comments as the workflow processes the request and the issue will be closed once the repository has been created.

[Create a new repository](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/issues/new?assignees=&labels=automation&template=create-repo-and-teams.md&title=Create+repository)

> **Note:**
> There is a *beta* feature called ['Issue Template Forms'](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms) which will allow creating a form that would allow users only to edit appropriate values.  I am currently in the process of updatig the workflow to leverage a form template.

See the [Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) documentation for more information.

## Components

File|Purpose
---|---
[.github/ISSUE_TEMPLATE/repo-request-form.yml](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/blob/main/.github/ISSUE_TEMPLATE/repo-request-form.md)|An issue template form for entering the details of the repository to be created.
[.github/workflows/create-repo.yml](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/blob/main/.github/workflows/create-repo.yml)|A workflow, triggered by the creation of an issue, which parses the issue and creates a repository based on the information provided.
