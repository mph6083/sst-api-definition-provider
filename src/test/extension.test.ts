import * as assert from "assert";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs"; // Import the 'fs' module
import { SSTDefinitionProvider } from "../extension";

suite("SSTDefinitionProvider Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  const baseUri = __dirname+ "../../../src/sampleWorkspace/folder";


  test("Definition Provider Test", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(21, 36); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\target.ts'), true, 'Definition should point to handler.ts');
  });

  test("Definition Provider Test", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(19, 35); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\bobby.ts'), true, 'Definition should point to handler.ts');
  });


  test("Definition Provider Test", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(20, 37); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\bestie.ts'), true, 'Definition should point to handler.ts');
  });


  test("Definition Provider Test", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(14, 25); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\target.ts'), true, 'Definition should point to handler.ts');
  });


  test("Definition Provider Test", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(13, 28); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\target.ts'), true, 'Definition should point to handler.ts');
  });

  test("Definition Provider Test2", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(13, 20); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\target.ts'), true, 'Definition should point to handler.ts');
  });
  test("Definition Provider Test2", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(13, 16); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\target.ts'), true, 'Definition should point to handler.ts');
  });
  test("Definition Provider Test2", async () => {
    const uri = vscode.Uri.file(`${baseUri}/sample.ts`);
    const document = await vscode.workspace.openTextDocument(uri);
    const position = new vscode.Position(13, 30); // Position within "routes" object
    const provider = new SSTDefinitionProvider();
    console.log("line at position: ", document.lineAt(position).text); // "handler: 'src/handler',"
    const definition = await provider.provideDefinition(
      document,
      position,
      {} as vscode.CancellationToken
    );
    assert.ok(definition, "Definition should exist");
    assert.strictEqual((definition as vscode.Location).uri.fsPath.endsWith('sampleWorkspace\\folder\\target.ts'), true, 'Definition should point to handler.ts');
  });
});
