Feature: Display movie location details

  Scenario: Display movie location details
    Given there are movies in the system filmed at the same location
    When I open the details for that location
    Then I should see the locations name and the movie titles
