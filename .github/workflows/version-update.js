const currentVersion = process.argv.indexOf('--currentVersion');
let currentVersionValue;

const versionToken = process.argv.indexOf('--tokenVersion');
let versionTokenValue;

if (currentVersion > -1) {
    currentVersionValue = process.argv[currentVersion + 1];
    if (`${currentVersionValue}` === 'undefined'){
        throw new Error("--currentVersion argument value is missing")
    }
}
else {
    throw new Error("--currentVersion argument is missing")
}

if (versionToken > -1) {
    versionTokenValue = process.argv[versionToken + 1];
    if (`${versionTokenValue}` === 'undefined'){
        throw new Error("--tokenVersion argument value is missing")
    }
} else {
    throw new Error("--tokenVersion argument is missing")
}

splittedVersion = currentVersionValue.split('.')

for (let versionPartNumber = 0; versionPartNumber < splittedVersion.length; versionPartNumber++) {
    splittedVersion[versionPartNumber] = Number(splittedVersion[versionPartNumber])
}

splittedVersion.reverse()

splittedVersion[0] += 1

for (let versionPart = 0; versionPart < splittedVersion.length-1; versionPart++) {
    if (splittedVersion[versionPart] == 10){
        splittedVersion[versionPart] = 0
        splittedVersion[versionPart + 1] += 1
    }
}

splittedVersion.reverse()


for (let versionPartNumber = 0; versionPartNumber < splittedVersion.length; versionPartNumber++) {
    splittedVersion[versionPartNumber] = String(splittedVersion[versionPartNumber])
}

const newVersion = splittedVersion.join('.')


var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Authorization", `Bearer ${versionTokenValue}`);

var raw = `{\r\n    \"name\": \"FRONT_VERSION\",\r\n    \"value\": \"${newVersion}\",\r\n    \"created_at\": \"2023-12-18T13:39:53Z\",\r\n    \"updated_at\": \"2023-12-18T13:39:53Z\",\r\n    \"visibility\": \"all\"\r\n`;

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
}