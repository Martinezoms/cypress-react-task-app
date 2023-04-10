describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.backdrop').should('exist');
    cy.get('.modal').should('exist');
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    // use cancel button
    cy.contains('Add Task').click();
    cy.contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });

  it('should create a new task', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();

    //filling input areas
    cy.get('#title').type('New Task');
    cy.get('#summary').type('Some description for new task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    //checking if task was created
    cy.get('.task').should('have.length', 1);
    cy.get('.task h2').contains('New Task');
    cy.get('.task p').contains('Some description for new task');
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('.modal').contains('Add Task').click();
    cy.get('.modal').contains('Please provide values');
  });

  it('should filter tasks', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Add Task').click();
    cy.get('#title').type('New Task');
    cy.get('#summary').type('Some description for new task');
    cy.get('#category').select('urgent');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    //filtering
    cy.get('#filter').select('moderate');
    cy.get('.task').should('have.length', 0);
    cy.get('#filter').select('urgent');
    cy.get('.task').should('have.length', 1);
    cy.get('#filter').select('all');
    cy.get('.task').should('have.length', 1);
  });

  it('should add multiple tasks', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Add Task').click();
    cy.get('#title').type('Task 1');
    cy.get('#summary').type('First task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 1);

    cy.contains('Add Task').click();
    cy.get('#title').type('Task 2');
    cy.get('#summary').type('Second task');
    cy.get('.modal').contains('Add Task').click();
    cy.get('.task').should('have.length', 2);

    //checking order of task
    cy.get('.task').eq(0).contains('First task');
    cy.get('.task').eq(1).contains('Second task');
  });
});
