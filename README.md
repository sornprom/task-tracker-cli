## Task Tracker CLI

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
npx ts-node src/main.ts add "Do homework" "math" #title : "Do homework" and description : "math"
npx ts-node src/main.ts list
```
#### Production mode (compiled JavaScript)
compile TypeScript:
```bash
npx tsc
```
Run the app:
```bash
node dist/main.js add "Do homework" "math"
node dist/main.js list
```
---

## Commands

> **Note:** `description` is an optional parameter.


| Command                  | Description                     | Example                                      | Output Example |
|--------------------------|---------------------------------|----------------------------------------------|----------------|
| `add <title> <description>` | Add a new task               | `node dist/main.js add "Do homework" "math"` | Task added successfully (ID: 1) |
| `update <id> <title> <description>` | Update a task        | `node dist/main.js update 1 "Cook dinner" "pizza"` | Task 1 updated successfully |
| `delete <id>`            | Delete a task                   | `node dist/main.js delete 1`                | Task 1 deleted successfully |
| `mark-in-progress <id>`  | Mark task as in-progress        | `node dist/main.js mark-in-progress 1`      | Task 1 marked as in-progress |
| `mark-done <id>`         | Mark task as done               | `node dist/main.js mark-done 1`             | Task 1 marked as done |
| `list [status]`          | List tasks by status or all     | `node dist/main.js list done`               | #1 [done] Buy groceries |

---
### Example Output
```bash
$ node dist/main.js add "Do homework" "math"
Task added successfully (ID: 1)

$ node dist/main.js list
#1 [todo] Do homework - math
```
---

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute it.
