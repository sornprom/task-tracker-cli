# Changelog

## [0.3.0] - 2025-10-05
### Added
- Added **short command and flag support**  
  -> See full details in [docs/flag.md](./docs/flag.md)

### Changed
- Updated README examples to include short command and flag usage.

## [0.2.0] - 2025-09-21
### Added
- Due date support for `add` and `update` commands
- Display due date and overdue status in `list`

### Changed
- Refactored commands to use `getArgs` function
- Updated README with due date examples

## [0.1.0] - 2025-09-20
### Added
- Basic task operations: add, update, delete
- Status management: todo, in-progress, done
- List tasks by status
- Local storage with `tasks.json`