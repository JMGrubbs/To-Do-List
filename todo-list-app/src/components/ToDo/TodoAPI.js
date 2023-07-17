import axios from 'axios';

export const fetchTodos = async () => {
    try {
        const response = await axios.get('http://localhost:3001/todos');
        let get_todos = {}
        for (let i = 0; i < response.data.length; i++) {
            get_todos[response.data[i]["id"]] = {
                "id": response.data[i].id,
                "title": response.data[i].title,
            }
        }
        return get_todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const deleteTodoAPI = async (todoId) => {
    console.log(todoId)
    try {
        const response = await axios.delete(`http://localhost:3001/todos/delete/${todoId}`);
        return response.status
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
}