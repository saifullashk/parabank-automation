Feature: Parabank Sign Up and Login

  Scenario: User signs up and logs in to Parabank
    Given I am on the Parabank login page
    When I enter login details and validate error
    And I fill the registration form and submit
    Then I click Account overview and print total amount