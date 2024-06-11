import * as ts from "typescript";
import * as vscode from "vscode";
import * as path from "path";

export class SSTDefinitionProvider implements vscode.DefinitionProvider {
  async provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Definition | undefined> {
    const sourceCode = document.getText();
    const sourceFile = ts.createSourceFile(
      document.fileName,
      sourceCode,
      ts.ScriptTarget.Latest,
      true
    );

    const targetNode = this.findNodeAtPosition(sourceFile, position, document);
    if (!targetNode || !ts.isStringLiteral(targetNode)) {
      return;
    }

    const handlerPath = targetNode.text;
    console.log("handlerPath:", handlerPath);
    let basePath = "";
    if (handlerPath.startsWith("./") || handlerPath.startsWith("../")) {
      basePath = path.dirname(document.uri.fsPath);
    } else {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      console.log("workspaceFolders:", workspaceFolders);
      if (workspaceFolders) {
        const workspaceFolder = workspaceFolders[0];
        const workspacePath = workspaceFolder.uri.fsPath;
        basePath = workspacePath;
      } else {
        basePath = path.dirname(document.uri.fsPath);
      }
    }
    const { handlerFilePath, handlerFunctionName } =
      this.processString(handlerPath);
    const fullPath = path.join(basePath, handlerFilePath);
    console.log("fullPath:", fullPath);

    return await this.findHandlerInFile(fullPath, handlerFunctionName);
  }

  processString(input: string) {
    const lastPeriodIndex = input.lastIndexOf(".");
    const handlerFilePath = input.substring(0, lastPeriodIndex) + ".ts";
    const replaced = input.substring(lastPeriodIndex + 1);
    return { handlerFilePath, handlerFunctionName: replaced };
  }

  findNodeAtPosition(
    sourceFile: ts.SourceFile,
    position: vscode.Position,
    document: vscode.TextDocument
  ): ts.Node | undefined {
    const offset = document.offsetAt(position);
    let targetNode: ts.Node | undefined;

    function find(node: ts.Node): void {
      if (offset >= node.getStart() && offset <= node.getEnd()) {
        if (
          ts.isPropertyAssignment(node) &&
          node.name.getText() === "routes" &&
          ts.isObjectLiteralExpression(node.initializer) &&
          node.parent.parent.getText().includes("Api(")
        ) {
          targetNode = findHandlerStringLiteral(node.initializer, offset);
        }
        ts.forEachChild(node, find);
      }
    }

    find(sourceFile);
    return targetNode;
  }

  async findHandlerInFile(
    filePath: string,
    exportName: string
  ): Promise<vscode.Definition | undefined> {
    try {
      const fileUri = vscode.Uri.file(filePath);
      const document = await vscode.workspace.openTextDocument(fileUri);
      const fileContent = document.getText();
      const sourceFile = ts.createSourceFile(
        filePath,
        fileContent,
        ts.ScriptTarget.Latest,
        true
      );

      let handlerPosition: vscode.Position | undefined;

      function find(node: ts.Node): void {
        if (ts.isFunctionDeclaration(node) || ts.isVariableStatement(node)) {
          const exportModifier = node.modifiers?.some(
            (mod) => mod.kind === ts.SyntaxKind.ExportKeyword
          );
          const nodeName = ts.isFunctionDeclaration(node)
            ? node.name?.text
            : ts.isVariableStatement(node)
            ? (
                node.declarationList.declarations[0] as ts.VariableDeclaration
              ).name.getText()
            : "";

          if (exportModifier && nodeName === exportName) {
            const { line, character } =
              sourceFile.getLineAndCharacterOfPosition(node.getStart());
            handlerPosition = new vscode.Position(line, character);
          }
        }
        ts.forEachChild(node, find);
      }

      find(sourceFile);

      if (handlerPosition) {
        return new vscode.Location(fileUri, handlerPosition);
      }
    } catch (error) {
      console.error(`Could not read file ${filePath}:`, error);
      return undefined;
    }
  }
}

function findHandlerStringLiteral(
  node: ts.ObjectLiteralExpression,
  offset: number
): ts.StringLiteral | undefined {
  let handlerStringLiteral: ts.StringLiteral | undefined;

  function find(node: ts.Node): void {
    if (offset >= node.getStart() && offset <= node.getEnd()) {
      if (
        ts.isPropertyAssignment(node) &&
        ts.isStringLiteral(node.initializer)
      ) {
        handlerStringLiteral = node.initializer;
      }
      ts.forEachChild(node, find);
    }
  }

  find(node);
  return handlerStringLiteral;
}

export function activate(context: vscode.ExtensionContext) {
  const provider = new SSTDefinitionProvider();
  const disposable = vscode.languages.registerDefinitionProvider(
    { scheme: "file", language: "typescript" },
    provider
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
