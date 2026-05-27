let monitoring = false;
let alertCounter = 0;
let threatScore = 0;
let suspiciousIPs = new Set();

const logs = [
{
message:"[FAILED LOGIN] Multiple failed password attempts detected on root account from 192.168.1.55",
severity:"high"
},
{
message:"[PHISHING] Suspicious email attachment detected from attacker@malicious-domain.com",
severity:"medium"
},
{
message:"[C2 COMMUNICATION] Beaconing activity detected to 45.133.22.10",
severity:"critical"
},
{
message:"[RANSOMWARE] Encryption behavior identified on endpoint HR-PC-04",
severity:"critical"
},
{
message:"[DATA EXFILTRATION] Large outbound traffic detected to unknown IP 88.22.11.90",
severity:"critical"
},
{
message:"[BRUTE FORCE] Excessive authentication failures detected",
severity:"high"
},
{
message:"[PERSISTENCE] Scheduled task created by suspicious process",
severity:"high"
},
{
message:"[LATERAL MOVEMENT] SMB scanning activity observed",
severity:"high"
}
];

let interval;

function startMonitoring(){

    if(monitoring) return;

    monitoring = true;

    document.getElementById("monitorStatus").innerHTML = "ONLINE";

    interval = setInterval(generateLog, 1500);
}

function stopMonitoring(){

    monitoring = false;

    clearInterval(interval);

    document.getElementById("monitorStatus").innerHTML = "OFFLINE";
}

function generateLog(){

    const log = logs[Math.floor(Math.random()*logs.length)];

    const logContainer = document.getElementById("logContainer");

    const div = document.createElement("div");

    div.classList.add("log");
    div.classList.add(log.severity);

    div.innerText = new Date().toLocaleTimeString() + " - " + log.message;

    logContainer.prepend(div);

    alertCounter++;
    threatScore += Math.floor(Math.random()*15);

    suspiciousIPs.add(
        Math.floor(Math.random()*255)+"."+
        Math.floor(Math.random()*255)+"."+
        Math.floor(Math.random()*255)+"."+
        Math.floor(Math.random()*255)
    );

    document.getElementById("alertCount").innerText = alertCounter;
    document.getElementById("threatScore").innerText = threatScore;
    document.getElementById("ipCount").innerText = suspiciousIPs.size;
}

function simulateAttack(){

    startMonitoring();

    const attackLogs = [
        "[INITIAL ACCESS] Phishing email clicked",
        "[CREDENTIAL ACCESS] Password dumping detected",
        "[PERSISTENCE] Registry modification detected",
        "[COMMAND & CONTROL] Remote shell established",
        "[EXFILTRATION] Confidential files transferred",
        "[IMPACT] Ransomware encryption started"
    ];

    attackLogs.forEach((entry,index)=>{

        setTimeout(()=>{

            const div = document.createElement("div");

            div.classList.add("log","critical");

            div.innerText =
                new Date().toLocaleTimeString() +
                " - " +
                entry;

            document
                .getElementById("logContainer")
                .prepend(div);

        }, index*2000);

    });

}

function runQuery(){

    const query = document
        .getElementById("queryInput")
        .value
        .toLowerCase();

    const resultBox =
        document.getElementById("queryResult");

    let results = "";

    logs.forEach(log=>{

        if(
            log.message
            .toLowerCase()
            .includes(query.replace("search ",""))
        ){

            results += `
                <p>✔ ${log.message}</p>
            `;
        }

    });

    if(results === ""){
        results = "<p>No matching logs found.</p>";
    }

    resultBox.innerHTML = results;
}

function createTicket(){

    const threatSource =
        document.getElementById("threatSource").value;

    const severity =
        document.getElementById("severity").value;

    const analyst =
        document.getElementById("assignedAnalyst").value;

    const notes =
        document.getElementById("notes").value;

    const ticket = document.createElement("div");

    ticket.classList.add("ticket");

    if(severity === "CRITICAL"){
        ticket.classList.add("critical");
    }else{
        ticket.classList.add("high");
    }

    ticket.innerHTML = `
        <h3>${severity} INCIDENT</h3>
        <p><strong>Threat Source:</strong> ${threatSource}</p>
        <p><strong>Assigned Analyst:</strong> ${analyst}</p>
        <p><strong>Notes:</strong> ${notes}</p>
        <p><strong>Status:</strong> Escalated to Tier 2 SOC</p>
    `;

    document
        .getElementById("ticketList")
        .prepend(ticket);
}

function generateReport(){

    const report = `
        <h3>Executive Summary</h3>

        <p>
        The SOC team detected multiple malicious activities
        including phishing, brute-force attacks,
        command-and-control communication,
        ransomware behavior, and possible data exfiltration.
        </p>

        <h3>Indicators of Compromise (IOCs)</h3>

        <ul>
            <li>45.133.22.10</li>
            <li>88.22.11.90</li>
            <li>Suspicious Email Domain</li>
            <li>Multiple Failed Login Attempts</li>
        </ul>

        <h3>Timeline of Events</h3>

        <ul>
            <li>Initial Access via phishing email</li>
            <li>Credential attacks observed</li>
            <li>C2 communication established</li>
            <li>Outbound exfiltration traffic detected</li>
            <li>Ransomware encryption activity started</li>
        </ul>

        <h3>MITRE ATT&CK Techniques Observed</h3>

        <ul>
            <li>T1566 - Phishing</li>
            <li>T1110 - Brute Force</li>
            <li>T1071 - Application Layer Protocol</li>
            <li>T1041 - Exfiltration Over C2 Channel</li>
            <li>T1486 - Data Encrypted for Impact</li>
        </ul>

        <h3>Actions Taken</h3>

        <ul>
            <li>Suspicious IPs identified</li>
            <li>Incidents escalated to Tier 2</li>
            <li>Endpoints isolated</li>
            <li>Threat monitoring enabled</li>
        </ul>

        <h3>Recommendations</h3>

        <ul>
            <li>Enable MFA</li>
            <li>Conduct phishing awareness training</li>
            <li>Deploy EDR solution</li>
            <li>Improve SIEM correlation rules</li>
            <li>Implement network segmentation</li>
        </ul>
    `;

    document.getElementById("reportBox").innerHTML = report;
}