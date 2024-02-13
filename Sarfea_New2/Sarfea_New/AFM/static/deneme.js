


document.addEventListener("DOMContentLoaded", async () =>{
    await getAndRenderClients();
    //getAndRenderClients();
    //setInterval(getAndRenderClients, 5000);
    setInterval(async function() {
        await getAndRenderClients();
    }, 5000);

    async function getAndRenderClients() {
        try{
            const response = await fetch('/get-clients/');
            const data = await response.json();
            const clients = data.clients;

            const tbody = document.getElementById('tbody');
            tbody.innerHTML = '';

            clients.forEach((client) => {
                if (client.CompanyName_Clients) {
                    const row = '<tr>' +
                        '<td><button class="edit-client-btn button2" data-client-name="' + client.CompanyName_Clients + '">Edit</button></td>' +
                        '<td>' + client.CompanyName_Clients + '</td>' +
                        '<td>' + client.ContactPerson + '</td>' +
                        '<td>' + client.PhoneNumber + '</td>' +
                        '<td>' + client.Email + '</td>' +
                        '<td>' + client.Location + '</td>' +
                        '</tr>';
                    tbody.insertAdjacentHTML('beforeend', row);
                }
            });
            
            const editButtons = document.querySelectorAll('.edit-client-btn');
            editButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    const clientName = this.getAttribute('data-client-name');
                    window.location.href = '/client_edit/' + clientName + '/';
                });
            });
        }catch (error){
            console.error('Error fetching and rendering clients:', error);
        }
    }
});