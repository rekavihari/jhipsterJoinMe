import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class EventComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-event div table .btn-danger'));
  title = element.all(by.css('jhi-event div h2#page-heading span')).first();

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

export class EventUpdatePage {
  pageTitle = element(by.id('jhi-event-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  dateInput = element(by.id('field_date'));
  descInput = element(by.id('field_desc'));
  imageInput = element(by.id('file_image'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));
  programSelect = element(by.id('field_program'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
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

  async programSelectLastOption(timeout?: number) {
    await this.programSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async programSelectOption(option) {
    await this.programSelect.sendKeys(option);
  }

  getProgramSelect(): ElementFinder {
    return this.programSelect;
  }

  async getProgramSelectedOption() {
    return await this.programSelect.element(by.css('option:checked')).getText();
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

export class EventDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-event-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-event'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}