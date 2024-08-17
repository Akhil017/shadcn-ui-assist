# Shadcn/UI Assist

Shadcn UI Assist is a Visual Studio Code extension that simplifies the process of installing Shadcn UI components and integrating them with Tailwind CSS in your projects. This extension automatically detects your package manager and executes the appropriate commands to install Shadcn UI and its dependencies. Additionally, it allows you to easily add Shadcn UI components to your project through the command palette.

## Features

- Install Shadcn UI: Automatically install Shadcn UI along with Tailwind CSS and its required dependencies.
- Add Shadcn UI Components: Quickly add pre-defined Shadcn UI components to your project with a single command.
- Package Manager Detection: Detects your project's package manager (npm, yarn, pnpm, or bun) and runs the appropriate commands.

## Installation

1. Download & Install: Install the extension from the Visual Studio Code Marketplace.
2. Open a Project: Open your project folder in VS Code.
3. Run Commands: Use the command palette to run the extension commands

## Usage

Once you setup the framework of your choice follow the below steps.

### 1. Install Shadcn UI.

To install Shadcn UI in your project, open the command palette (Ctrl+Shift+P or Cmd+Shift+P on macOS) and type:

```bash
Install Shadcn
```

### 2. Add Shadcn UI Components

You can add components by using the following steps:

1. Open the command palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
2. Search for the command corresponding to the Shadcn UI component you want to add. For example

```bash
add shadcn button
```

3. Select the command, and the component will be added to your project.

## Requirements

- Visual Studio Code version 1.60.0 or higher.
- A project with a package.json file in the root directory.

## Extension Settings

This extension does not require any configuration. It automatically detects the package manager and project setup.

## Known Issues

- If the project does not contain a package.json file, the installation process will fail.
- Ensure that your terminal can execute npm, yarn, pnpm, or bun commands as needed.

## Release Notes

- Initial release of Shadcn UI Assist.
- Added support for installing Shadcn UI and Tailwind CSS.
- Enabled adding Shadcn UI components via the command palette.

## Contributing

If you'd like to contribute to this extension, please submit a pull request or file an issue on [GitHub](https://github.com/Akhil017/shadcn-ui-assist).

## License

This project is licensed under the MIT License.
