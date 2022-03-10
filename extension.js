// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "timely" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('timely.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from timely!');
	}));

	let extensions = vscode.extensions.all;

    let possibleThemes = [];

	    // filter through the extensions for extensions with the category of "themes"
		extensions.filter(e => {
			// filters for extenions iwt hthe 
			if (e.packageJSON.categories && e.packageJSON.categories.indexOf("Themes") !== -1) {
				return true;
			}
			// return the directory of each of the extensions
		}).map(e => {
			// open package.json and returns the object
			vscode.workspace.openTextDocument(e.extensionUri.path + "/package.json").then(d => {
				return JSON.parse(d.getText()).contributes.themes;
			}).then(docText => {
				docText.uiTheme = new String(docText.uiTheme);
				return possibleThemes.push(...docText);
			});
	
		});
	
		console.log(possibleThemes);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
