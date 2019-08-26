import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ProgramComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-program div table .btn-danger'));
  title = element.all(by.css('jhi-program div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class ProgramUpdatePage {
  pageTitle = element(by.id('jhi-program-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descInput = element(by.id('field_desc'));
  imageInput = element(by.id('file_image'));
  latitudeInput = element(by.id('field_latitude'));
  longitudeInput = element(by.id('field_longitude'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  eventSelect = element(by.id('field_event'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setDescInput(desc) {
    await this.descInput.sendKeys(desc);
  }

  async getDescInput() {
    return await this.descInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return await this.imageInput.getAttribute('value');
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return await this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return await this.longitudeInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return await this.endDateInput.getAttribute('value');
  }

  async eventSelectLastOption(timeout?: number) {
    await this.eventSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async eventSelectOption(option) {
    await this.eventSelect.sendKeys(option);
  }

  getEventSelect(): ElementFinder {
    return this.eventSelect;
  }

  async getEventSelectedOption() {
    return await this.eventSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProgramDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-program-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-program'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
