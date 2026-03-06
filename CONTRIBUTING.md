# Contributing to webext-split-view

Thank you for your interest in contributing. This document outlines the process for reporting issues and submitting improvements.

## REPORTING ISSUES

When reporting bugs or requesting features, please use the GitHub issue templates. Include the following information:

- A clear, descriptive title
- Steps to reproduce the issue (for bugs)
- Expected behavior vs actual behavior
- Your environment (Node version, Chrome version, OS)
- Any relevant code samples

Before opening a new issue, please search existing issues to avoid duplicates.

## DEVELOPMENT WORKFLOW

1. Fork the repository and create a feature branch from `main`
2. Make your changes following the code style guidelines
3. Ensure tests pass and the build succeeds
4. Submit a pull request with a clear description of the changes
5. Address any review feedback promptly

## CODE STYLE

This project follows standard TypeScript conventions:

- Use functional components and modern TypeScript features
- Prefer const over let where appropriate
- Add TypeScript types for all function parameters and return values
- Keep functions focused and small
- Use meaningful variable and function names

Run the build to verify your code compiles correctly:

```bash
npm run build
```

## TESTING

Before submitting changes, verify that the TypeScript compilation succeeds:

```bash
npm run build
```

Ensure no TypeScript errors are present and the output is generated correctly in the `dist` directory.

## LICENSE

By contributing to webext-split-view, you agree that your contributions will be licensed under the MIT License.
