// import '@fortawesome/fontawesome-free/css/all.css'
import './css/style.css';

const form = document.getElementById('idea-form');
const ideaList = document.getElementById('idea-list');
const modal = document.getElementById('modal');
const SERVER_URL = 'http://localhost:3010/';

document.getElementById('modal-btn').addEventListener('click', (e) => {
    modal.style.display = 'block';
})
// Get all elements with the class name 'delete'

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const idea = {
        text: document.getElementById('idea-text').value,
        tag: document.getElementById('tag').value,
        username: document.getElementById('username').value
    }
    console.log(idea);
    fetch(`${SERVER_URL}api/ideas`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json' // Specify the content type
        }, body: JSON.stringify(idea)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            init();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    modal.style.display = 'none';
    document.getElementById('idea-text').value = '';
    document.getElementById('tag').value = '';
    document.getElementById('username').value = '';
})
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        modal.style.display = 'none';
    }
})

function convertDate(dateValue) {
    // Create a Date object from the ISO string
    const date = new Date(dateValue);
    // Define options for formatting
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    // Format the date using the specified options
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

async function fetchAPIData() {

    const response = await fetch(`${SERVER_URL}api/ideas`);
    return await response.json();
}
async function removeIdea(dataId) {
    const options = {
        method: 'DELETE', // Specify the HTTP method as DELETE
    }
// Sending the DELETE request
    fetch(`${SERVER_URL}api/ideas/${dataId}`, options)
        .then(response => {
            console.log(response);
            init();
        })
        .then(data => {
            console.log('Resource deleted successfully:', data); // Handle the response data
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        });
}

async function init() {
    try {
        const response = await fetchAPIData();
        let ideasHtml = '';
        if (response.success === true) {
            response.data.forEach((item) => {
                let data = `<div class="card">
      <button class="delete" data-id="${item._id}"><i class="fas fa-times"></i></button>
      <h3>
        ${item.text}
      </h3>
      <p class="tag tag-technology">${item.tag}</p>
      <p>
        Posted on <span class="date">${convertDate(item.date)}</span> by
        <span class="author">${item.username}</span>
      </p>
    </div>`;
                ideasHtml += data;
            })

        }
        ideaList.innerHTML = ideasHtml;
        const deleteButtons = document.querySelectorAll('.delete');

// Iterate over the NodeList and add event listeners
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Your event handling logic here
                const dataId = e.target.parentElement.getAttribute('data-id');

                if(!dataId) {
                    return;
                }
                removeIdea(dataId);
            });
        });
    } catch (e) {
        console.log(e);
    }


}

document.addEventListener('DOMContentLoaded', init)


