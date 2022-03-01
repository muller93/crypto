describe("First test", () => {
  it("should visit login page", () => {
    cy.visit("");
    cy.get('login-btn').click();

  });
});
