# OrangeHRM autotests

## To run locally

- create .credentials.sh file in the root directory with the user credentials:
```
export USERNAME="EXAMPLE_USER"
export PASSWORD="EXAMPLE_PASSWORD"
```
- edit .env file if needed OR use these vars via cmd: 

| Variable            | description                                        | default                        | possible values                      |
| ------------------: | -------------------------------------------------- | ------------------------------ | ------------------------------------ |
| HEADLESS            | launch browser in headless/headful mode            | true                           | true, false                          |
| TEST_TIMEOUT        | global timeout for each test                       | 30000                          | [number_in_ms]                       |
| EXPECT_TIMEOUT      | global timeout for each expect                     | 5000                           | [number_in_ms]                       |
| ACTION_TIMEOUT      | global timeout for each PW action, like click()    | 30000                          | [number_in_ms]                       |
| SLOWMO              | slows down the actions by the specified ms         | 0                              | [number_in_ms]                       |
| WORKERS             | number of workers (test threads)                   | 1                              | [number]                             |
| RETRIES             | number of retries                                  | 0                              | [number]                             |
| BASEURL             | auth state is invoked for the provided url*        | -      (required)              | [string]                             |

- go to the target folder:
```
    cd orange-hrm
```
- run 
```
    npm install
    HEADLESS=false npm run test
```
- observe html report result that opened automatically

Notes:
- tests/Recruitment/Candidates.spec.ts contains examples of auto tests based on Playwright API 
- tests/Recruitment/Vacancies.ts contains the main auto test scenarios for a specific feature