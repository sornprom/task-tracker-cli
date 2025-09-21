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
npx ts-node src/main.ts add "Homework" "Math report" --due "20/10/2025" #title: "Homework", description: "Math"
npx ts-node src/main.ts update 7 "" "" --due "22/10/2025"
npx ts-node src/main.ts list
```
#### Production mode (compiled JavaScript)
compile TypeScript:
```bash
npx tsc
```
Run the app:
```bash
node dist/main.js add "Homework" "Math report" --due "20/10/2025" #title: "Homework", description: "Math"
node dist/main.js update 7 "" "" --due "22/10/2025"
node dist/main.js list
```
---

## Commands

> **Note:** 
- `description` is an optional parameter.
- `title / description / dueDate` is optional in command update
- format data : `DD/MM/YYYY`

| Command                  | Description                     | Example                                      | Output Example |
|--------------------------|---------------------------------|----------------------------------------------|----------------|
| `add <title> <description> --due <date>` | Add a new task | `node dist/main.js add "Do homework" "math" --due "20/10/2025"` | Task added successfully (ID: 1) |
| `update <id> <title> <description> [--due <date>]` | Update a task | `node dist/main.js update 1 "Cook dinner" "pizza" --due "22/10/2025"` | Task updated successfully |
| `delete <id>`            | Delete a task                   | `node dist/main.js delete 1`                | Task deleted successfully |
| `mark-in-progress <id>`  | Mark task as in-progress        | `node dist/main.js mark-in-progress 1`      | Task #1 marked as in-progress |
| `mark-done <id>`         | Mark task as done               | `node dist/main.js mark-done 1`             | Task #1 marked as done |
| `list [status]`          | List tasks by status or all     | `node dist/main.js list done`               | #1 [done] Homework - Math (Due in 5 day(s)) |

---
## Example Output
- Example command add :
```bash
$ node dist/main.js add "Do homework" "math" --due "20/10/2025"
#Output: Task added successfully (ID: 1)

$ node dist/main.js list
#Output: #1 [todo] Do homework - math (Due in 5 day(s))
```

- Example command update :
```bash
$ node dist/main.js update 1 "" "Eng" --due "27/10/2025"
#Output: Task updated successfully

$ node dist/main.js list
#Output: #1 [todo] Do homework - Eng (Due in 12 day(s))
```
---
## License
This project is licensed under the MIT License. You are free to use, modify, and distribute it.
