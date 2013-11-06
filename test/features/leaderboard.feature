Feature: Player score can be increased manually

  As a score keeper in some hyperthetical game
  I want to manually give a player five points
  So that I can publicly display a up-to-date scoreboard

  Scenario: Give 5 points to a player
    Given I authenticate
    And "Grace Hopper" has a score of 10
    When I give "Grace Hopper" 5 points
    Then "Grace Hopper" has a score of 15