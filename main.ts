import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, SettingTab, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';

interface allSettings {
	reminders_enabled: boolean,
	frequency: number, // frequency of reminders in minutes
	duration: number // duration of notice in seconds
}

const DEFAULT_SETTINGS: allSettings = {
	reminders_enabled: true,
	frequency: 30, 
	duration: 5 
}

export default class ProductivityPlugin extends Plugin {
	settings: allSettings;
	reminder_interval_id: number | undefined;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Get random task', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new RandomizerModal(this.app).open();
		});

		this.addCommand({
			id: 'open-randomizer',
			name: 'Open Randomizer)',
			callback: () => {
				new RandomizerModal(this.app).open();
			}
		});

		this.addSettingTab(new ProductivitySettingTab(this.app, this));
		this.toggleReminders();
	}

	onunload() {
		
	}

	toggleReminders() {
		if (!this.settings.reminders_enabled) {
			if (this.reminder_interval_id != undefined) {
				clearInterval(this.reminder_interval_id);
			}

			this.reminder_interval_id = undefined;
			return
		}

		if (this.reminder_interval_id != undefined) return; // timer is already running

		let assets_folder : TFile[] = [];

		this.reminder_interval_id = window.setInterval(() => {
			if (assets_folder.length == 0) {
				// try loading images
				let folder = this.app.vault.getFolderByPath("assets");

				if (folder == null) {
					new Notice('are you being productive?', (this.settings.duration * 1000));
				} else {
					folder.children.forEach((file)=> {
						if (file instanceof TFile) {
							assets_folder.push(file);
						}
					});
				}
			}

			if (assets_folder.length > 0) {
				let this_notice = new Notice('are you being productive?', (this.settings.duration * 1000));

				// @ts-expect-error
				this_notice.containerEl.createEl("img", { attr: { 
					src: this.app.vault.getResourcePath(assets_folder[Math.floor(Math.random()*assets_folder.length)]),
					display: "block",
					objectfit: "cover"}
				});
			}
		}, this.settings.frequency * 60 * 1000);

		this.registerInterval(this.reminder_interval_id);

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

class ProductivitySettingTab extends PluginSettingTab {
	plugin: ProductivityPlugin;
	heading: "Productivity Reminders";

	constructor(app: App, plugin: ProductivityPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// yes I know this entire settings page is objectively cursed
		// I'll make it nice eventually 
		new Setting(containerEl)
			.setName("Reminder Settings")
			.setHeading();

		new Setting(containerEl)
			.setName("Reminder Settings")
			.addToggle((cb) => 
				cb
					.setValue(this.plugin.settings.reminders_enabled)
					.onChange(async (value) => {
						this.plugin.settings.reminders_enabled = value;
						await this.plugin.saveSettings();
						this.plugin.toggleReminders();
					})
		);

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
