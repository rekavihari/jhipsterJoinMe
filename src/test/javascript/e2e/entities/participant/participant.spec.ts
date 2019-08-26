/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParticipantComponentsPage, ParticipantDeleteDialog, ParticipantUpdatePage } from './participant.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Participant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let participantUpdatePage: ParticipantUpdatePage;
  let participantComponentsPage: ParticipantComponentsPage;
  let participantDeleteDialog: ParticipantDeleteDialog;
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

  it('should load Participants', async () => {
    await navBarPage.goToEntity('participant');
    participantComponentsPage = new ParticipantComponentsPage();
    await browser.wait(ec.visibilityOf(participantComponentsPage.title), 5000);
    expect(await participantComponentsPage.getTitle()).to.eq('Participants');
  });

  it('should load create Participant page', async () => {
    await participantComponentsPage.clickOnCreateButton();
    participantUpdatePage = new ParticipantUpdatePage();
    expect(await participantUpdatePage.getPageTitle()).to.eq('Create or edit a Participant');
    await participantUpdatePage.cancel();
  });

  it('should create and save Participants', async () => {
    const nbButtonsBeforeCreate = await participantComponentsPage.countDeleteButtons();

    await participantComponentsPage.clickOnCreateButton();
    await promise.all([
      participantUpdatePage.setNameInput('name'),
      participantUpdatePage.setEmailInput('email'),
      participantUpdatePage.setPhoneInput('5'),
      participantUpdatePage.setImageInput(absolutePath)
      // participantUpdatePage.eventSelectLastOption(),
    ]);
    expect(await participantUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await participantUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await participantUpdatePage.getPhoneInput()).to.eq('5', 'Expected phone value to be equals to 5');
    expect(await participantUpdatePage.getImageInput()).to.endsWith(
      fileNameToUpload,
      'Expected Image value to be end with ' + fileNameToUpload
    );
    await participantUpdatePage.save();
    expect(await participantUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await participantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Participant', async () => {
    const nbButtonsBeforeDelete = await participantComponentsPage.countDeleteButtons();
    await participantComponentsPage.clickOnLastDeleteButton();

    participantDeleteDialog = new ParticipantDeleteDialog();
    expect(await participantDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Participant?');
    await participantDeleteDialog.clickOnConfirmButton();

    expect(await participantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
