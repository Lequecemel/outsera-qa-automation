Feature: Shopping cart checkout
  As a customer
  I want to complete a checkout
  So that I can place an order

  Scenario: Successful checkout with valid customer details
    Given I am logged in to Sauce Demo
    When I add the first product to the cart
    And I open the cart and start checkout
    And I complete checkout with first name "QA", last name "Tester", and postal code "06315"
    And I continue and finish the order
    Then I should see the order confirmation

  Scenario: Checkout validation for missing required information
    Given I am logged in to Sauce Demo
    When I add the first product to the cart
    And I open the cart and start checkout
    And I submit checkout with blank customer information
    Then I should see a checkout validation error
