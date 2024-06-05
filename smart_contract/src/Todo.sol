pragma solidity 0.8.22;

contract Todo {
    struct TodoList {
        string title;
        string description;
        bool isCompleted;
    }

    TodoList[] public todo;

    function createTodo(
        string calldata _title,
        string calldata _description
    ) external {
        todo.push(TodoList(_title, _description, false));
    }

    function updateTodo(
        uint _index,
        string calldata _title,
        string calldata _description
    ) external {
        todo[_index].title = _title;
        todo[_index].description = _description;
    }

    function markTodo(uint _index) external {
        todo[_index].isCompleted = !todo[_index].isCompleted;
    }

    function getTodo(
        uint _index
    ) external view returns (string memory, string memory, bool) {
        TodoList memory todos = todo[_index];
        return (todos.title, todos.description, todos.isCompleted);
    }

    function deleteTodo(uint _index) external {
        delete todo[_index];
    }

    function getAllTodo() external view returns (TodoList[] memory) {
        return todo;
    }
}
