import * as vscode from 'vscode';
const _path = require('path');
const _fs = require('fs');
const _childProc = require('child_process');

export function activate(context: vscode.ExtensionContext) {

	const cleaner = new Cleaner();

	let startCCleaner = vscode.commands.registerCommand('extension.startcleaner', () => {
		cleaner.setCleaner();
	});

	let startBleachBit = vscode.commands.registerCommand('extension.startbleach', () => {
		cleaner.setBleach();
	});

	context.subscriptions.push(startCCleaner, startBleachBit);
}

class Cleaner {
	_cPath = '';
	_bPath = '';
	_ccleaner = '';
	_bleachbit = '';


	constructor() {
		this.getSettings();
	}

	getSettings() {
		const config = vscode.workspace.getConfiguration('path');
		this._cPath = config.ccleaner;
		this._bPath = config.bleach;
	}

	setCleaner() {
		this._ccleaner = _path.join(this._cPath, 'ccleaner.exe');

		try {
			if (_fs.existsSync(this._ccleaner)) {
				_childProc.execFile(`${this._ccleaner}`, ['/S', '/AUTO']);
				vscode.window.showInformationMessage(`🎯 Comienza la limpieza de Windows`);
			}
		} catch (err) {
			vscode.window.showErrorMessage(`🎯 No posee instalado CCleaner`);
		}
	}

	setBleach() {
		this._bleachbit = _path.join(this._bPath, 'bleachbit_console.exe');

		if (_fs.existsSync(this._bleachbit)) {
			_childProc.execFile(`${this._bleachbit}`, ['-c', '--preset', '--no-uac'], (err: any) => {
				console.log(err);
			});
			vscode.window.showInformationMessage(`🎯 Comienza la limpieza de Windows`);
		} else {
			vscode.window.showErrorMessage(`🎯 No posee instalado BleachBit`);
		}
	}
}

export function deactivate() {}