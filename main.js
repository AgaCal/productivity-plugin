/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ProductivityPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  reminders_enabled: true,
  frequency: 30,
  duration: 5
};
var ProductivityPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("dice", "Get random task", (evt) => {
      new RandomizerModal(this.app).open();
    });
    this.addCommand({
      id: "open-randomizer",
      name: "Open Randomizer)",
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
      if (this.reminder_interval_id != void 0) {
        clearInterval(this.reminder_interval_id);
      }
      this.reminder_interval_id = void 0;
      return;
    }
    if (this.reminder_interval_id != void 0) return;
    let assets_folder = [];
    this.reminder_interval_id = window.setInterval(() => {
      if (assets_folder.length == 0) {
        let folder = this.app.vault.getFolderByPath("assets");
        if (folder == null) {
          new import_obsidian.Notice("are you being productive?", this.settings.duration * 1e3);
        } else {
          folder.children.forEach((file) => {
            if (file instanceof import_obsidian.TFile) {
              assets_folder.push(file);
            }
          });
        }
      }
      if (assets_folder.length > 0) {
        let this_notice = new import_obsidian.Notice("are you being productive?", this.settings.duration * 1e3);
        this_notice.containerEl.createEl("img", {
          attr: {
            src: this.app.vault.getResourcePath(assets_folder[Math.floor(Math.random() * assets_folder.length)]),
            display: "block",
            objectfit: "cover"
          }
        });
      }
    }, this.settings.frequency * 60 * 1e3);
    this.registerInterval(this.reminder_interval_id);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var RandomizerModal = class extends import_obsidian.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText("in progress!");
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var ProductivitySettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("Reminder Settings").setHeading();
    new import_obsidian.Setting(containerEl).setName("Reminder Settings").addToggle(
      (cb) => cb.setValue(this.plugin.settings.reminders_enabled).onChange(async (value) => {
        this.plugin.settings.reminders_enabled = value;
        await this.plugin.saveSettings();
        this.plugin.toggleReminders();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Reminder Frequency").addSlider(
      (number) => number.setValue(this.plugin.settings.frequency).onChange(async (value) => {
        this.plugin.settings.frequency = 1 + 59 * value / 100;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Reminder Duration").addSlider(
      (number) => number.setValue(this.plugin.settings.duration).onChange(async (value) => {
        this.plugin.settings.duration = 1 + 59 * value / 100;
        await this.plugin.saveSettings();
      })
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQXBwLCBFZGl0b3IsIE1hcmtkb3duVmlldywgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nLCBTZXR0aW5nVGFiLCBUQWJzdHJhY3RGaWxlLCBURmlsZSwgVEZvbGRlciwgVmF1bHQgfSBmcm9tICdvYnNpZGlhbic7XG5cbmludGVyZmFjZSBhbGxTZXR0aW5ncyB7XG5cdHJlbWluZGVyc19lbmFibGVkOiBib29sZWFuLFxuXHRmcmVxdWVuY3k6IG51bWJlciwgLy8gZnJlcXVlbmN5IG9mIHJlbWluZGVycyBpbiBtaW51dGVzXG5cdGR1cmF0aW9uOiBudW1iZXIgLy8gZHVyYXRpb24gb2Ygbm90aWNlIGluIHNlY29uZHNcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogYWxsU2V0dGluZ3MgPSB7XG5cdHJlbWluZGVyc19lbmFibGVkOiB0cnVlLFxuXHRmcmVxdWVuY3k6IDMwLCBcblx0ZHVyYXRpb246IDUgXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3Rpdml0eVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBhbGxTZXR0aW5ncztcblx0cmVtaW5kZXJfaW50ZXJ2YWxfaWQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuXHRcdC8vIFRoaXMgY3JlYXRlcyBhbiBpY29uIGluIHRoZSBsZWZ0IHJpYmJvbi5cblx0XHRjb25zdCByaWJib25JY29uRWwgPSB0aGlzLmFkZFJpYmJvbkljb24oJ2RpY2UnLCAnR2V0IHJhbmRvbSB0YXNrJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0Ly8gQ2FsbGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBpY29uLlxuXHRcdFx0bmV3IFJhbmRvbWl6ZXJNb2RhbCh0aGlzLmFwcCkub3BlbigpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnb3Blbi1yYW5kb21pemVyJyxcblx0XHRcdG5hbWU6ICdPcGVuIFJhbmRvbWl6ZXIpJyxcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7XG5cdFx0XHRcdG5ldyBSYW5kb21pemVyTW9kYWwodGhpcy5hcHApLm9wZW4oKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgUHJvZHVjdGl2aXR5U2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXHRcdHRoaXMudG9nZ2xlUmVtaW5kZXJzKCk7XG5cdH1cblxuXHRvbnVubG9hZCgpIHtcblx0XHRcblx0fVxuXG5cdHRvZ2dsZVJlbWluZGVycygpIHtcblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MucmVtaW5kZXJzX2VuYWJsZWQpIHtcblx0XHRcdGlmICh0aGlzLnJlbWluZGVyX2ludGVydmFsX2lkICE9IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMucmVtaW5kZXJfaW50ZXJ2YWxfaWQpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlbWluZGVyX2ludGVydmFsX2lkID0gdW5kZWZpbmVkO1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucmVtaW5kZXJfaW50ZXJ2YWxfaWQgIT0gdW5kZWZpbmVkKSByZXR1cm47IC8vIHRpbWVyIGlzIGFscmVhZHkgcnVubmluZ1xuXG5cdFx0bGV0IGFzc2V0c19mb2xkZXIgOiBURmlsZVtdID0gW107XG5cblx0XHR0aGlzLnJlbWluZGVyX2ludGVydmFsX2lkID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmIChhc3NldHNfZm9sZGVyLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdC8vIHRyeSBsb2FkaW5nIGltYWdlc1xuXHRcdFx0XHRsZXQgZm9sZGVyID0gdGhpcy5hcHAudmF1bHQuZ2V0Rm9sZGVyQnlQYXRoKFwiYXNzZXRzXCIpO1xuXG5cdFx0XHRcdGlmIChmb2xkZXIgPT0gbnVsbCkge1xuXHRcdFx0XHRcdG5ldyBOb3RpY2UoJ2FyZSB5b3UgYmVpbmcgcHJvZHVjdGl2ZT8nLCAodGhpcy5zZXR0aW5ncy5kdXJhdGlvbiAqIDEwMDApKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb2xkZXIuY2hpbGRyZW4uZm9yRWFjaCgoZmlsZSk9PiB7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG5cdFx0XHRcdFx0XHRcdGFzc2V0c19mb2xkZXIucHVzaChmaWxlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYXNzZXRzX2ZvbGRlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGxldCB0aGlzX25vdGljZSA9IG5ldyBOb3RpY2UoJ2FyZSB5b3UgYmVpbmcgcHJvZHVjdGl2ZT8nLCAodGhpcy5zZXR0aW5ncy5kdXJhdGlvbiAqIDEwMDApKTtcblxuXHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yXG5cdFx0XHRcdHRoaXNfbm90aWNlLmNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaW1nXCIsIHsgYXR0cjogeyBcblx0XHRcdFx0XHRzcmM6IHRoaXMuYXBwLnZhdWx0LmdldFJlc291cmNlUGF0aChhc3NldHNfZm9sZGVyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSphc3NldHNfZm9sZGVyLmxlbmd0aCldKSxcblx0XHRcdFx0XHRkaXNwbGF5OiBcImJsb2NrXCIsXG5cdFx0XHRcdFx0b2JqZWN0Zml0OiBcImNvdmVyXCJ9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sIHRoaXMuc2V0dGluZ3MuZnJlcXVlbmN5ICogNjAgKiAxMDAwKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJJbnRlcnZhbCh0aGlzLnJlbWluZGVyX2ludGVydmFsX2lkKTtcblxuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cblxuY2xhc3MgUmFuZG9taXplck1vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5zZXRUZXh0KCdpbiBwcm9ncmVzcyEnKTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG59XG5cbmNsYXNzIFByb2R1Y3Rpdml0eVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cGx1Z2luOiBQcm9kdWN0aXZpdHlQbHVnaW47XG5cdGhlYWRpbmc6IFwiUHJvZHVjdGl2aXR5IFJlbWluZGVyc1wiO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFByb2R1Y3Rpdml0eVBsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Ly8geWVzIEkga25vdyB0aGlzIGVudGlyZSBzZXR0aW5ncyBwYWdlIGlzIG9iamVjdGl2ZWx5IGN1cnNlZFxuXHRcdC8vIEknbGwgbWFrZSBpdCBuaWNlIGV2ZW50dWFsbHkgXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIlJlbWluZGVyIFNldHRpbmdzXCIpXG5cdFx0XHQuc2V0SGVhZGluZygpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZShcIlJlbWluZGVyIFNldHRpbmdzXCIpXG5cdFx0XHQuYWRkVG9nZ2xlKChjYikgPT4gXG5cdFx0XHRcdGNiXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnJlbWluZGVyc19lbmFibGVkKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnJlbWluZGVyc19lbmFibGVkID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnRvZ2dsZVJlbWluZGVycygpO1xuXHRcdFx0XHRcdH0pXG5cdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1JlbWluZGVyIEZyZXF1ZW5jeScpXG5cdFx0XHQuYWRkU2xpZGVyKChudW1iZXIpID0+IFxuXHRcdFx0XHRudW1iZXJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZnJlcXVlbmN5KVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmZyZXF1ZW5jeSA9IDEgKyA1OSAqIHZhbHVlLzEwMDtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pXG5cdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1JlbWluZGVyIER1cmF0aW9uJylcblx0XHRcdC5hZGRTbGlkZXIoKG51bWJlcikgPT4gXG5cdFx0XHRcdG51bWJlclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kdXJhdGlvbilcblx0XHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5kdXJhdGlvbiA9IDEgKyA1OSAqIHZhbHVlLzEwMDtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pXG5cdFx0KTtcblx0fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUE4STtBQVE5SSxJQUFNLG1CQUFnQztBQUFBLEVBQ3JDLG1CQUFtQjtBQUFBLEVBQ25CLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFDWDtBQUVBLElBQXFCLHFCQUFyQixjQUFnRCx1QkFBTztBQUFBLEVBSXRELE1BQU0sU0FBUztBQUNkLFVBQU0sS0FBSyxhQUFhO0FBR3hCLFVBQU0sZUFBZSxLQUFLLGNBQWMsUUFBUSxtQkFBbUIsQ0FBQyxRQUFvQjtBQUV2RixVQUFJLGdCQUFnQixLQUFLLEdBQUcsRUFBRSxLQUFLO0FBQUEsSUFDcEMsQ0FBQztBQUVELFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNO0FBQ2YsWUFBSSxnQkFBZ0IsS0FBSyxHQUFHLEVBQUUsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRCxDQUFDO0FBRUQsU0FBSyxjQUFjLElBQUksdUJBQXVCLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDN0QsU0FBSyxnQkFBZ0I7QUFBQSxFQUN0QjtBQUFBLEVBRUEsV0FBVztBQUFBLEVBRVg7QUFBQSxFQUVBLGtCQUFrQjtBQUNqQixRQUFJLENBQUMsS0FBSyxTQUFTLG1CQUFtQjtBQUNyQyxVQUFJLEtBQUssd0JBQXdCLFFBQVc7QUFDM0Msc0JBQWMsS0FBSyxvQkFBb0I7QUFBQSxNQUN4QztBQUVBLFdBQUssdUJBQXVCO0FBQzVCO0FBQUEsSUFDRDtBQUVBLFFBQUksS0FBSyx3QkFBd0IsT0FBVztBQUU1QyxRQUFJLGdCQUEwQixDQUFDO0FBRS9CLFNBQUssdUJBQXVCLE9BQU8sWUFBWSxNQUFNO0FBQ3BELFVBQUksY0FBYyxVQUFVLEdBQUc7QUFFOUIsWUFBSSxTQUFTLEtBQUssSUFBSSxNQUFNLGdCQUFnQixRQUFRO0FBRXBELFlBQUksVUFBVSxNQUFNO0FBQ25CLGNBQUksdUJBQU8sNkJBQThCLEtBQUssU0FBUyxXQUFXLEdBQUs7QUFBQSxRQUN4RSxPQUFPO0FBQ04saUJBQU8sU0FBUyxRQUFRLENBQUMsU0FBUTtBQUNoQyxnQkFBSSxnQkFBZ0IsdUJBQU87QUFDMUIsNEJBQWMsS0FBSyxJQUFJO0FBQUEsWUFDeEI7QUFBQSxVQUNELENBQUM7QUFBQSxRQUNGO0FBQUEsTUFDRDtBQUVBLFVBQUksY0FBYyxTQUFTLEdBQUc7QUFDN0IsWUFBSSxjQUFjLElBQUksdUJBQU8sNkJBQThCLEtBQUssU0FBUyxXQUFXLEdBQUs7QUFHekYsb0JBQVksWUFBWSxTQUFTLE9BQU87QUFBQSxVQUFFLE1BQU07QUFBQSxZQUMvQyxLQUFLLEtBQUssSUFBSSxNQUFNLGdCQUFnQixjQUFjLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBRSxjQUFjLE1BQU0sQ0FBQyxDQUFDO0FBQUEsWUFDakcsU0FBUztBQUFBLFlBQ1QsV0FBVztBQUFBLFVBQU87QUFBQSxRQUNuQixDQUFDO0FBQUEsTUFDRjtBQUFBLElBQ0QsR0FBRyxLQUFLLFNBQVMsWUFBWSxLQUFLLEdBQUk7QUFFdEMsU0FBSyxpQkFBaUIsS0FBSyxvQkFBb0I7QUFBQSxFQUVoRDtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ3BCLFNBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixNQUFNLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDMUU7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixVQUFNLEtBQUssU0FBUyxLQUFLLFFBQVE7QUFBQSxFQUNsQztBQUNEO0FBRUEsSUFBTSxrQkFBTixjQUE4QixzQkFBTTtBQUFBLEVBQ25DLFlBQVksS0FBVTtBQUNyQixVQUFNLEdBQUc7QUFBQSxFQUNWO0FBQUEsRUFFQSxTQUFTO0FBQ1IsVUFBTSxFQUFDLFVBQVMsSUFBSTtBQUNwQixjQUFVLFFBQVEsY0FBYztBQUFBLEVBQ2pDO0FBQUEsRUFFQSxVQUFVO0FBQ1QsVUFBTSxFQUFDLFVBQVMsSUFBSTtBQUNwQixjQUFVLE1BQU07QUFBQSxFQUNqQjtBQUNEO0FBRUEsSUFBTSx5QkFBTixjQUFxQyxpQ0FBaUI7QUFBQSxFQUlyRCxZQUFZLEtBQVUsUUFBNEI7QUFDakQsVUFBTSxLQUFLLE1BQU07QUFDakIsU0FBSyxTQUFTO0FBQUEsRUFDZjtBQUFBLEVBRUEsVUFBZ0I7QUFDZixVQUFNLEVBQUMsWUFBVyxJQUFJO0FBRXRCLGdCQUFZLE1BQU07QUFJbEIsUUFBSSx3QkFBUSxXQUFXLEVBQ3JCLFFBQVEsbUJBQW1CLEVBQzNCLFdBQVc7QUFFYixRQUFJLHdCQUFRLFdBQVcsRUFDckIsUUFBUSxtQkFBbUIsRUFDM0I7QUFBQSxNQUFVLENBQUMsT0FDWCxHQUNFLFNBQVMsS0FBSyxPQUFPLFNBQVMsaUJBQWlCLEVBQy9DLFNBQVMsT0FBTyxVQUFVO0FBQzFCLGFBQUssT0FBTyxTQUFTLG9CQUFvQjtBQUN6QyxjQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLGFBQUssT0FBTyxnQkFBZ0I7QUFBQSxNQUM3QixDQUFDO0FBQUEsSUFDSjtBQUVBLFFBQUksd0JBQVEsV0FBVyxFQUNyQixRQUFRLG9CQUFvQixFQUM1QjtBQUFBLE1BQVUsQ0FBQyxXQUNYLE9BQ0UsU0FBUyxLQUFLLE9BQU8sU0FBUyxTQUFTLEVBQ3ZDLFNBQVMsT0FBTyxVQUFVO0FBQzFCLGFBQUssT0FBTyxTQUFTLFlBQVksSUFBSSxLQUFLLFFBQU07QUFDaEQsY0FBTSxLQUFLLE9BQU8sYUFBYTtBQUFBLE1BQ2hDLENBQUM7QUFBQSxJQUNKO0FBRUEsUUFBSSx3QkFBUSxXQUFXLEVBQ3JCLFFBQVEsbUJBQW1CLEVBQzNCO0FBQUEsTUFBVSxDQUFDLFdBQ1gsT0FDRSxTQUFTLEtBQUssT0FBTyxTQUFTLFFBQVEsRUFDdEMsU0FBUyxPQUFPLFVBQVU7QUFDMUIsYUFBSyxPQUFPLFNBQVMsV0FBVyxJQUFJLEtBQUssUUFBTTtBQUMvQyxjQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0o7QUFBQSxFQUNEO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
