document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.task-input').onsubmit = () => {
       const task = document.querySelector('#tasks').value;
       console.log(task);

        const li = document.createElement('li');
        li.innerHTML = task;

        document.querySelector('#tasks').append();

       return false;
    }
});