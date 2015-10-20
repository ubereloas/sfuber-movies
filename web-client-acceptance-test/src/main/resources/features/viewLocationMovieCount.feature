Feature: View number of movies filmed at locations
  @manual
  Scenario: View number of movies filmed at locations
    Given there are some movies in the system filmed at the same locations
    When I go to the map page
    Then I should see the number of movies filmed at each location in its map marker