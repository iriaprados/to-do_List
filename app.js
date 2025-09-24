
// Selección de elementos del DOM, captura el input del texto y los botones 
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('task-input');
    const addButton = document.getElementById('agregar-tarea');
    const toDoList = document.getElementById('to-do-list');

    // Función para añadir nueva tarea 
    addButton.addEventListener('click', () => { // Cuando se pulse el botón 
        const taskText = input.value.trim(); // Quita los espacios en blanco del inicio y el final 

        if (taskText === '') { // Si el campo está vacío
            alert('Tienes que añadir una tarea !!!!');
            return; // No hace nada más
        }

        // Crear un nuevo elemento de lista
        const listItem = document.createElement('li'); // Hay elementos en el input, se gerna a lista
        listItem.textContent = taskText; // Relacionar el contenido de la lista con el del input

        // Tarea completada al hacer click
        const completeButton = document.createElement('button'); // Crear botón de completar
        completeButton.textContent = '✔️'; // Indicador para le usuario de tarea completada
        completeButton.addEventListener('click', () => {
            listItem.style.textDecoration = 'line-through'; // Tachar la tarea
        });
        listItem.appendChild(completeButton); // Añadir el botón a la lista
        toDoList.appendChild(listItem); // Añadir el elemento de lista a la lista de tareas

        // Eliminar tarea de la lista 
        const deleteButton = document.createElement('button'); // Crear botón de eliminar
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => {
            listItem.remove(); // Eliminar el elemento de la lista
        });
        listItem.appendChild(deleteButton); // Añadir el botón a la lista

    });
});