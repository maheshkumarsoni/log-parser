# AICPA - Log Parser Challenge

## General Description

You will be provided with a log file (`web.log`) containing entries with IP addresses and page URLs. Each line in the log file will be formatted as follows: `/about 126.318.035.038`.

## Basic Task

Develop a script or application using TypeScript that:

- Reads the log file and parses each line.
- Outputs a list of webpages with the most page views, ordered from most to least, for example:

  ```sh
  /home 90 visits
  /index 80 visits
  ...
  ```

- Outputs a list of webpages with the most unique page views, ordered from most to least, for example:

  ```sh
  /products/2 8 unique views
  /index 5 unique views
  ...
  ```

## Notes

- You may use any framework or library, or none at all, as you see fit.
- Your output does not need to match the examples above. You are free to format it however you like.

## Evaluation Criteria

- **Functionality:** Does the application perform the required tasks correctly?
- **Code Quality:** Is the code clean, readable, and well-organised?
- **Testing:** Does the application include tests to verify its functionality?

## Submission Requirements

- Include a `README.md` file with instructions on how to run your application.
