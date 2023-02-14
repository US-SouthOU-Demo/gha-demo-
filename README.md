# GitHub Actions Demo: Repository Maker

Sample workflow for creating repositories from an issue template form.

## How to use
To create a new repository, open a new issue using the `Create Repository Form`, fill in the fields and click save.  The issue will be updated with comments as the workflow processes the request and the issue will be closed once the repository has been created.

[Create a new repository](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/issues)

## Components

File|Purpose
---|---
[.github/ISSUE_TEMPLATE/repo-request-form.yml](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/blob/main/.github/ISSUE_TEMPLATE/repo-request-form.md)|An issue template form for entering the details of the repository to be created.
[.github/workflows/create-repo.yml](https://github.com/US-SouthOU-Demo/gha-demo-repo-maker/blob/main/.github/workflows/create-repo.yml)|A workflow, triggered by the creation of an issue, which parses the issue and creates a repository based on the information provided.


