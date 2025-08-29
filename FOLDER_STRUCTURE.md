# Monorepo Folder Structure

This repository uses a monorepo structure managed by TurboRepo. Below is an overview of the main folders and their purpose:

```
react-turbo-cl-app/
│
├── apps/
│   ├── configurator/         # Standalone app for configuration
│   │   ├── src/              # Source code for configurator
│   │   ├── public/           # Static assets
│   │   └── ...
│   └── web/                  # Main web application
│       ├── src/              # Source code for web app
│       ├── public/           # Static assets
│       └── ...
│
├── packages/
│   ├── ui/                   # Shared UI components
│   │   ├── src/              # UI component source code
│   │   └── ...
│   ├── eslint-config/        # Shared ESLint config
│   ├── typescript-config/    # Shared TypeScript config
│   └── ...
│
├── turbo.json                # TurboRepo configuration
├── package.json              # Root package.json
└── README.md                 # Project documentation
```

## Key Points
- **apps/**: Contains individual applications (e.g., web, configurator).
- **packages/**: Contains shared code and configurations (e.g., UI library, linting, TypeScript configs).
- **turbo.json**: TurboRepo settings for monorepo management.

For more details, see the documentation in each folder or the main README.md.
