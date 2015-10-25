SFuber Movies
==============

Implementation of the SF Movies [Uber coding challange][uberchallange].

The application allows users to view on a map the locations of movies filmed in San Francisco:
![Screenshot][app-screenshot]

The user can see for each location how many movies have been filmed there. It is possible to filter
the locations by movie title using an auto-complete search box. Finally, locations can be inspected by
clicking on them which will bring up a details window containing information about the movies filmed there.

[app-screenshot]: resources/app-screenshot.png
[uberchallange]: https://github.com/uber/coding-challenge-tools

## Demo app
The demo application is hosted at Heroku on two different apps; one for serving the static assets (client) and another for the backend (service):

* Client: http://sfubermovies-client.herokuapp.com
* Service: http://sfubermovies.herokuapp.com

## Architecture and design choices
The application is implemented as a classic client-server architecture with a SPA client written in AngularJS and a
backend (service) written in Python. I have chosen the full-stack track.

The client and service are independent deployable applications where nothing is "hosted" in the service besides its own API - 
not even the HTML, CSS, JS or other client resources. This approach was chosen because it provides the cleanest separation of
concerns and allows for easy deployment and scalability of both modules. For example, the client can be easily hosted on 
anything that can serve HTML, CSS and JS files -- from a a simple web server to a full fledged CDN like [Amazons CloudFront][cloudfront].

### Service (back-end)
The service is implemented as a Python Flask app backed by a MongoDB database. It presents a simple REST(like) API that
allows the client to retrieve locations, location-details and movie information.

Python was chosen as the implementation language for two reasons; it is the primary language in use at Uber
and I have no experience with it. Furthermore, MongoDB is used as the datastore because NoSQL is also very prominent
at Uber and (you guessed it right) I have no experience with it. [As a great man once said][picassoquote]:
> I am always doing that which I cannot do, in order that I may learn how to do it.
 
Therefore, jumping in with both feet was the obvious choice. 

All data has been imported from [DataSF][datasf] using a series of Python scripts that perform transformations, geocoding
(using Google APIs) and clean up.

[datasf]: https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am
[picassoquote]: http://www.brainyquote.com/quotes/quotes/p/pablopicas107571.html

### Web client (front-end)
Even though the challenge recommends against using AngularJS I chose to use it for the client anyway. This was primarily due to the
fact that it is the framework in which I am most versed client-wise and that it allows for easy separation of concerns and
therefore testing. Furthermore, using unknown technologies/frameworks on both ends of the stack would have been too much overhead
with regards to the limited time frame of the task.

[cloudfront]: https://aws.amazon.com/cloudfront

### Acceptance test
Throughout the solution I have focused extensively on testing and have largely developed the app using BDD and TDD.
As a result the app is (mostly) covered by end-to-end (acceptance) tests, integration tests and unit tests. 
The acceptance-test module contains the end-to-end tests for the web-client. They're implemented using Cucumber 
for mapping the user stories to executable specs, Geb (Groovy) for implementing the executable specs, 
Selenium for driving the app from the executable specs, and finally Serenity BDD for generating living documentation.

The report reflecting the state of the app at the time of deployment can be found here:
A video of the acceptance-tests running can be found here:

## Technologies and tools
The following table summarizes the technologies and tools used in the project, their roles as well as my experience with them.

### Web client
Technology            | Role                    | Experience
----------------------|-------------------------|:---------------------:
JavaScript            | Implementation language | ![Master][master]
[npm][npm]            | Build automation        | ![Beginner][beginner]
HTML                  | Presentation/layout     | ![Master][master]
[AngularJS][angular]  | SPA web framework       | ![Master][master]

[npm]: https://www.npmjs.com
[angular]: https://angularjs.org

### Service
Technology       | Role                       | Experience
-----------------|----------------------------|:---------------------:
[Python][python] | Implementation language    | ![None][none]
[Flask][flask]   | Web framework              | ![None][none]
[MongoDB][mongo] | Database                   | ![None][none]

[python]: https://www.python.org
[flask]: http://flask.pocoo.org
[mongo]: https://www.mongodb.org

### Acceptance test
Technology           | Role                    | Experience
---------------------|-------------------------|:---------------------:
[Groovy][groovy]     | Implementation language | ![Advanced][advanced]
[Gradle][gradle]     | Build automation        | ![Advanced][advanced]
[Geb][geb]           | Browser automation      | ![Advanced][advanced]
[Cucumber][cucumber] | BDD                     | ![Master][master]

[groovy]: http://www.groovy-lang.org
[gradle]: http://gradle.org
[geb]: http://www.gebish.org
[cucumber]: https://cucumber.io

[none]: resources/icons/none.png
[beginner]: resources/icons/beginner.png
[advanced]: resources/icons/advanced.png
[master]: resources/icons/master.png

## Further work
The following areas are good candidates for improvement that were downprioritized due to time constraints:

* __Integration/end-to-end testing of service__: there are currently no integration tests for the service. Even though
all functionality is covered by the acceptance-tests it is hard to tell where the problem is when they fail. Integration tests
that hit the service API directly (without the UI) would provide better defect localization. Furthermore, if the service is
to be used by other clients (mobile, other services etc) testing it in isolation is much more important since there will 
most likely be functionality not covered by the web-client and therefore its acceptance-tests.
* __Unit-testing Angular directives__: the client is covered only by unit tests of services. Since the acceptance-tests cover the UI
the directives have not been tested in isolation. Testing directives in Angular is generally not as easy or clean as testing services
but as an application grows it can be warranted especially in the non-happy path cases that typically do not have corresponding acceptance-tests.
* __Scalability__: the client currently asks for all location points on the map in a single request. Of course this approach does not
 scale to thousands of locations. A large user base could warrant a different approach in which only the visible location points are
 sent to the client, and in particular only the ones not currently being clustered on the map. Upon zomming the client would ask for
 newly visible and un-clustered locations. Essentially this would be clustering done on the server. While more performant this solution
 is much more complex than the one implemented here.
 * __Error handling__: currently there is no error handling present in the client. If a connection error occurs, for example, nothing
 happens when clicking the locations or searching for movies. A proper way to handle this would be to implement retrying logic and
 show an error message if failed to alert the user.
