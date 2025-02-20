import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';

interface allSettings {
	frequency: number, // frequency of reminders in minutes
	duration: number // duration of notice in seconds
}

const DEFAULT_SETTINGS: allSettings = {
	frequency: 30, 
	duration: 5 
}

export default class TestPlugin extends Plugin {
	settings: allSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Get random task', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new RandomizerModal(this.app).open();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');`	`

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-randomizer',
			name: 'Open Randomizer)',
			callback: () => {
				new RandomizerModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new RandomizerModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ReminderSettingTab(this.app, this));

		this.startReminders();
	}

	onunload() {

	}

	startReminders() {
		let folder = this.app.vault.getFolderByPath("assets");

		if (folder == null) {
			new Notice("assets folder doesn't exist! make one directly inside the vault folder, and put in some images, or else you won't get productivity reminders", 10 * 1000);
		} else {
			let assets_folder : TFile[] = [];
		
			folder.children.forEach((file)=> {
				if (file instanceof TFile && (file.extension == "png" || file.extension == "jpeg")) {
					assets_folder.push(file);
				}
			});

			this.registerInterval(window.setInterval(() => {
				new Notice('are you being productive?', (this.settings.duration * 1000))
				.noticeEl.createEl("img", { attr: { 
					src: this.app.vault.getResourcePath(assets_folder[Math.floor(Math.random()*assets_folder.length)]),
					width: 150, 
					height: 150,
					objectfit: "cover"}
				});
			}, this.settings.frequency * 60 * 1000));
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class RandomizerModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('in progress!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class ReminderSettingTab extends PluginSettingTab {
	plugin: TestPlugin;

	constructor(app: App, plugin: TestPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Reminder Frequency')
			.addSlider((number) => 
				number
					.setValue(this.plugin.settings.frequency)
					.onChange(async (value) => {
						this.plugin.settings.frequency = 1 + 59 * value/100;
						await this.plugin.saveSettings();
					})
		);

		new Setting(containerEl)
			.setName('Reminder Duration')
			.addSlider((number) => 
				number
					.setValue(this.plugin.settings.duration)
					.onChange(async (value) => {
						this.plugin.settings.duration = 1 + 59 * value/100;
						await this.plugin.saveSettings();
					})
		);
	}
}


/*



*/