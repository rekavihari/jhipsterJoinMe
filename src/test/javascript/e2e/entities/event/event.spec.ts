/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EventComponentsPage, EventDeleteDialog, EventUpdatePage } from './event.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Event e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventUpdatePage: EventUpdatePage;
  let eventComponentsPage: EventComponentsPage;
  let eventDeleteDialog: EventDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Events', async () => {
    await navBarPage.goToEntity('event');
    eventComponentsPage = new EventComponentsPage();
    await browser.wait(ec.visibilityOf(eventComponentsPage.title), 5000);
    expect(await eventComponentsPage.getTitle()).to.eq('Events');
  });

  it('should load create Event page', async () => {
    await eventComponentsPage.clickOnCreateButton();
    eventUpdatePage = new EventUpdatePage();
    expect(await eventUpdatePage.getPageTitle()).to.eq('Create or edit a Event');
    await eventUpdatePage.cancel();
  });

  it('should create and save Events', async () => {
    const nbButtonsBeforeCreate = await eventComponentsPage.countDeleteButtons();

    await eventComponentsPage.clickOnCreateButton();
    await promise.all([
      eventUpdatePage.setCodeInput('code'),
      eventUpdatePage.setNameInput('name'),
      eventUpdatePage.setDescInput('desc'),
      eventUpdatePage.setImageInput(absolutePath),
      eventUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      eventUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
      // eventUpdatePage.participantSelectLastOption(),
    ]);
    expect(await eventUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await eventUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await eventUpdatePage.getDescInput()).to.eq('desc', 'Expected Desc value to be equals to desc');
    expect(await eventUpdatePage.getImageInput()).to.endsWith(fileNameToUpload, 'Expected Image value to be end with ' + fileNameToUpload);
    expect(await eventUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30', 'Expected startDate value to be equals to 2000-12-31');
    expect(await eventUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30', 'Expected endDate value to be equals to 2000-12-31');
    await eventUpdatePage.save();
    expect(await eventUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Event', async () => {
    const nbButtonsBeforeDelete = await eventComponentsPage.countDeleteButtons();
    await eventComponentsPage.clickOnLastDeleteButton();

    eventDeleteDialog = new EventDeleteDialog();
    expect(await eventDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Event?');
    await eventDeleteDialog.clickOnConfirmButton();

    expect(await eventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
