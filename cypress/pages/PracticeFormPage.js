class PracticeFormPage {
    visit() {
      cy.visit('https://demoqa.com/automation-practice-form');
    }
  
    fillFirstName(firstName) {
      cy.get('#firstName').type(firstName);
    }
  
    fillLastName(lastName) {
      cy.get('#lastName').type(lastName);
    }
  
    fillEmail(email) {
      cy.get('#userEmail').type(email);
    }
  
    selectGender(gender) {
      cy.get('[name="gender"][value="' + gender + '"]').check({ force: true });
    }
  
    fillMobile(mobile) {
      cy.get('#userNumber').type(mobile);
    }
  
    setDateOfBirth(year, month, day) {
      cy.get('#dateOfBirthInput').click();
      cy.get('.react-datepicker__year-select').select(year);
      cy.get('.react-datepicker__month-select').select(month);
      cy.get(`.react-datepicker__day--0${day}`).click();
    }
  
    fillSubject(subject) {
      cy.get('#subjectsInput').type(subject).type('{enter}');
    }
  
    selectHobby(hobbyId) {
      cy.get(`label[for="hobbies-checkbox-${hobbyId}"]`).click();
    }
  
    uploadPicture(picture) {
      cy.get('#uploadPicture').attachFile(picture);
    }
  
    fillAddress(address) {
      cy.get('#currentAddress').type(address);
    }
  
    selectState(state) {
      cy.get('#state').click().find('#react-select-3-option-0').type(state + '{enter}');
    }
  
    selectCity(city) {
      cy.get('#city').click().find('#react-select-4-option-0').type(city + '{enter}');
    }
  
    submitForm() {
      cy.get('#submit').click();
    }
  
    checkConfirmationModal(data) {
      cy.get('.modal-content').should('be.visible');
  
      const fieldsMap = {
        'Student Name': `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        'Student Email': data.email,
        'Gender': data.gender,
        'Mobile': data.mobile,
        'Date of Birth': data.birthDay && data.birthMonth && data.birthYear
          ? `${data.birthDay} ${data.birthMonth},${data.birthYear}`
          : undefined,
        'Subjects': data.subject,
        'Hobbies': data.hobby,
        'Picture': data.picture,
        'Address': data.address,
        'State and City': data.state && data.city
          ? `${data.state} ${data.city}`
          : data.state || data.city,
      };
  
      Object.entries(fieldsMap).forEach(([field, value]) => {
        if (value !== undefined) {
          cy.get('td').contains(field).next().should('have.text', value);
        }
      });
    }
  }
  
  export const formPage = new PracticeFormPage();