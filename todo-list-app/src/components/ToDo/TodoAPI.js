import axios from 'axios';

export const fetchTodos = async (configAPI) => {
    try {
        const response = await axios.get(`${configAPI["API_URL"]}`, {
            headers: { 
                'x-api-key': `${configAPI["API_KEY"]}`
            }
        });
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

export const deleteTodoAPI = async (todoId, configAPI) => {
    try {
        const response = await axios.delete(`${configAPI["API_URL"]}/delete/${todoId}`, {
            headers: { 
                'x-api-key': `${configAPI["API_KEY"]}`
            }
        });
        return response.status
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
}

export const createTodoAPI = async (todo, configAPI) => {
    try {
        const response = await axios.post(`${configAPI["API_URL"]}`, {
            title: todo
        }, {
            headers: { 
                'x-api-key': `${configAPI["API_KEY"]}`
            }
        });
        return response.data
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
}
