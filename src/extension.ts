import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

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
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("There is no folder present");
        return;
      }

      //get the packgage.json path
      const rootPath = workspaceFolders[0].uri.fsPath;
      const packageJsonPath = path.join(rootPath, "package.json");

      // if no package.json then early return
      if (!fs.existsSync(packageJsonPath)) {
        vscode.window.showErrorMessage(
          "No package.json found in the root folder."
        );
      }

      // check if tailwind exist as a dependency
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      const hasTailwind =
        packageJson.dependencies?.["tailwindcss"] ||
        packageJson.devDependencies?.["tailwindcss"];

      let command = "";
      if (hasTailwind) {
        command = "pnpm dlx shadcn-ui@latest init";
      } else {
        const platform = os.platform();
        if (platform === "win32") {
          command =
            "pnpm install -D tailwindcss postcss autoprefixer ; pnpm dlx tailwindcss init -p ; pnpm dlx shadcn-ui@latest init";
        } else {
          command =
            "pnpm install -D tailwindcss postcss autoprefixer && pnpm dlx tailwindcss init -p && pnpm dlx shadcn-ui@latest init";
        }
      }

      // open new terminal
      const terminal = vscode.window.createTerminal(`Shadcn Ui Assist`);
      terminal.show();
      terminal.sendText(command);

      vscode.window.showInformationMessage("Installing shadcn ui");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
