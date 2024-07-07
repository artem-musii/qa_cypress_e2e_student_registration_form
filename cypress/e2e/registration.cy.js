/// <reference types='cypress' />

describe('Student Registration page', () => {
  const baseDataset = {
    firstName: 'John',
    lastName: 'Doe',
    userEmail: 'johgn.doe@gamil.com',
    gender: 'Male',
    phone: '1234567890',
    day: '22',
    month: 'March',
    year: '2005',
    subjects: ['Maths'],
    hobbies: ['Reading', 'Sports'],
    address: 'My address',
    state: 'NCR',
    city: 'Delhi'
  };

  before(() => {
    cy.visit('/');
  });

  it('should give possibility to register', () => {
    cy.get('#firstName').type(baseDataset.firstName);
    cy.get('#lastName').type(baseDataset.lastName);
    cy.get('#userEmail').type(baseDataset.userEmail);
    cy.contains('.custom-control-label', baseDataset.gender).click();
    cy.get('#userNumber').type(baseDataset.phone);
    cy.get('#dateOfBirthInput').type(`{selectall}${baseDataset.day} ${baseDataset.month} ${baseDataset.year}{esc}`);

    baseDataset.subjects.forEach((subject) => {
      cy.get('.subjects-auto-complete__control').type(`${subject}{enter}`);
    });

    baseDataset.hobbies.forEach((hobby) => {
      cy.contains('.custom-control-label', hobby).click();
    });

    cy.get('#currentAddress').type(baseDataset.address);
    cy.get('#state').type(`${baseDataset.state}{enter}`);
    cy.get('#city').type(`${baseDataset.city}{enter}`);
    cy.get('#submit').click();

    for (const value of Object.values(baseDataset)) {
      cy.get('td').should('include.text', Array.isArray(value)
        ? value.join(', ')
        : value);
    }
  });
});
