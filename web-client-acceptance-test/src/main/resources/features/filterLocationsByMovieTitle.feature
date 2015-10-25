Feature: Filter locations by movie title

  Scenario: Add movie title filter
    Given there are some movies in the system filmed at distinct locations with different titles
    When I go to the locations page
    And I add a filter for one of the titles
    Then I should see only the locations where that movie has been filmed

  Scenario: Remove movie title filter
    Given there are some movies in the system filmed at distinct locations with different titles
    And I am on the locations page
    And I have added a filter for one of the titles
    When I remove the filter
    Then I should see all movie locations again