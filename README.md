# Airtable Clone

## Links

* [🔗 Deployment (Only Google Sign in works)](https://airtable-clone-ecru-psi.vercel.app/login)

## Introduction

A full-stack, Airtable Clone, built with the **T3 Stack**. While the UI mimics the familiar Airtable experience, the core implementations of this project mainly focus on the spreadsheet engine for a fast, lag-free experience even when there are hundreds of thousands to a million rows.

## Learning Outcomes

* Using tRPC
* Using Prisma
* Implementing virtualisation
* Implementing hybrid, cursor and offset based pagination
* Using the Tanstack Table API.

## Architecture and Inspiration

The project uses the standard T3 stack with Prisma and Postgres. The biggest architectural challenge for this project was designing the database schema to be able to support huge spreadsheets (tables) from a large number of users on the platform. The traditional approach with relational databases of having a table for cells, rows, columns and tables would quickly introduce an EAV nightmare when numerous users would have tables with a million or so rows in them.

The second option was having tables for columns and rows, with each row storing a JSON array of column-id to cell value pairs. While this was promising, it would introduce more overhead maintaining data integrity; any column deletions, or column creations would require iterating over every row and removing/inserting the column with its values. Deletions can be simplified with lazy deletions, but that would mean rows would be storing unnecessary data affecting other operations further down the line.

The third option, which I opted for, was a bit more complex in implementing with Prisma, as it required a fairly good amount of unsafe raw queries (I took all the measures against SQL injections though). The idea was that every spreadsheet every created on the app, would have its own table, dynamically generated, and that table would literally model the spreadsheet as it is. So fetching a spreadsheet would simply mean fetching the whole table.

While this does sound ridiculous at first, it is actually a very effective and performant way to approach this. It was inspired by this [talk](https://www.youtube.com/watch?v=xhi5Q_wL9i0). This approach would remove the need to join multiple tables together, any update/delete operations on columns would be as easy as altering the table, and deleting a whole table would simply be dropping the table. Of course, there are a few measures I needed to take to ensure that there was some safety. The most important one being that I had a table to keep track of all the currently existing tables and their metadata (name, owner, date of creation etc.), and any query for a table would first check if the table exists in this tracker, and then subsequently make a query on that table (more info on the table names and conventions further below). I also maintained a table for columns, which contained the columns and metadata (column name, type etc.) for all tables in the app, allowing me to easily be able to identify the columns of a given spreadsheet. This approach, paired with optimised batch insertions, reduced the average seen 100k row insertion time with randomly generated FakerJS data from around 20s to 8-10s (depending on how warmed up the serverless instances are, and some other factors). That is nearly a 50% reduction. All of this is also including GIN-indexed trigram columns for fuzzy searching of all rows. Without the search column, the insertion was timed at an average of 5s.

## How I kept Everything Safe

With dynamic tables, there are a lot of safety issues may arise, such as results returned in unexpected types and shapes, non-existent tables being referenced, untracked tables, SQL injections, unauthorized table access and more. Here are a few steps I had taken to address these:

* **Return Types:** Since Prisma loses its type-safety guarantees on Unsafe Raw Queries, I had to find a way to ensure that my functions and queries were returning objects in a shape I expected. I tackled this using Zod, strictly parsing all outputs from tRPC functions using unsafe raw queries to ensure type-safety and proper type inference. This helped me catch a lot of type-related bugs very early on.

* **Table Integrity:** To ensure consistency of the dynamically created tables, I created a table that keeps track of all the tables and their metadata such as name, owner, date created etc. Records in this table were created whenever a user created a new spreadsheet, and the id generated in this table was subsequently used for the dynamic table names, which was essentially in the form of: `table_<table_id>`. This had three clear benefits: **1.** users did not get to control what the database looked like, and **2.** Any metadata changes were cheap as they were simply changing one row, and **3.** Verifying the owner of a particular spreadsheet was a simple look up. The third point in particular, was leveraged by tRPC middleware on all table related operations to ensure that the user attempting to execute the operation was always the owner of that table. In addition to this, all update, insert, deletion operations were always run in transactions with rollbacks, to ensure that if a table creation failed, for example, its entry would not still exist in the tables table. This prevented any ghost tables or non-existent tables from every accidentally being referenced.

* **Column Integrity:** To maintain consistency of columns across dynamic tables, I implemented a dedicated table to track every column and their metadata (e.g., name, data type etc). The dynamic tables used the unique Column IDs as the actual column names. This made metadata update operations such as renaming a column became a "cheap" operation—simply updating a single row. This approach ensured that fetching data always returned a predictable structure, which could then be mapped to the correct display names from the metadata by the calling function. While the tables stored all data parsed as strings, storing the data type in the column metadata also allowed for re-conversion into the correct type on fetch, and ensure that correctyl type data was always written to a partciular cell. The type checking of column values was also done in a factory pattern, allowing for easy extensibility with more types in the future (only number and string supported at the moment).

* **SQL Injections:** To prevent cases of SQL injection, any variable from the client side that either did not originate from the server or was not strictly parsed and verified by the server first, was always passed as a parameterised value. An example of this would be user input for a cell's value.

## Usage

This project uses `bun`.

### Prerequisites

* [Bun](https://bun.sh/) installed on your machine.
* [Docker](https://www.docker.com/) for running the local database.

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd airtable-clone
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Environment Setup:**
   Copy the example environment file and fill in the required values.
   ```bash
   cp .env.example .env
   ```

4. **Database Setup:**
   Start the local Postgres database using the provided script:
   ```bash
   chmod +x start-database.sh
   ./start-database.sh
   ```
   Generate the Prisma client and Zod schemas:
   ```bash
   bun db:generate
   ```
   Then, run the Prisma migrations to set up the schema:
   ```bash
   bun db:migrate
   ```

5. **Run the Development Server:**
   ```bash
   bun dev
   ```
   The application will be available at `http://localhost:3000`.



