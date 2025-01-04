describe("User List Page", () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit("http://localhost:5173");
  });

  it("should display the user list", () => {
    // Mock the API response
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/users", {
      statusCode: 200,
      body: [
        { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
        { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
      ],
    }).as("getUsers");

    // Wait for the API call to complete
    cy.wait("@getUsers");

    // Verify the user list is displayed
    cy.get('[data-cy="user-list-header"]').should("contain", "User List");
    cy.get('[data-cy="user-list"]').within(() => {
      cy.get('[data-cy="user-item"]').should("have.length", 2);
      cy.get('[data-cy="user-item"]')
        .first()
        .should("contain", "Leanne Graham");
      cy.get('[data-cy="user-item"]').last().should("contain", "Ervin Howell");
    });
  });
});
