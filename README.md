# labsystem

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/nicolasrrdev/labsystem.git
    ```
    ```bash
    cd labsystem
    ```

2. Navigate to the Spring Boot project:

    ```bash
    cd labsystem-spring-boot
    ```

3. Create the `application.properties` file in the `resources` package and fill it in according to `application.properties.template`.

4. Make sure you have Java 21 installed. Then, run the Spring Boot project:

    ```bash
    mvn spring-boot:run
    ```

5. Using Node 21, navigate to the React app directory and install the Node Modules:

    ```bash
    cd ..
    ```
    ```bash
    cd labsystem-reactjs
    ```
    ```bash
    npm i
    ```

6. Create the `.env` file and fill it in according to `.env.template`.

7. Run the React app:

    ```bash
    npm run dev
    ```
