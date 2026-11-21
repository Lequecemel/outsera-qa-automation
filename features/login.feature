Feature: Login functionality
  As a user of the demo store
  I want to sign in
  So that I can access the inventory


  Scenario: Successful login with valid credentials
    Given I open the Sauce Demo login page
    When I log in with valid credentials
    Then I should see the inventory page

  Scenario: Login fails with invalid credentials
    Given I open the Sauce Demo login page
    When I log in with username "invalid_user" and password "wrong_password"
    Then I should see a login error

  Scenario: Login fails when username and password are blank
    Given I open the Sauce Demo login page
    When I submit the login form without credentials
    Then I should see a login error
