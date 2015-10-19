Feature: View movie locations

  Scenario: View movie locations
    Given there are some movies in the system with distinct locations
    When I go to the map page
    Then I should see a map marker for each of the distinct locations