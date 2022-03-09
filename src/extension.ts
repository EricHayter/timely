// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    // returns all the extensions that VSCode knows of
    let extensions = vscode.extensions.all;

    let possibleThemes: any[] = [];


    // filter through the extensions for extensions with the category of "themes"
    let extensionsPaths = extensions.filter(e => {
        if (e.packageJSON.categories && e.packageJSON.categories.indexOf("Themes") !== -1) {
            return true;
        }
        // return the directory of each of the extensions
    }).map(e => {
        // creating a function to read the package.json file in the theme folder to find the possible themes
        function readDoc() {
            let docString = vscode.workspace.openTextDocument(e.extensionUri.path + "/package.json").then(d => {
                JSON.parse(d.getText()).contributes.themes;
                return JSON.parse(d.getText());
            }).then(docText => possibleThemes.push(docText));
            return docString;
        }

        readDoc();
    });

    console.log(possibleThemes);
    







    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('timely.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Timely!');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('timely.currentTime', () => {
        var t = new Date();
        t.getHours();

        let time = t.getHours() + ":" + t.getMinutes();

        vscode.window.showInformationMessage(time);
    }));
}

// this method is called when your extension is deactivated
export function deactivate() { }
