# nazareth library
An app where users can submit which books they own and make reservations to borrow books.
Based off Hiba Reads- Hiba's Angels' week 6 project.

## Outline
- the website home page will show a list of books owned by members of the F&C community.
- the site will require login (with github?) to make reservations
- It will offer people the chance to add books they own to the list, and make a reservation to borrow a book they want to read.
- It will allow comments/reviews of books

## TODO
- move to Hapi
- move to handlebars
- user login
- travis
- linter
- Input validation
- Show which books are currently available

## Local setup
```bash
# TODO
```

## User Stories
**As a member of F&C Nazareth community:**
> I want to see a list of books people own

> So that I can browse and see if I'm interested in any

**As a member of F&C Nazareth community who owns some books:**
> I want to be able to add my book to the list

> So other people can see information about my book and maybe borrow it

**As an avid reader in F&C Nazareth community who likes to stick to a carefully structured timetable:**
> I want to be able to reserve a book on the website

> So I can be sure I will have a chance to read it at a time which is convenient for me

## Database Schema
#### books

Column   |          Type          | Modifiers | Other info
--- | --- | --- | ---
 id           | integer                | not null | primary key, serial
 title        | character varying(100) | not null |
 author       | character varying(100) | not null |
 owner        | character varying(30)  | not null |
 summary      | text                   | not null |
 date_created | timestamp without time zone | not null default now()|


#### reservations
Column    |         Type          | Modifiers | Other info
--- | --- | --- | ---
  id           | integer               | not null | primary key, serial
  book_id      | integer               | not null | foreign key, references books(id)
  name         | character varying(30) | not null |
  from_date    | date                  | not null |
  to_date      | date                  | not null |
  date_created | timestamp without time zone | not null default now() |

#### Users

#### Comments
