import { formPage } from '../pages/PracticeFormPage';

describe('Automation Practice Form Tests', () => {
  const formData = {
    firstName: 'Yehor',
    lastName: 'Test',
    email: 'yehor.test@example.com',
    gender: 'Male',
    mobile: '1234567890',
    birthYear: '1995',
    birthMonth: 'January',
    birthDay: '15',
    subject: 'Maths',
    hobby: 'Sports',
    hobbyId: '1',
    picture: 'test-image.png',
    address: 'Tallinn, Estonia',
    state: 'NCR',
    city: 'Delhi'
  };

  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
        console.error(err);
        // Prevent Cypress from failing the test
        return false;
      });
    formPage.visit();
  });

  const fillForm = (data) => {
    if (data.firstName) formPage.fillFirstName(data.firstName);
    if (data.lastName) formPage.fillLastName(data.lastName);
    if (data.email) formPage.fillEmail(data.email);
    if (data.gender) formPage.selectGender(data.gender);
    if (data.mobile) formPage.fillMobile(data.mobile);
    if (data.birthYear && data.birthMonth && data.birthDay) {
      formPage.setDateOfBirth(data.birthYear, data.birthMonth, data.birthDay);
    }
    if (data.subject) formPage.fillSubject(data.subject);
    if (data.hobbyId) formPage.selectHobby(data.hobbyId);
    if (data.picture) formPage.uploadPicture(data.picture);
    if (data.address) formPage.fillAddress(data.address);
    if (data.state) formPage.selectState(data.state);
    if (data.city) formPage.selectCity(data.city);
  };

  it('Positive Test: Fill All Fields and Verify Submission', () => {
    fillForm(formData);
    formPage.submitForm();
    formPage.checkConfirmationModal(formData);
  });

  it('Positive Test: Fill Only Required Fields and Verify Submission', () => {
    const requiredFields = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      mobile: formData.mobile
    };

    fillForm(requiredFields);
    formPage.submitForm();
    formPage.checkConfirmationModal(requiredFields);
  });
  
  it('Negative Test 1: Empty First Name', () => {
    formPage.fillLastName(formData.lastName);
    formPage.selectGender(formData.gender);
    formPage.fillMobile(formData.mobile);
    formPage.submitForm();
    cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Negative Test 2: Invalid Email Format', () => {
    formPage.fillFirstName(formData.firstName);
    formPage.fillLastName(formData.lastName);
    formPage.fillEmail('уцййцкйцу');
    formPage.selectGender(formData.gender);
    formPage.fillMobile(formData.mobile);
    formPage.submitForm();
    cy.get('#userEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Negative Test 3: Empty Mobile Number', () => {
    formPage.fillFirstName(formData.firstName);
    formPage.fillLastName(formData.lastName);
    formPage.selectGender(formData.gender);
    formPage.submitForm();
    cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});
