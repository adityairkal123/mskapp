let lightsOn = false;
let activeCommands = new Set();  // Store active commands

// Function to send commands to the server
function sendCommand(command) {
    var xhr = new XMLHttpRequest();
    var speed = document.getElementById("speedSlider").value;
    xhr.open("GET", "/?State=" + command + "&Speed=" + speed, true);
    xhr.send();
    updateStatus(command);
}

// Update speed value
function updateSpeed(value) {
    document.getElementById("speedValue").textContent = value * 10;
    sendCommand(value); // Update speed command
}

// Toggle lights on/off
function toggleLights() {
    lightsOn = !lightsOn;
    var command = lightsOn ? "G" : "H"; // Custom commands for turning lights on/off
    sendCommand(command);
}

// Update status display
function updateStatus(command) {
    const status = document.getElementById("status");
    switch(command) {
        case 'F':
            status.textContent = "Status: Moving Forward";
            break;
        case 'B':
            status.textContent = "Status: Moving Backward";
            break;
        case 'L':
            status.textContent = "Status: Turning Left";
            break;
        case 'R':
            status.textContent = "Status: Turning Right";
            break;
        case 'S':
            status.textContent = "Status: Stopped";
            break;
        case 'V':
            status.textContent = "Status: Buzzer Toggled";
            break;
        default:
            status.textContent = "Status: Speed Updated";
    }
}

// Helper function to determine which command to send based on active keys
function updateActiveCommands() {
    if (activeCommands.has('F') && activeCommands.has('L')) {
        sendCommand('G'); // Forward and Left
    } else if (activeCommands.has('F') && activeCommands.has('R')) {
        sendCommand('I'); // Forward and Right
    } else if (activeCommands.has('B') && activeCommands.has('L')) {
        sendCommand('H'); // Backward and Left
    } else if (activeCommands.has('B') && activeCommands.has('R')) {
        sendCommand('J'); // Backward and Right
    } else if (activeCommands.has('F')) {
        sendCommand('F'); // Forward
    } else if (activeCommands.has('B')) {
        sendCommand('B'); // Backward
    } else if (activeCommands.has('L')) {
        sendCommand('L'); // Left
    } else if (activeCommands.has('R')) {
        sendCommand('R'); // Right
    } else {
        sendCommand('S'); // Stop
    }
}

// Event listeners for button presses
const forwardBtn = document.getElementById('forwardBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const backwardBtn = document.getElementById('backwardBtn');
const stopBtn = document.getElementById('stopBtn');

forwardBtn.addEventListener('mousedown', () => {
    activeCommands.add('F');
    updateActiveCommands();
});
forwardBtn.addEventListener('mouseup', () => {
    activeCommands.delete('F');
    updateActiveCommands();
});

backwardBtn.addEventListener('mousedown', () => {
    activeCommands.add('B');
    updateActiveCommands();
});
backwardBtn.addEventListener('mouseup', () => {
    activeCommands.delete('B');
    updateActiveCommands();
});

leftBtn.addEventListener('mousedown', () => {
    activeCommands.add('L');
    updateActiveCommands();
});
leftBtn.addEventListener('mouseup', () => {
    activeCommands.delete('L');
    updateActiveCommands();
});

rightBtn.addEventListener('mousedown', () => {
    activeCommands.add('R');
    updateActiveCommands();
});
rightBtn.addEventListener('mouseup', () => {
    activeCommands.delete('R');
    updateActiveCommands();
});

stopBtn.addEventListener('mousedown', () => {
    activeCommands.clear();
    sendCommand('S');
});
