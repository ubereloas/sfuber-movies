Feature: Display movie location details

  Scenario: Display movie location details
    Given there are some movies in the system filmed at the same location
    When I open the details for that location
    Then I should see the name of the location and the title and release year of the movies
