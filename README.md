## Taskminal CLI

A simple **command-line tool** for tracking tasks, built with **TypeScript**.  
You can easily **add, update, delete, and list tasks** directly from your terminal.

---

## Features
- Add new tasks
- Update or delete tasks
- Mark tasks as **todo**, **in-progress**, or **done**
- List tasks by status or view all
- Tasks stored locally in `task.json`

---

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/your-username/task-tracker-cli.git
cd task-tracker-cli
npm install
```

---

## Usage

#### Development mode (TypeScript with ts-node)
```bash
npx ts-node src/main.ts add --title "Homework" --desc "Math report" --due "20/10/2025"
npx ts-node src/main.ts update 7 --due "22/10/2025"
npx ts-node src/main.ts list
```
    - short flags example
```bash
npx ts-node src/main.ts a -t "Finish report" -d "Q4 report" -D "2025-10-10"
```
#### Production mode (compiled JavaScript)
compile TypeScript:
```bash
npx tsc
```
Run the app:
```bash
node dist/main.js add --title "Homework" --desc "Math report" --due "20/10/2025"
node dist/main.js update 7 --due "22/10/2025"
node dist/main.js list
```
    - short flags example
```bash
node dist/main.js a -t "Finish report" -d "Q4 report" -D "2025-10-10"
```
> **Note:** 
- See full details in [docs/flag.md](./docs/flag.md)
---

## Commands

> **Note:** 
- `description` is an optional parameter.
- `title / description / dueDate` is optional in command update
- Date format : `DD/MM/YYYY`

| Command                  | Description                     | Example                                      | Output Example |
|--------------------------|---------------------------------|----------------------------------------------|----------------|
| `add [--title <title>] [--desc <description>] [--due <date>]` | Add a new task | `node dist/main.js add "Do homework" "math" --due "20/10/2025"` | Task added successfully (ID: 1) |
| `update [--id <id>] [--title <title>] [--desc <description>] [--due <date>]` | Update a task | `node dist/main.js update 1 "Cook dinner" "pizza" --due "22/10/2025"` | Task updated successfully |
| `delete [--id <id>]`            | Delete a task                   | `node dist/main.js delete 1`                | Task deleted successfully |
| `mark-in-progress [--id <id>]`  | Mark task as in-progress        | `node dist/main.js mark-in-progress 1`      | Task #1 marked as in-progress |
| `mark-done [--id <id>]`        | Mark task as done               | `node dist/main.js mark-done 1`             | Task #1 marked as done |
| `list [--status <status>]`          | List tasks by status or all     | `node dist/main.js list done`               | #1 [done] Homework - Math (Due in 5 day(s)) |

---
## Example Output
- Example command add :
```bash
$ node dist/main.js add --title "Do homework" --desc "math" --due "20/10/2025"
#Output: Task added successfully (ID: 1)

$ node dist/main.js list
#Output: #1 [todo] Do homework - math (Due in 5 day(s))
```

- Example command update :
```bash
$ node dist/main.js update --id 1 --desc "Eng" --due "27/10/2025"
#Output: Task updated successfully

$ node dist/main.js list
#Output: #1 [todo] Do homework - Eng (Due in 12 day(s))
```
---

## Latest Update Versions
See full details in [CHANGELOG.md](./CHANGELOG.md)
- Version **0.3.0** adds short command & flag support.  

---
## License
This project is licensed under the MIT License. You are free to use, modify, and distribute it.
