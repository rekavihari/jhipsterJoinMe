/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProgramComponentsPage, ProgramDeleteDialog, ProgramUpdatePage } from './program.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Program e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let programUpdatePage: ProgramUpdatePage;
  let programComponentsPage: ProgramComponentsPage;
  let programDeleteDialog: ProgramDeleteDialog;
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

  it('should load Programs', async () => {
    await navBarPage.goToEntity('program');
    programComponentsPage = new ProgramComponentsPage();
    await browser.wait(ec.visibilityOf(programComponentsPage.title), 5000);
    expect(await programComponentsPage.getTitle()).to.eq('Programs');
  });

  it('should load create Program page', async () => {
    await programComponentsPage.clickOnCreateButton();
    programUpdatePage = new ProgramUpdatePage();
    expect(await programUpdatePage.getPageTitle()).to.eq('Create or edit a Program');
    await programUpdatePage.cancel();
  });

  it('should create and save Programs', async () => {
    const nbButtonsBeforeCreate = await programComponentsPage.countDeleteButtons();

    await programComponentsPage.clickOnCreateButton();
    await promise.all([
      programUpdatePage.setNameInput('name'),
      programUpdatePage.setDescInput('desc'),
      programUpdatePage.setImageInput(absolutePath),
      programUpdatePage.setLatitudeInput('5'),
      programUpdatePage.setLongitudeInput('5'),
      programUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      programUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      programUpdatePage.eventSelectLastOption()
    ]);
    expect(await programUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await programUpdatePage.getDescInput()).to.eq('desc', 'Expected Desc value to be equals to desc');
    expect(await programUpdatePage.getImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected Image value to be end with ' + fileNameToUpload
    );
    expect(await programUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await programUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    expect(await programUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await programUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30', 'Expected endDate value to be equals to 2000-12-31');
    await programUpdatePage.save();
    expect(await programUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await programComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Program', async () => {
    const nbButtonsBeforeDelete = await programComponentsPage.countDeleteButtons();
    await programComponentsPage.clickOnLastDeleteButton();

    programDeleteDialog = new ProgramDeleteDialog();
    expect(await programDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Program?');
    await programDeleteDialog.clickOnConfirmButton();

    expect(await programComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
