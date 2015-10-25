Feature: Display movie locations clustered

  Scenario: View cluster
    Given there are some movies in the system filmed at distinct locations close together
    When I go to the locations page
    Then I should see a location cluster containing the number of movies filmed at the distinct locations

  Scenario: Open cluster
    Given there are some movies in the system filmed at distinct locations close together
    When I go to the locations page
    And I open the corresponding cluster
    Then I should see each of the distinct locations
