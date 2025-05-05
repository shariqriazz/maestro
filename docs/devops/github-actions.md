# GitHub Actions

This document describes the GitHub Actions workflows configured for this repository.

## Generate Modes Configuration

This workflow automatically generates the `.roomodes` configuration file whenever changes are pushed to the `master` or `main` branch.

### Workflow Details

- **Trigger**: Push to `master` or `main` branch
- **File**: `.github/workflows/generate-modes.yml`

### Steps

1. Checkout the repository
2. Set up Node.js environment
3. Run the `generate-modes.js` script to generate the `.roomodes` configuration file
4. Verify that the `.roomodes` file was generated
5. Commit and push the generated file back to the repository

### Purpose

This automation ensures that the `.roomodes` configuration file is always up-to-date with the latest mode definitions in the markdown files. It eliminates the need to manually run the `generate-modes.js` script after making changes to mode files.

### Notes

- The commit message includes `[skip ci]` to prevent triggering another workflow run when pushing the generated file
- The workflow uses a GitHub Action bot identity for the commit
- If the script fails to generate the `.roomodes` file, the workflow will fail, alerting you to the issue
- If the `.roomodes` file is already up-to-date (no changes to commit), the workflow will succeed without making a commit
