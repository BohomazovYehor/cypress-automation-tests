class StudentFormPage {
    //Locators
    modalContent = '.modal-content';
    tableCell = '.modal-body table td';

    checkSubmittedData(studentTableData) {
        cy.get(this.modalContent).should('be.visible');
        Object.entries(studentTableData).forEach(([field, value]) => {
            if (value !== undefined) {
                cy.get(this.tableCell).contains(field).next().should('have.text', value);
            }
        });
    }
}
export default new StudentFormPage();