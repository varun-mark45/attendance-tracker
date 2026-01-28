document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;
    
    if (!name || !date || !status) {
        alert('Please fill all fields');
        return;
    }
    
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            date: date,
            status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        displayRecords(data.records);
        document.getElementById('attendanceForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

function displayRecords(records) {
    const tbody = document.getElementById('recordsBody');
    tbody.innerHTML = '';
    
    records.forEach(record => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = record.name;
        row.insertCell(1).textContent = record.date;
        row.insertCell(2).textContent = record.status;
    });
}

// Load records on page load
window.addEventListener('DOMContentLoaded', function() {
    fetch('/records')
        .then(response => response.json())
        .then(data => displayRecords(data))
        .catch(error => console.error('Error:', error));
});
