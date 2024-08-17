import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { commands } from "./commands";

const shadcnInstallWIthTw: Record<string, string> = {
  npm: "npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p && npx shadcn-ui@latest init",
  pnpm: "pnpm install -D tailwindcss postcss autoprefixer && pnpm dlx tailwindcss init -p && pnpm dlx shadcn-ui@latest init",
  yarn: "yarn add -D tailwindcss postcss autoprefixer && yarn tailwindcss init -p && npx shadcn-ui@latest init",
  bun: "bun install -D tailwindcss && bunx tailwindcss init && bunx --bun shadcn-ui@latest init",
};

const shadcnInstall: Record<string, string> = {
  npm: "npx shadcn-ui@latest init",
  pnpm: "pnpm dlx shadcn-ui@latest init",
  yarn: "npx shadcn-ui@latest init",
  bun: "bunx --bun shadcn-ui@latest init",
};

const addComponentCommand = "npx shadcn-ui@latest add ";

function getRootPath() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("There is no folder present");
    return;
  }

  //get the packgage.json path
  const rootPath = workspaceFolders[0].uri.fsPath;
  return rootPath;
}

//get the packagemanager
function getPackageManager(rootPath: string) {
  const lockFiles = {
    npm: "package-lock.json",
    yarn: "yarn.lock",
    pnpm: "pnpm-lock.yaml",
    bun: "bun.lockb",
  };

  let detectedPackageManager = "";

  for (const [manager, lockFile] of Object.entries(lockFiles)) {
    const filePath = path.join(rootPath, lockFile);
    if (fs.existsSync(filePath)) {
      detectedPackageManager = manager;
      break;
    }
  }

  return detectedPackageManager;
}

function checkIfTailwindInstalled(packageJsonPath: string) {
  // check if tailwind exist as a dependency
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const hasTailwind =
    packageJson.dependencies?.["tailwindcss"] ||
    packageJson.devDependencies?.["tailwindcss"];

  return hasTailwind;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "shadcn-ui-assist" is now active!'
  );

  // call the api and fetch component json

  const disposable = vscode.commands.registerCommand(
    "shadcn-ui-assist.installShadcn",
    () => {
      //get the packgage.json path
      const rootPath = getRootPath();

      const packageJsonPath = path.join(rootPath!, "package.json");

      // if no package.json then early return
      if (!fs.existsSync(packageJsonPath)) {
        vscode.window.showErrorMessage(
          "No package.json found in the root folder."
        );
        return;
      }

      const packageManager = getPackageManager(rootPath!);
      const isTailwindInstalled = checkIfTailwindInstalled(packageJsonPath);
      let command = "";
      if (isTailwindInstalled) {
        command = shadcnInstall[packageManager];
      } else {
        command = shadcnInstallWIthTw[packageManager];
        const platform = os.platform();
        if (platform === "win32") {
          command.replace("&&", ";");
        }
      }

      // open new terminal
      const terminal = vscode.window.createTerminal(`Shadcn Ui Assist`);
      terminal.show();
      terminal.sendText(command);

      vscode.window.showInformationMessage("Installing shadcn ui");
    }
  );

  const componentDisposable = commands.map((item) =>
    vscode.commands.registerCommand(item.command, () => {
      const rootPath = getRootPath();
      const packageManger = getPackageManager(rootPath!);
      let command = `${addComponentCommand}${item.component}`;

      if (packageManger === "pnpm") {
        command = command.replace("npx", "pnpm dlx");
      } else if (packageManger === "bun") {
        command = command.replace("npx", "bunx --bun");
      }
      console.log({ command });
      // open new terminal
      const terminal = vscode.window.createTerminal(`Shadcn Ui Assist`);
      terminal.show();
      terminal.sendText(command);
    })
  );

  console.log({ componentDisposable });

  context.subscriptions.push(disposable);
  context.subscriptions.push(...componentDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
