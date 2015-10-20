Feature: Display movie locations

  Scenario: Distinct locations
    Given there are some movies in the system filmed at distinct locations
    When I go to the locations page
    Then I should see each of the distinct locations

  @manual
  Scenario: Same locations
    Given there are some movies in the system filmed at the same locations
    When I go to the locations page
    Then I should see how many movies are filmed at each location