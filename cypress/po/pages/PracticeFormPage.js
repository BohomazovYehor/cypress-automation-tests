class PracticeFormPage {
    #url = `/automation-practice-form`;
    //Locators
    firstNameInput = '#firstName';
    lastNameInput = '#lastName';
    emailInput = '#userEmail';
    genderRadioButton = '[name="gender"][value="{genderName}"]';
    mobileNumberInput = '#userNumber';
    dateOfBirthInput = '#dateOfBirthInput';
    selectYearDatePicker = '.react-datepicker__year-select';
    selectMonthDatePicker = '.react-datepicker__month-select';
    selectDayDatePicker = '.react-datepicker__day--0{day}';
    subjectsInput = '#subjectsInput';
    hobbyCheckBox = 'label[for="hobbies-checkbox-{hobbyId}"]';
    uploadFileInput = '#uploadPicture';
    addressTextArea = '#currentAddress';
    selectStateContainer = '#state';
    selectStateOptions = '#react-select-3-option-0';
    selectCityContainer = '#city';
    selectCityOptions = '#react-select-4-option-0';
    submitButton = '#submit';

    open() {
      cy.visit(this.#url);
      return this;
    }
  
    fillFirstName(firstName) {
      cy.get(this.firstNameInput).type(firstName);
        return this;
    }
  
    fillLastName(lastName) {
      cy.get(this.lastNameInput).type(lastName);
        return this;
    }
  
    fillEmail(email) {
      cy.get(this.emailInput).type(email);
        return this;
    }
  
    selectGender(gender) {
        cy.get(this.genderRadioButton.replace("{genderName}", gender)).check({ force: true });
        return this;
    }
  
    fillMobile(mobile) {
      cy.get(this.mobileNumberInput).type(mobile);
        return this;
    }

    setDateOfBirth(year, month, day) {
        cy.get(this.dateOfBirthInput).click();
        cy.get(this.selectYearDatePicker).select(year);
        cy.get(this.selectMonthDatePicker).select(month);
        cy.get(this.selectDayDatePicker.replace("{day}", day)).click();
        return this;
    }

    fillSubject(subject) {
      cy.get(this.subjectsInput).type(`${subject}{enter}`, {force: true});
        return this;
    }

    selectHobby(hobbyId) {
        cy.get(this.hobbyCheckBox.replace("{hobbyId}", hobbyId)).click({force: true});
        return this;
    }

    uploadPicture(picture) {
      cy.get(this.uploadFileInput).attachFile(picture);
        return this;
    }

    fillAddress(address) {
      cy.get(this.addressTextArea).type(address, {force: true});
        return this;
    }

    selectState(state) {
      cy.get(this.selectStateContainer)
          .click()
          .find(this.selectStateOptions)
          .type(state + '{enter}');
        return this;
    }

    selectCity(city) {
      cy.get(this.selectCityContainer)
          .click()
          .find(this.selectCityOptions)
          .type(city + '{enter}');
        return this;
    }

    submitForm() {
      cy.get(this.submitButton).click({force: true});
    }
  }
  
  export default new PracticeFormPage();