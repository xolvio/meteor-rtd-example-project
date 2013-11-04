Feature: Example feature
  As a user of the new GWT feature in RTD
  I want to mess around with it
  So that I can see how it works

  Scenario: New customer entering for the first time
    Given I am a new customer
    When I go to the home page
    Then I should a "Sign in" link
