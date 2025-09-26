
document.addEventListener('DOMContentLoaded', () => {

    // Referenciar los elementos del DOM
    const input = document.getElementById('task-input');
    const addButton = document.getElementById('agregar-tarea');
    const toDoList = document.getElementById('to-do-list');

    // Funciones para manejar localStorage
    function saveTasks() {
        const tasks = []; // Almacenar las tareas creadas 
        const listItems = toDoList.querySelectorAll('li'); // Seleccionar elementos y crear una lista 

        // Recorremos los elementos de la lista para guardar su estado
        listItems.forEach(item => {
            const checkbox = item.querySelector('.task-checkbox'); // Seleccionar el checkbox
            const span = item.querySelector('span'); // Seleccionar el texto de la tarea

            // Guardar el texto del input y el estado de completado
            tasks.push({
                text: span.textContent,
                completed: checkbox.checked
            });
        });
        localStorage.setItem('todoTasks', JSON.stringify(tasks)); // Guardar en localStorage
    }

    // Cargar las tareas guardadas desde localStorage
    function loadTasks() { // Cargar las tareas guardadas al cargar la página
        const savedTasks = localStorage.getItem('todoTasks'); // Obtener las tareas guardadas 

        // Verificar si hay tareas guardadas en localStorage
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks); // Parsear las tareas guardadas, para convertirlas en un objeto JS
            tasks.forEach(task => { // Recorrer las tareas y crear los elementos de la lista
                createTaskElement(task.text, task.completed);
            });
        }
    }

    // Función para crear un nuevo elemento de tarea
    function createTaskElement(taskText, isCompleted = false) {

        const listItem = document.createElement('li');  // Crear un nuevo elemento de lista

        // Checkbox para marcar completada la tarea
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = isCompleted;

        // Input para escribir la tarea
        const span = document.createElement('span');
        span.textContent = taskText;

        // Aplicar estilo si está completada 
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        // Evento para tachar cuando se marque la checkbox
        checkbox.addEventListener('change', () => {
            listItem.classList.toggle('completed', checkbox.checked);
            saveTasks(); // Guardar cambios en localStorage
        });

        // Eliminar tarea de la lista 
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => { // Evento para eliminar la tarea al hacer click
            listItem.remove();
            saveTasks(); // Guardar cambios después de eliminar en localStorage
        });

        // Añadir los elementos a la lista  
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);
        toDoList.appendChild(listItem);
    }

    // Función para añadir nueva tarea cuando se pulse el botón de añadir 
    addButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = input.value.trim();

        if (taskText === '') { // Si el campo está vacío, mostrar alerta
            alert('⚠️Tienes que añadir una tarea ⚠️');
            return;
        }

        // Crear la tarea usando la función reutilizable
        createTaskElement(taskText);
        
        saveTasks(); // Guardar las tareas en localStorage
        input.value = ''; // Limpiar el campo de texto
    }

    input.addEventListener('keypress', (e) => { // Al pulsar el enter se añade la tarea automaticamente sin darle al botón
    if (e.key === 'Enter') {
        addTask();
    }
    });


    loadTasks(); // Cargar las tareas guardadas al cargar la página
});