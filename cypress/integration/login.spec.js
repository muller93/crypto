describe("First test", () => {
  it("should login", () => {
    cy.visit("/login");
    cy.get("#userNameInput").type('test');
    cy.get("#passwordInput").type('test');
    cy.get("#login-btn")
      .click()
      .should(() => {
        const users = JSON.parse(localStorage.getItem("users"));
        expect(users.some((x) => x.userName === "test")).to.equal(true);
      });
  });
});
