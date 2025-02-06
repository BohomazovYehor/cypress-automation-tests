import PracticeFormPage from '../po/pages/PracticeFormPage';
import StudentForm from "../po/pages/StudentFormPage";
import student from '../fixtures/student.js';
import {getCurrentBritishFormatDate} from "../support/dateUtils";

describe('Automation Practice Form Tests', () => {

  beforeEach(() => {
    PracticeFormPage.open();
  });

  it('Positive Test: Fill All Fields and Verify Submission', () => {
    PracticeFormPage
        .fillFirstName(student.firstName)
        .fillLastName(student.lastName)
        .fillEmail(student.email)
        .selectGender(student.gender)
        .fillMobile(student.mobile)
        .setDateOfBirth(student.birthYear, student.birthMonth, student.birthDay)
        .fillSubject(student.subject)
        .selectHobby(student.hobbyId)
        .uploadPicture(student.picture)
        .fillAddress(student.address)
        .selectState(student.state)
        .selectCity(student.city)
        .submitForm();

    const expectedData = {
      'Student Name': `${student.firstName} ${student.lastName}`.trim(),
      'Student Email': student.email,
      'Mobile': student.mobile,
      'Gender': student.gender,
      'Date of Birth': `${student.birthDay} ${student.birthMonth},${student.birthYear}`,
      'Subjects': student.subject,
      'Hobbies': student.hobby,
      'Picture': student.picture,
      'Address': student.address,
      'State and City': `${student.state} ${student.city}`
    }

    StudentForm.checkSubmittedData(expectedData);
  });

  it('Positive Test: Fill Only Required Fields and Verify Submission', () => {
    PracticeFormPage
        .fillFirstName(student.firstName)
        .fillLastName(student.lastName)
        .selectGender(student.gender)
        .fillMobile(student.mobile)
        .submitForm();

    const expectedData = {
      'Student Name': `${student.firstName} ${student.lastName}`.trim(),
      'Student Email': '',
      'Mobile': student.mobile,
      'Gender': student.gender,
      'Date of Birth': getCurrentBritishFormatDate(),
      'Subjects': '',
      'Hobbies': '',
      'Picture': '',
      'Address': '',
      'State and City': ''
    }

    StudentForm.checkSubmittedData(expectedData);
  });

  it('Negative Test 1: Empty First Name', () => {
    PracticeFormPage
        .fillLastName(student.lastName)
        .selectGender(student.gender)
        .fillMobile(student.mobile)
        .submitForm();
    cy.get(PracticeFormPage.firstNameInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Negative Test 2: Invalid Email Format', () => {
    PracticeFormPage
        .fillFirstName(student.firstName)
        .fillLastName(student.lastName)
        .fillEmail('invalid-email')
        .selectGender(student.gender)
        .fillMobile(student.mobile)
        .submitForm();
    cy.get(PracticeFormPage.emailInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Negative Test 3: Empty Mobile Number', () => {
    PracticeFormPage
        .fillFirstName(student.firstName)
        .fillLastName(student.lastName)
        .selectGender(student.gender)
        .submitForm();
    cy.get(PracticeFormPage.mobileNumberInput).should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});
