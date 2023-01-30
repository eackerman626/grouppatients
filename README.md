# Group Builder

## Objective

Charlie Health has set out on a mission to re-imagine how high acuity care is
delivered to teens and young adults—particularly those in rural populations. Our
initial offering is a virtual intensive outpatient program (vIOP), which
connects like-minded virtual groups with therapists that specialize in their
specific mental health needs.

To scale our offering to help millions, we need software to manage patients and
the care groups in which they participate. In this assessment, you will add
functionality to a sample care management application.

## Brief

This starter application is a React app that fetches data from a FastAPI server.
The server reads data from tables in a PostgreSQL database. So far, this
application displays a list of patients and the times those patients are
available to attend group therapy sessions, and supports adding new patients and
setting their availability.

- The possible blocks of time during which a patient can be available are
  limited to 8am-12pm, 12pm-4pm, and 4pm-8pm, Monday through Friday.
  Availability blocks that are not those specific days and times are out of
  scope.
- Patients are only available for one block of time each day, at least 3 days
  per week.
- Patient availabilities are the same every week. Availability tied to specific
  dates is out of scope.

The users of this application need to be able to create groups and assign
patients to those groups so that they can receive care together. Patients who
are in the same group need to have the same availability blocks, so that they
can attend group therapy sessions together.

## Requirements

- As a user, I can assign and unassign a user to a group, and I can view which
  patients are assigned to each group, so that I can track who is receiving care
  together.
  - Patient-group assignments should be persisted to the database.
  - A patient can only be assigned to one group at a time.
  - All patients in a group must have at least 3 of the same availability
    blocks.
    - For example, this group works because all patients are available M 8-12, W
      12-4, F 4-8:
      - Patient 1 (M 8-12, M 12-4, W 12-4, F 4-8)
      - Patient 2 (M 8-12, Tu 4-8, W 12-4, Th 8-12, F 4-8)
      - Patient 3 (M 8-12, Tu 4-8, W 12-4, F 4-8)
      - Patient 4 (M 8-12, W 12-4, F 12-4, F 4-8)
    - But Patient 5 (W 12-4, F 12-4, F 4-8) cannot be added because they are not
      available on M 8-12.
- Styling with CSS and routing on the front end are out of scope.

## Instructions

- Please push your changes to the main branch. After you have pushed your code,
  submit the assignment on the CodeSubmit assignment page.
- Please make incremental git commits of your work.
- While this is a fullstack project, we do not expect you to be equally familiar
  with Python/FastAPI and TypeScript/React. If you are unfamiliar with the
  conventions of either of these languages or frameworks, please use comments to
  note that in the relevant parts of your solution.
- After completing the exercise, You are encouraged to use the CodeSubmit page
  for the exercise to write a brief summary, or to record a short video
  walkthrough of your solution. This additional context is very helpful for
  understanding your approach to the exercise and the choices you made.

## Evaluation Criteria

- Is your code well organized and readable, following conventional patterns and
  practices, with comments where appropriate?
- Does your solution meet the requirements listed above?
- Does your code follow best practices and established conventions for the
  languages and frameworks used in the solution?

## Getting Started

1. Install [Docker](https://www.docker.com/) in your machine, if you haven't
   done so already
2. In the root of this project, run `make start`. This command will build the
   necessary Docker images and start both the backend FastAPI service and the
   frontend React app.
3. In a separate terminal window or tab, try running the tests to ensure things
   are stable with `make test`

Once all applications boot up, you can access them at the following URLs:

- The React app will be at [http://localhost:3000](http://localhost:3000). When
  you visit it, you should see a list of existing patients.
- The docs for the FastAPI service will be at
  [http://localhost:8000/docs](http://localhost:8000/docs)

## Database Access via pgAdmin

Running the `make start` command will also expose pgAdmin, a database interface
you can use to inspect the state of the database used by the FastAPI server. You
do not need to use this tool to complete the assignment, but if you find it
helpful you can access it by visiting
[http://localhost:5050](http://localhost:5050).

You will need to provide these credentials to login to pgAdmin:

- Email address: admin@admin.com
- Password: root

Once in there, click on `Servers > Group Builder DB`. You will be asked for the
database password, which is "password". You should then be able to navigate down
and inspect the schema and content of the tables in the database. For example,
to access the patients table:
`Servers > Group Builder DB > Databases > group-builder > Schemas > public > Tables > patients`

All the best and happy coding,

The Charlie Health Team
