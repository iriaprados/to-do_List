
// Selección de elementos del DOM, captura el input del texto y los botones 
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('task-input');
    const addButton = document.getElementById('agregar-tarea');
    const toDoList = document.getElementById('to-do-list');

    // Función para añadir nueva tarea cuando se pulse el botón de añadir 
    addButton.addEventListener('click', () => { // Cuando se pulse el botón 
        const taskText = input.value.trim(); // Quita los espacios en blanco del inicio y el final 

        if (taskText === '') { // Si el campo está vacío
            alert('⚠️Tienes que añadir una tarea ⚠️');
            return; // No hace nada más
        }

        // Crear un nuevo elemento de lista
        const listItem = document.createElement('li'); // Hay elementos en el input, se gerna a lista
        
        // Checkbox para completar
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        // Texto de la tarea
        const span = document.createElement('span');
        span.textContent = taskText;

        // Evento para tachar cuando se marque
       checkbox.addEventListener('change', () => {
         listItem.classList.toggle('completed', checkbox.checked);
        });

        // Eliminar tarea de la lista 
        const deleteButton = document.createElement('button'); // Crear botón de eliminar
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', () => {
            listItem.remove(); // Eliminar el elemento de la lista
        });

        // Añadir los elementos a la lista  
        listItem.appendChild(checkbox); // Añadir el checkbox a la lista
        listItem.appendChild(span); // Añadir el texto a la lista
        listItem.appendChild(deleteButton); // Añadir el botón a la lista
        
        toDoList.appendChild(listItem);// Insertar en la lista

        input.value = ''; // Limpiar el campo de texto una vez escrito el elemento
    });
});